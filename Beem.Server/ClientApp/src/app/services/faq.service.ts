import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

constructor(private http: HttpClient) { }

public getQuestions(){
  return this.http.get<Question[]>('/api/Question');
}

public createQuestion(question: Question){
  return this.http.post<Question>('/api/Question', question);
}

public updateQuestion(question: Question){ 
  return this.http.put<Question>('/api/Question/Update('+ question.Id + ')', question);
}

public deleteQuestion(id: number){
  return this.http.delete<void>('/api/Question/Delete('+ id + ')');
}
}
