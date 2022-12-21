export class Question {
    constructor(init?:Partial<Question>){
        Object.assign(this, init);
    }
    id: number = 0
    title: string = "";
    answer: string = "";
}
