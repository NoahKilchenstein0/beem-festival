export class Artist {
    constructor(init?:Partial<Artist>){
        Object.assign(this, init);
    }
    Id: number = 0
    Name: string = "";
    Genre: string = "";
    Img: string = "";
    ImgHeader: string = "";
    Description: string = "";
    Spotify: string = "";
    Website: string = "";
    Instagram: string = "";
    Stage: string = "";
    DayStartTime: Date = new Date(); 
    PlayTime: number = 0;
    IsActivated: boolean = false;
    IsBooked: boolean = false;
    IsLineUpPlanned: boolean = false;
}
