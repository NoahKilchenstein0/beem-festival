import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Artist } from 'src/app/models/artist';
import * as moment from 'moment';
import { UrlbypassPipe } from 'src/app/pipes/Urlbypass.pipe';

@Component({
  selector: 'artist-site',
  templateUrl: './artist-site.component.html',
  styleUrls: ['./artist-site.component.css']
})
export class ArtistSiteComponent implements OnInit {

  @Input("artist") artist: Artist = new Artist();
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  public embedURI!: SafeResourceUrl;

  constructor(public urlbypassPipe: UrlbypassPipe){
  }

  ngOnInit(): void {       
      this.embedURI = this.urlbypassPipe.transform(this.artist.spotify);
  }


  public getEndTime() : string {  
      return moment(this.artist.dayStartTime).add(this.artist.playTime, 'minutes').format("HH:mm").toString();
  }

  public getStartTime() : string {  
    return moment(this.artist.dayStartTime).format("HH:mm").toString();
  }

  public onFacebook(): void {
    let facebookLink = this.artist !== null && this.artist?.website !== "" ? this.artist.website : "https://www.facebook.com/";
    window.open(facebookLink, '_blank')?.focus();
  }

  public onInstagram(): void {
      let instagramLink = this.artist !== null && this.artist?.instagramm !== "" ? this.artist.instagramm : "https://www.instagram.com/";
      window.open(instagramLink, '_blank')?.focus();
  }

  public onBack(): void {
      this.onBackCall.emit();
  }

}
