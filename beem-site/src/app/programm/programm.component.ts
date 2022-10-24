import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Artist } from '../models/artist';
import { Roles } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-programm',
  templateUrl: './programm.component.html',
  styleUrls: ['./programm.component.css']
})
export class ProgrammComponent implements OnInit {

  public artists: Artist[] = [new Artist({id:1,
    name:"Slipknot", 
    genre:"New-Metal", 
    description:"Slipknot sind mit ihrem neuem Album 'The End so Far' dieses Jahr zu Besuch auf dem Beem", 
    img: "https://www.morecore.de/wp-content/uploads/slipknot-promo-01-2021-Credit-Alexandra-Gray-official-press-scaled.jpg",
    spotify: "https://open.spotify.com/embed/artist/05fG473iIaoy82BF1aGhL8?utm_source=generator",
    website: "https://www.facebook.com/slipknot",
    instagramm: "https://www.instagram.com/slipknot/?hl=de",
    dayStartTime: new Date(2022, 8, 12, 19, 15, 0, 0),
    playTime: 120,
    stage: "Mainstage"}),
    new Artist({id:2,
      name:"Knochenfabrik", 
      genre:"Punk", 
      description:"Knochenfabrik die Legendären Punks beehren uns dieses Jahr mit ihren Hits wie Grüne Haare und Filmriss. Wir hoffen ihr freut euch so wie wir.", 
      img: "https://i.scdn.co/image/ab6761610000e5ebabd75659c41a87b007c1beef",
      spotify: "https://open.spotify.com/embed/artist/1UYCASaega8cRJKw4jqU4Q?utm_source=generator"}),
      new Artist({id:3,
        name:"The Ghost Inside", 
        genre:"Post-Hardcore", 
        description:"The Ghost Inside sind endlich zurück und stärke als je zuvor die Energetischen Kracher Live auf dem Beem", 
        img: "https://www.metal-hammer.de/wp-content/uploads/2020/06/24/10/the-ghost-inside2020c_jonathan-weiner-pr-992x560.jpg",
        spotify: "https://open.spotify.com/embed/artist/6kQB2RN7WwryMdJ1MoQh1E?utm_source=generator"}),
        new Artist({id:4,
          name:"Boysetsfire", 
          genre:"Post-Hardcore", 
          description:"Nathan Grey mit seiner Band Boysetfire sind der garant für eine Emotionale Setlist die trotzdem zum Ausrasten einlädt.", 
          img: "http://www.laut.de/Boysetsfire/boysetsfire-165213.jpg",
          spotify: "https://open.spotify.com/embed/artist/6kw9NLPmn9FdQq0gAIx0Bj?utm_source=generator"}),
          new Artist({id:5,
            name:"Parkway Drive", 
            genre:"Metalcore", 
            description:"Die Australischen Sunnie Boys werden dieses Jahr mit ihrem neuem Album einen Grandiose Feuershow abliefern", 
            img: "https://www.kingstar-music.com/wp-content/uploads/2018/07/ParkwayDrive_DaveLepage_003Default_HiRes-scaled.jpg",
            spotify: "https://open.spotify.com/embed/artist/159qqlGwzE04xyqpfAwRLo?utm_source=generator"}),
            new Artist({id:6,
              name:"Future Palace", 
              genre:"Post-Hardcore Alternativ", 
              description:"Future Palace eine junge Deutscheband mit einer sehr Interessanten Sound Mischung es wird wild zwischen Post Hardcore und Alternativ Rock gewechselt die aufstrebenden Stars.", 
              img: "https://www.morecore.de/wp-content/uploads/future-palace-01-2022-credit-hello-bipo-official-press.jpg",
              spotify: "https://open.spotify.com/embed/artist/4QnuZOyl4C9d1keyOZXJ21?utm_source=generator"})
     ];

  public filteredArtist: Artist[] = [];
  private favoriteFiltered: boolean = false;
  public selectedArtist: Artist = new Artist();
  public isDrillDownActive: boolean = false;

  public isEdit: boolean = false;

  constructor(public router: Router,
              public userService: UserService) {
  
  }

  ngOnInit(): void {
    this.filteredArtist = this.artists;
  }

  navigateToArtistPage(artist:Artist): void{
    this.selectedArtist = artist;
    this.isDrillDownActive = true;
  }



  onBack(): void {
    this.isDrillDownActive = false;
  }

  isAdmin(): boolean {
    if(this.userService.user !== null)
    {
      return this.userService.user.role === Roles.Admin
    }
    return false;
  }

  navigateToEditArtist(artist:Artist): void {
    this.isDrillDownActive = true;
    if(artist !== new Artist){
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    console.log(this.isEdit);
    this.selectedArtist = artist;
  }

  deleteArtist(artist:Artist): void {
    this.artists.splice(this.artists.findIndex(x => x === artist),1);
  }

}
