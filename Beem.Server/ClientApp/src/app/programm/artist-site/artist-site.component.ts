import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Artist } from 'src/app/models/artist';
import * as moment from 'moment';
import { UrlbypassPipe } from 'src/app/pipes/Urlbypass.pipe';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'artist-site',
  templateUrl: './artist-site.component.html',
  styleUrls: ['./artist-site.component.css']
})
export class ArtistSiteComponent implements OnInit {

  @Input("artist") artist: Artist = new Artist();
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  public embedURI!: SafeResourceUrl;

  constructor(public urlbypassPipe: UrlbypassPipe, private locationStrategy: LocationStrategy){
  }

  ngOnInit(): void {       
      this.embedURI = this.urlbypassPipe.transform(this.artist.Spotify);
  }


  public getEndTime() : string {  
      return moment(this.artist.DayStartTime).add(this.artist.PlayTime, 'minutes').format("HH:mm").toString();
  }

  public getStartTime() : string {  
    return moment(this.artist.DayStartTime).format("HH:mm").toString();
  }

  public onFacebook(): void {
    let facebookLink = this.artist !== null && this.artist?.Website !== "" ? this.artist.Website : "https://www.facebook.com/";
    window.open(facebookLink, '_blank')?.focus();
  }

  public onInstagram(): void {
      let instagramLink = this.artist !== null && this.artist?.Instagram !== "" ? this.artist.Instagram : "https://www.instagram.com/";
      window.open(instagramLink, '_blank')?.focus();
  }

  public onBack(): void {
      this.onBackCall.emit();
  }

  public createImgPath(serverPath: string) {
    return location.origin + "/" + serverPath; 
  }

  public isFacebook(artist: Artist):boolean {
    return artist?.Website !== ""
  }

  public isInstagram(artist: Artist):boolean {
    return artist?.Instagram !== ""
  }

  public getArtistDescription(){
    return this.artist === undefined ? "" : this.artist.Description;
  }

}
