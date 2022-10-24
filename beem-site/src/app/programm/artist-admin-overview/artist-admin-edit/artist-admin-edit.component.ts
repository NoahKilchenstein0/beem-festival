import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'artist-admin-edit',
  templateUrl: './artist-admin-edit.component.html',
  styleUrls: ['./artist-admin-edit.component.css']
})
export class ArtistAdminEditComponent implements OnInit {
  @Input("artist") artist: Artist = new Artist();
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  @Output("onCreateUpdate") onCreateUpdate: EventEmitter<Artist> = new EventEmitter<Artist>();

  public name: FormControl = new FormControl({value: this.artist.name, disabled: false});
  //Genre möglich noch auf Select Umstellen mit einem Enum???
  public genre: FormControl = new FormControl({value: this.artist.genre, disabled: false});
  public startTime: FormControl = new FormControl({value: this.artist.dayStartTime, disabled: false});
  public playTime: FormControl = new FormControl({value: this.artist.playTime, disabled: false});
  public description: FormControl = new FormControl({value: this.artist.description, disabled: false});
  public isBooked: FormControl = new FormControl({value: this.artist.isBooked, disabled: false});
  public isActive: FormControl = new FormControl({value: this.artist.isActivated, disabled: false});

  constructor() { }

  ngOnInit() {
    console.log(this.artist);
  }

  onBack(): void {
    this.onBackCall.emit();
  }

  onSave(): void {
    this.onCreateUpdate.emit(this.artist);
  }

}
