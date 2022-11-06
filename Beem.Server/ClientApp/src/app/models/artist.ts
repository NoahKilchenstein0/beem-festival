export class Artist {
    constructor(init?:Partial<Artist>){
        Object.assign(this, init);
    }
    id: number = 0
    name: string = "";
    genre: string = "";
    img: string = "";
    imgHeader: string = "";
    description: string = "";
    spotify: string = "";
    website: string = "";
    instagramm: string = "";
    stage: string = "";
    dayStartTime: Date = new Date(); 
    playTime: number = 0;
    isActivated: boolean = false;
    isBooked: boolean = false;
}
