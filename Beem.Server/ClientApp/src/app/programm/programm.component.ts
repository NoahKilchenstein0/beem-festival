import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../models/artist';
import { Roles, User } from '../models/user';
import { ArtistService } from '../services/artist.service';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { UserService } from '../services/user.service';
import { PlatformLocation } from '@angular/common';

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
    public globalsService: GlobalService,
    private route: ActivatedRoute,
    private location: PlatformLocation
    ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    history.pushState(null, '', location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', location.href);
      this.onBack();
    });

    if (this.isAdminOnly()) {
      this.isAdminView = true;
      this.artistsService.getArtists().subscribe(x => {
        this.artists = x;
        this.filteredArtist = this.artists;
        this.sortArtistsByName();
      })
    }
    else {
      this.isAdminView = false;
      this.artistsService.getArtistsActive().subscribe(x => {
        this.artists = x;
        this.filteredArtist = this.artists;
        this.sortArtistsByName();
      })
    }
    this.globalsService.isArtistDrillDown.subscribe(x => {
      this.isDrillDownActive = x;
    });
  }

  ngOnDestroy() {
    this.location.onPopState(() => {});
  }

  navigateToArtistPage(artist: Artist): void {
    this.selectedArtist = artist;
    this.globalsService.setArtistDrillDownActive();
  }

  onSwap(): void {
    if (this.isAdminView) {
      this.isAdminView = false;
      this.filteredArtist = this.artists.filter(x => x.IsBooked === true);
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
    if (this.user === null) {
      return false;
    }
    return this.user.Role === Roles.Admin && this.isAdminView;
  }

  isAdminOnly(): boolean {
    if (this.user === null) {
      return false;
    }
    return this.user.Role === Roles.Admin;
  }

  navigateToEditArtist(artist: Artist): void {
    this.globalsService.setArtistDrillDownActive();
    if (artist.Id !== 0) {
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.selectedArtist = artist;
  }

  updateArtist(artist: Artist) {
    if (this.isEdit) {
      this.artistsService.updateArtist(artist).subscribe(x => {
        let index = this.artists.findIndex(x => x.Id === artist.Id);
        this.artists.splice(index, 1);
        this.artists.push(x);
        this.globalsService.setArtistDrillDownDisabled();
      });
    }
    else {
      this.artistsService.createArtist(artist).subscribe(x => {
        this.artists.push(x);
        this.globalsService.setArtistDrillDownDisabled();
      });
    }
  }

  deleteArtist(artist: Artist): void {
    this.artistsService.deleteArtist(artist.Id).subscribe(x => {
      this.artists.splice(this.artists.findIndex(x => x === artist), 1);
    });
  }

  sortArtistsByName() {
    this.filteredArtist.sort(function (a, b) {
      var textA = a.Name.toUpperCase();
      var textB = b.Name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  onFilterFavorites() {
    if (!this.favoriteFiltered) {
      this.filteredArtist = this.artists.filter(x => x.IsBooked === true);
      this.favoriteFiltered = true;
    } else {
      this.filteredArtist = this.artists;
      this.favoriteFiltered = false;
    }
  }

  onCreateUpdateArtist(artist: Artist) {
    if (artist.Id !== 0) {
      this.artistsService.updateArtist(artist).subscribe(x => {
        this.isEdit = false;
        this.getArtists();
      });
    } else {
      this.artistsService.createArtist(artist).subscribe(x => {
        let index = this.artists.findIndex(x => x.Id === artist.Id);
        if (index !== -1) {
          this.artists[index] = artist;
        } else {
          this.artists.push(artist);
        }
        this.isEdit = false;
      });
    }
  }

  onDeleteArtist(artist: Artist) {
    this.artistsService.deleteArtist(artist.Id).subscribe(x => {
      this.getArtists();
    });
  }

  sortByName(a: Artist, b: Artist) {
    var textA = a.Name.toUpperCase();
    var textB = b.Name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }

  getArtists() {
    this.artistsService.getArtists().subscribe(artists => {
      this.artists = artists;
      this.filteredArtist = this.artists;
    });
  }

}
