import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Artist } from 'src/app/models/artist';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'artist-admin-edit',
  templateUrl: './artist-admin-edit.component.html',
  styleUrls: ['./artist-admin-edit.component.css']
})
export class ArtistAdminEditComponent implements OnInit, OnChanges {
  @Input("artist") artist: Artist | null = null;
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  @Output("onCreateUpdate") onCreateUpdate: EventEmitter<Artist> = new EventEmitter<Artist>();

  public name: FormControl = new FormControl({value: this.artist?.Name, disabled: false});
  //Genre möglich noch auf Select Umstellen mit einem Enum???
  public genre: FormControl = new FormControl({value: this.artist?.Genre, disabled: false});
  public startTime: FormControl = new FormControl({value: this.artist?.DayStartTime, disabled: false});
  public playTime: FormControl = new FormControl({value: this.artist?.PlayTime, disabled: false});
  public description: FormControl = new FormControl({value: this.artist?.Description, disabled: false});
  public img!: { dbPath: ''; };
  public isBooked: FormControl = new FormControl({value: this.artist?.IsBooked, disabled: false});
  public isActive: FormControl = new FormControl({value: this.artist?.IsActivated, disabled: false});
  public isLineUpPlaned: FormControl = new FormControl({value: this.artist?.IsLineUpPlanned, disabled: false});
  public spotify: FormControl = new FormControl({value: this.artist?.Spotify, disabled: false});
  public website: FormControl = new FormControl({value: this.artist?.Website, disabled: false});
  public instagram: FormControl = new FormControl({value: this.artist?.Instagram, disabled: false});
  public stage: FormControl = new FormControl({value: this.artist?.Stage, disabled: false});
  public imgHeader!: { dbPath: ''; };

  public stages = Stages;

  public isPreview: boolean = false;
  public editedArtist: Artist = new Artist();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.name.setValue(this.artist?.Name);
    this.genre.setValue(this.artist?.Genre);
    this.startTime.setValue(this.artist?.DayStartTime ? new Date(this.artist.DayStartTime) : null);
    this.playTime.setValue(this.artist?.PlayTime);
    this.description.setValue(this.artist?.Description);
    this.isBooked.setValue(this.artist?.IsBooked);
    this.isActive.setValue(this.artist?.IsActivated);
    this.spotify.setValue(this.artist?.Spotify);
    this.website.setValue(this.artist?.Website);
    this.instagram.setValue(this.artist?.Instagram);
    this.stage.setValue(this.artist?.Stage);
    this.isLineUpPlaned.setValue(this.artist?.IsLineUpPlanned);
  }

  ngOnInit() {
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.startTime.setValue(event.value);
    }
  }

  onPreview(): void {
    this.editedArtist.Name = this.name.value;
    this.editedArtist.DayStartTime = this.startTime.value ? this.startTime.value.toISOString() : null;
    this.editedArtist.Genre = this.genre.value;
    this.editedArtist.PlayTime = this.playTime.value;
    this.editedArtist.Description = this.description.value;
    this.editedArtist.IsBooked = this.isBooked.value;
    this.editedArtist.IsActivated = this.isActive.value;
    this.editedArtist.Spotify = this.spotify.value;
    this.editedArtist.Website = this.website.value;
    this.editedArtist.Instagram = this.instagram.value;
    this.editedArtist.IsLineUpPlanned = this.isLineUpPlaned.value;
    this.editedArtist.Stage = this.stage.value;
    if(this.img !== undefined) {
      this.editedArtist.Img = this.img.dbPath;
    } else if(this.artist !== null) {
      this.editedArtist.Img = this.artist.Img; 
    } else {
      this.editedArtist.Img = "";
    }
    if(this.imgHeader !== undefined) {
      this.editedArtist.ImgHeader = this.imgHeader.dbPath;
    } else if(this.artist !== null) {
      this.editedArtist.ImgHeader = this.artist.ImgHeader; 
    } else {
      this.editedArtist.ImgHeader = "";
    }
    this.isPreview = true;
  }

  onEndPrieview(): void {
    this.isPreview = false;
  }

  onBack(): void {
    this.onBackCall.emit();
  }

  onSave(): void {
    let updateArtist = new Artist();
    updateArtist.Id = this.artist !== null ? this.artist.Id : 0;
    updateArtist.Name = this.name.value;
    updateArtist.DayStartTime = this.startTime.value ? this.startTime.value.toISOString() : null;
    updateArtist.Genre = this.genre.value;
    updateArtist.PlayTime = this.playTime.value;
    updateArtist.Description = this.description.value;
    updateArtist.IsBooked = this.isBooked.value;
    updateArtist.IsActivated = this.isActive.value;
    updateArtist.Spotify = this.spotify.value;
    updateArtist.Website = this.website.value;
    updateArtist.Instagram = this.instagram.value;
    updateArtist.Stage = this.stage.value;
    updateArtist.IsLineUpPlanned = this.isLineUpPlaned.value;
    if(this.img !== undefined) {
      updateArtist.Img = this.img.dbPath;
    } else if(this.artist !== null) {
      updateArtist.Img = this.artist.Img; 
    } else {
      updateArtist.Img = "";
    }
    if(this.imgHeader !== undefined) {
      updateArtist.ImgHeader = this.imgHeader.dbPath;
    } else if(this.artist !== null) {
      updateArtist.ImgHeader = this.artist.ImgHeader; 
    } else {
      updateArtist.ImgHeader = "";
    }
    this.onCreateUpdate.emit(updateArtist);
  }

  public uploadImageFinished(event: any) {
    this.img = event;
  }

  public uploadHeaderImageFinished(event: any) {
    this.imgHeader = event;
  }
}

export const Stages: string[] = ["Beem Stage", "Träcker Stage"];
