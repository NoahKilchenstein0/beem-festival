import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  exampleArtist: Artist = new Artist();
  exampleArtist2: Artist = new Artist();


  constructor() { 
    this.exampleArtist.dayStartTime = new Date();
    this.exampleArtist.name = "Auahauwuahs";
    this.exampleArtist2.dayStartTime = new Date();
    this.exampleArtist2.name = "Liveband385";
  }

  ngOnInit(): void {
  }

  /**
   * getAllActive
   * durchiterieren
   * jedes einzelne Objekt in TT aufstellen
   */

}
