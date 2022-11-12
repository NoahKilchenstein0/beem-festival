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
  public img!: { dbPath: ''; };
  public isBooked: FormControl = new FormControl({value: this.artist?.isBooked, disabled: false});
  public isActive: FormControl = new FormControl({value: this.artist?.isActivated, disabled: false});
  public isLineUpPlaned: FormControl = new FormControl({value: this.artist?.isLineUpPlaned, disabled: false});
  public spotify: FormControl = new FormControl({value: this.artist?.spotify, disabled: false});
  public website: FormControl = new FormControl({value: this.artist?.website, disabled: false});
  public instagram: FormControl = new FormControl({value: this.artist?.instagramm, disabled: false});
  public stage: FormControl = new FormControl({value: this.artist?.stage, disabled: false});
  public imgHeader!: { dbPath: ''; };

  public stages = Stages;

  public isPreview: boolean = false;
  public editedArtist: Artist = new Artist();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      this.name.setValue(this.artist?.name);
      this.genre.setValue(this.artist?.genre);
      this.startTime.setValue(this.artist?.dayStartTime);
      this.playTime.setValue(this.artist?.playTime);
      this.description.setValue(this.artist?.description);
      this.isBooked.setValue(this.artist?.isBooked);
      this.isActive.setValue(this.artist?.isActivated);
      this.spotify.setValue(this.artist?.spotify);
      this.website.setValue(this.artist?.website);
      this.instagram.setValue(this.artist?.instagramm);
      this.stage.setValue(this.artist?.stage);
      this.isLineUpPlaned.setValue(this.artist?.isLineUpPlaned);
  }

  ngOnInit() {

  }

  onPreview(): void {
    this.editedArtist.name = this.name.value;
    this.editedArtist.dayStartTime = this.startTime.value;
    this.editedArtist.genre = this.genre.value;
    this.editedArtist.playTime = this.playTime.value;
    this.editedArtist.description = this.description.value;
    this.editedArtist.isBooked = this.isBooked.value;
    this.editedArtist.isActivated = this.isActive.value;
    this.editedArtist.spotify = this.spotify.value;
    this.editedArtist.website = this.website.value;
    this.editedArtist.instagramm = this.instagram.value;
    this.editedArtist.isLineUpPlaned = this.isLineUpPlaned.value;
    this.editedArtist.stage = this.stage.value;    if(this.img !== undefined)
    {
      this.editedArtist.img = this.img.dbPath
    }
    else if(this.artist !== null)
    {
      this.editedArtist.img = this.artist.img; 
    }
    else 
    {
      this.editedArtist.img = "";
    }
    if(this.imgHeader !== undefined)
    {
      this.editedArtist.imgHeader = this.imgHeader.dbPath
    }
    else if(this.artist !== null)
    {
      this.editedArtist.imgHeader = this.artist.imgHeader; 
    }
    else 
    {
      this.editedArtist.imgHeader = "";
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
    updateArtist.id = this.artist !== null ? this.artist.id : 0;
    updateArtist.name = this.name.value;
    updateArtist.dayStartTime = this.startTime.value;
    updateArtist.genre = this.genre.value;
    updateArtist.playTime = this.playTime.value;
    updateArtist.description = this.description.value;
    updateArtist.isBooked = this.isBooked.value;
    updateArtist.isActivated = this.isActive.value;
    updateArtist.spotify = this.spotify.value;
    updateArtist.website = this.website.value;
    updateArtist.instagramm = this.instagram.value;
    updateArtist.stage = this.stage.value;
    updateArtist.isLineUpPlaned = this.isLineUpPlaned.value;
    if(this.img !== undefined)
    {
      updateArtist.img = this.img.dbPath
    }
    else if(this.artist !== null)
    {
      updateArtist.img = this.artist.img; 
    }
    else 
    {
      updateArtist.img = "";
    }
    if(this.imgHeader !== undefined)
    {
      updateArtist.imgHeader = this.imgHeader.dbPath
    }
    else if(this.artist !== null)
    {
      updateArtist.imgHeader = this.artist.imgHeader; 
    }
    else 
    {
      updateArtist.imgHeader = "";
    }
    this.onCreateUpdate.emit(updateArtist);
  }

  public uploadImageFinished(event: any){
    this.img = event;
  }

  public uploadHeaderImageFinished(event: any){
    this.imgHeader = event;
  }
}

export const Stages: string[] = ["Beem Stage", "Träcker Stage"];
