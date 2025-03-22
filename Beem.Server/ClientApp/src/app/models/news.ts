export class News {
    constructor(init?:Partial<News>){
        Object.assign(this, init);
    }
    Id: number = 0
    Title: string = "";
    Img: string = "";
    ImgHeader: string = "";
    NewsText: string = "";
    PublicationDateTime: Date = new Date();
    IsActive: boolean = false;
}
