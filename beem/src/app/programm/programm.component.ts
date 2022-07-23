import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ArtistUserMapping } from '../models/artistusermapping';

@Component({
  selector: 'app-programm',
  templateUrl: './programm.component.html',
  styleUrls: ['./programm.component.scss']
})
export class ProgrammComponent implements OnInit {

  public artists: Artist[] = [new Artist({id:1,
                              name:"Slipknot", 
                              genre:"New-Metal", 
                              description:"Slipknot sind mit ihrem neuem Album 'The End so Far' dieses Jahr zu Besuch auf dem Beem", 
                              img: "https://www.morecore.de/wp-content/uploads/slipknot-promo-01-2021-Credit-Alexandra-Gray-official-press-scaled.jpg"}),
                              new Artist({id:2,
                                name:"Knochenfabrik", 
                                genre:"Punk", 
                                description:"Knochenfabrik die Legendären Punks beehren uns dieses Jahr mit ihren Hits wie Grüne Haare und Filmriss. Wir hoffen ihr freut euch so wie wir.", 
                                img: "https://i.scdn.co/image/ab6761610000e5ebabd75659c41a87b007c1beef"}),
                                new Artist({id:3,
                                  name:"The Ghost Inside", 
                                  genre:"Post-Hardcore", 
                                  description:"The Ghost Inside sind endlich zurück und stärke als je zuvor die Energetischen Kracher Live auf dem Beem", 
                                  img: "https://www.metal-hammer.de/wp-content/uploads/2020/06/24/10/the-ghost-inside2020c_jonathan-weiner-pr-992x560.jpg"}),
                                  new Artist({id:4,
                                    name:"Boysetsfire", 
                                    genre:"Post-Hardcore", 
                                    description:"Nathan Grey mit seiner Band Boysetfire sind der garant für eine Emotionale Setlist die trotzdem zum Ausrasten einlädt.", 
                                    img: "http://www.laut.de/Boysetsfire/boysetsfire-165213.jpg"}),
                                    new Artist({id:5,
                                      name:"Parkway Drive", 
                                      genre:"Metalcore", 
                                      description:"Die Australischen Sunnie Boys werden dieses Jahr mit ihrem neuem Album einen Grandiose Feuershow abliefern", 
                                      img: "https://www.kingstar-music.com/wp-content/uploads/2018/07/ParkwayDrive_DaveLepage_003Default_HiRes-scaled.jpg"}),
                                      new Artist({id:6,
                                        name:"Knochenfabrik", 
                                        genre:"Punk", 
                                        description:"Knochenfabrik die Legendären Punks beehren uns dieses Jahr mit ihren Hits wie Grüne Haare und Filmriss. Wir hoffen ihr freut euch so wie wir.", 
                                        img: "https://i.scdn.co/image/ab6761610000e5ebabd75659c41a87b007c1beef"})
                               ];

  private artistUserMappings: ArtistUserMapping[] = [new ArtistUserMapping({artistId: 1, userId: 1})]

  constructor() { }

  ngOnInit(): void {
  }

  getFavoritState(artist:Artist): boolean{
    return this.artistUserMappings.find(x => x.artistId === artist.id) != null;
  }

  setFavorite(artist: Artist): void{
    console.log(this.artistUserMappings.find(x => x.artistId === artist.id));
    if(this.artistUserMappings.find(x => x.artistId === artist.id) === undefined){
      this.artistUserMappings.push(new ArtistUserMapping({artistId: artist.id, userId: 1}));
    }
    else {
      const index = this.artistUserMappings.findIndex(x => x.artistId === artist.id);
      if (index > -1) {
        this.artistUserMappings.splice(index, 1);
      }
    }
  }
}
