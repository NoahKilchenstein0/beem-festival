import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Artist } from "src/app/models/artist";
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { UrlbypassPipe } from "src/app/pipes/urlbyass.pipe";

@Component({
    selector: 'artist-site',
    templateUrl: 'artist-site.component.html',
    styleUrls: ['artist-site.component.scss'],
})
export class ArtistSiteComponent implements OnInit {
    @Input("artist") artist: Artist = new Artist();
    @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
    public embedURI: SafeResourceUrl;

    constructor(public urlbypassPipe: UrlbypassPipe){
    }

    ngOnInit(): void {       
        this.embedURI = this.urlbypassPipe.transform(this.artist.spotify);
    }


    public getEndTime() : string {  
        return moment(this.artist.dayStartTime).add(this.artist.playTime, 'minutes').format("HH:mm").toString();
    }

    public onFacebook(): void {
        window.open(this.artist.website, '_blank').focus();
    }

    public onInstagram(): void {
        window.open(this.artist.instagramm, '_blank').focus();
    }

    public onBack(): void {
        this.onBackCall.emit();
    }
}