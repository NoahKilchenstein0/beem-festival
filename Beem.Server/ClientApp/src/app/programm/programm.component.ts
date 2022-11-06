import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../models/artist';
import { Roles, User } from '../models/user';
import { ArtistService } from '../services/artist.service';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-programm',
  templateUrl: './programm.component.html',
  styleUrls: ['./programm.component.css']
})
export class ProgrammComponent implements OnInit {

  public artists: Artist[] = [];

  public filteredArtist: Artist[] = [];
  private favoriteFiltered: boolean = false;
  public selectedArtist: Artist = new Artist();
  public isDrillDownActive: boolean = false;
  public user: User | null = null;

  public isAdminView: boolean = false;

  public isEdit: boolean = false;

  constructor(public router: Router,
              public userService: UserService,
              public artistsService: ArtistService,
              public authenticationService: AuthService,
              public globalsService: GlobalService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    if(this.isAdmin()){
      this.isAdminView = true;
      this.artistsService.getArtists().subscribe(x => {
        this.artists = x;
        this.filteredArtist = this.artists;
      })
    }
    else {
      this.isAdminView = true;
      this.artistsService.getArtistsActive().subscribe(x => {
        this.artists = x;
        this.filteredArtist = this.artists;
      })
    }
    this.globalsService.isArtistDrillDown.subscribe(x => {
      this.isDrillDownActive = x;
    });
  }

  navigateToArtistPage(artist:Artist): void{
    this.selectedArtist = artist;
    this.globalsService.setArtistDrillDownActive();
  }

  onSwap(): void {
    if(this.isAdminView){
      this.isAdminView = false;
      this.filteredArtist = this.artists.filter(x => x.isBooked === true);
    }
    else {
      this.isAdminView = true;
      this.filteredArtist = this.artists;
    }
  }

  onBack(): void {
    this.globalsService.setArtistDrillDownDisabled();
  }

  isAdmin(): boolean {
    if(this.user === null){
      return false;
    }
    return this.user.role === Roles.Admin && this.isAdminView;
  }

  isAdminOnly(): boolean {
    if(this.user === null){
      return false;
    }
    return this.user.role === Roles.Admin;
  }

  navigateToEditArtist(artist:Artist): void {
    this.globalsService.setArtistDrillDownActive();
    if(artist.id !== 0){
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.selectedArtist = artist;
  }

  updateArtist(artist:Artist){
    if(this.isEdit){
      this.artistsService.updateArtist(artist).subscribe(x => {
        let index = this.artists.findIndex(x => x.id === artist.id);
        this.artists.splice(index, 1);
        this.artists.push(x);
        this.globalsService.setArtistDrillDownActive();
      });
    }
    else {
      this.artistsService.createArtist(artist).subscribe(x => {
        this.artists.push(x);
        this.globalsService.setArtistDrillDownActive();
      });
    }
  }

  deleteArtist(artist:Artist): void {
    this.artistsService.deleteArtist(artist.id).subscribe(x => {
      this.artists.splice(this.artists.findIndex(x => x === artist),1);
    });
  }

}
