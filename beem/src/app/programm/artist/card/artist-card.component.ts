import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Artist } from "src/app/models/artist";

@Component({
    selector: 'artist-card',
    templateUrl: 'artist-card.component.html',
    styleUrls: ['artist-card.component.scss'],
})
export class ArtistCardComponent implements OnInit {
    
    @Input("artist") artist: Artist = new Artist();
    @Input("isFavorit") isFavorite: boolean = false;
    @Output("setFavorit") setFavorit: EventEmitter<Artist> = new EventEmitter<Artist>();
    @Output("navigateToArtist") navigateToArtist: EventEmitter<Artist> = new EventEmitter<Artist>(); 

    constructor(){

    }

    ngOnInit(): void {
        
    }

    public setFavorite() {
        this.isFavorite = !this.isFavorite;
        this.setFavorit.emit(this.artist);
    }

    public navigateToArtistPage(){
        this.navigateToArtist.emit(this.artist);
    }
}