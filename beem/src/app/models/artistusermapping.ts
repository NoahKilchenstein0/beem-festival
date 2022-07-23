export class ArtistUserMapping{
        constructor(init?:Partial<ArtistUserMapping>){
            Object.assign(this, init);
        }

    artistId: number = 0;
    userId: number = 0;
}