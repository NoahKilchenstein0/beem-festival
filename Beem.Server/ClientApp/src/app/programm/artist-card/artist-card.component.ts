import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent implements OnInit {

  @Input("artist") artist: Artist = new Artist();
  @Output("navigateToArtist") navigateToArtist: EventEmitter<Artist> = new EventEmitter<Artist>(); 

  constructor(private locationStrategy: LocationStrategy){

  }

  ngOnInit(): void {
      
  }

  public navigateToArtistPage(){
      this.navigateToArtist.emit(this.artist);
  }

  public createImgPath(serverPath: string) {
    return location.origin + "/" + serverPath; 
  }

}
