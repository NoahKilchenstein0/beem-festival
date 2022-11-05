import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'artist-admin-edit',
  templateUrl: './artist-admin-edit.component.html',
  styleUrls: ['./artist-admin-edit.component.css']
})
export class ArtistAdminEditComponent implements OnInit, OnChanges {
  @Input("artist") artist: Artist | null = null;
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  @Output("onCreateUpdate") onCreateUpdate: EventEmitter<Artist> = new EventEmitter<Artist>();

  public name: FormControl = new FormControl({value: this.artist?.name, disabled: false});
  //Genre möglich noch auf Select Umstellen mit einem Enum???
  public genre: FormControl = new FormControl({value: this.artist?.genre, disabled: false});
  public startTime: FormControl = new FormControl({value: this.artist?.dayStartTime, disabled: false});
  public playTime: FormControl = new FormControl({value: this.artist?.playTime, disabled: false});
  public description: FormControl = new FormControl({value: this.artist?.description, disabled: false});
  public img: FormControl = new FormControl({value: this.artist?.img, disabled: false});
  public isBooked: FormControl = new FormControl({value: this.artist?.isBooked, disabled: false});
  public isActive: FormControl = new FormControl({value: this.artist?.isActivated, disabled: false});
  public spotify: FormControl = new FormControl({value: this.artist?.spotify, disabled: false});
  public website: FormControl = new FormControl({value: this.artist?.website, disabled: false});
  public instagram: FormControl = new FormControl({value: this.artist?.instagramm, disabled: false});
  public stage: FormControl = new FormControl({value: this.artist?.stage, disabled: false});

  public stages = Stages;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      this.name.setValue(this.artist?.name);
      this.genre.setValue(this.artist?.genre);
      this.startTime.setValue(this.artist?.dayStartTime);
      this.playTime.setValue(this.artist?.playTime);
      this.description.setValue(this.artist?.description);
      this.img.setValue(this.artist?.img);
      this.isBooked.setValue(this.artist?.isBooked);
      this.isActive.setValue(this.artist?.isActivated);
      this.spotify.setValue(this.artist?.spotify);
      this.website.setValue(this.artist?.website);
      this.instagram.setValue(this.artist?.instagramm);
      this.stage.setValue(this.artist?.stage);
  }

  ngOnInit() {

  }

  onBack(): void {
    this.onBackCall.emit();
  }

  onSave(): void {
    let updateArtist = new Artist();
    updateArtist.id = this.artist !== null ? this.artist.id : 0;
    updateArtist.name = this.name.value;
    updateArtist.dayStartTime = this.startTime.value;
    updateArtist.genre = this.genre.value;
    updateArtist.playTime = this.playTime.value;
    updateArtist.description = this.description.value;
    updateArtist.img = this.img.value;
    updateArtist.isBooked = this.isBooked.value;
    updateArtist.isActivated = this.isActive.value;
    updateArtist.spotify = this.spotify.value;
    updateArtist.website = this.website.value;
    updateArtist.instagramm = this.instagram.value;
    updateArtist.stage = this.stage.value;
    this.onCreateUpdate.emit(updateArtist);
  }

}

export const Stages: string[] = ["Beem Stage", "Träcker Stage"];
