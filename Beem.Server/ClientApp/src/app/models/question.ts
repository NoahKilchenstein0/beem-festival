export class Question {
    constructor(init?:Partial<Question>){
        Object.assign(this, init);
    }
    Id: number = 0
    Title: string = "";
    Answer: string = "";
}
