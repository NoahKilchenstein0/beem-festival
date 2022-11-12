export class News {
    constructor(init?:Partial<News>){
        Object.assign(this, init);
    }
    id: number = 0
    title: string = "";
    img: string = "";
    imgHeader: string = "";
    newsText: string = "";
    publicationDateTime: Date = new Date(); 
}
