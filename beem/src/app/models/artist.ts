export class Artist {
    constructor(init?:Partial<Artist>){
        Object.assign(this, init);
    }
    id: number = 0
    name: string = "";
    genre: string = "";
    img: string = "";
    description: string = "";
    spotify: string = "";
    website: string = "";
    instagramm: string = "";
    stage: string = "";
    dayStartTime: Date; 
    playTime: number = 0;
}