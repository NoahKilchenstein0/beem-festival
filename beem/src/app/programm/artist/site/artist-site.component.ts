import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Artist } from "src/app/models/artist";
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    selector: 'artist-site',
    templateUrl: 'artist-site.component.html',
    styleUrls: ['artist-site.component.scss'],
})
export class ArtistSiteComponent implements OnInit {
    @Input("artist") artist: Artist = new Artist();
    public safeSrc: SafeResourceUrl;
    constructor(private sanitizer: DomSanitizer){
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.artist.spotify);
    }

    ngOnInit(): void {
        
    }


    public getEndTime() : string {  
        return moment(this.artist.dayStartTime).add(this.artist.playTime, 'minutes').format("HH:mm").toString();
    }
}