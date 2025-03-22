import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'faq-admin-edit',
  templateUrl: './faq-admin-edit.component.html',
  styleUrls: ['./faq-admin-edit.component.css']
})
export class FaqAdminEditComponent implements OnChanges {
  @Input("question") question: Question | null = null; 
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  @Output("onCreateUpdate") onCreateUpdate: EventEmitter<Question> = new EventEmitter<Question>();

  public title: FormControl = new FormControl({value: this.question?.Title, disabled: false});
  public answer: FormControl = new FormControl({value: this.question?.Answer, disabled: false});

  public isPreview: boolean = false;
  public editedQuestion: Question = new Question();


  constructor() { }

  ngOnChanges(): void {
    this.title.setValue(this.question?.Title);
    this.answer.setValue(this.question?.Answer);
  }

  onPreview(): void{
    	this.editedQuestion.Title = this.title.value;
      this.editedQuestion.Answer = this.answer.value;
      this.isPreview = true;
  }

  onEndPreview(): void{
    this.isPreview = false;
  }

  onBack(): void{
    this.onBackCall.emit();
  }

  onSave(): void{
    let updatedQuestion = new Question();
    updatedQuestion.Id = this.question !== null ? this.question.Id : 0;
    updatedQuestion.Title = this.title.value;
    updatedQuestion.Answer = this.answer.value;

    this.onCreateUpdate.emit(updatedQuestion);
  }

}
