import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent implements OnInit {

  @Input("artist") artist: Artist = new Artist();
  @Output("navigateToArtist") navigateToArtist: EventEmitter<Artist> = new EventEmitter<Artist>(); 

  constructor(private locationStrategy: LocationStrategy, public globalsService: GlobalService){

  }

  ngOnInit(): void {
      
  }

  public navigateToArtistPage(){
      this.navigateToArtist.emit(this.artist);
  }

  public createImgPath(serverPath: string) {
    return location.origin + "/" + serverPath; 
  }

  public isImageVisible(artist:Artist){
    return artist.img !== '' && !this.globalsService.isTopNav;
  }

  public getDescriptionText(artist:Artist){
    return artist.description.substring(0, 255) + " ..."
  }


}
