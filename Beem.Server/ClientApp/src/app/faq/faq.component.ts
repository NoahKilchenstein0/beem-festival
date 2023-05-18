import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { FaqService } from '../services/faq.service';
import { Question } from '../models/question';
import { Roles, User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public questions: Question[] = [];
  public isAdminView: boolean = false;
  public isDrillDownActive: boolean = false;
  public user: User | null = null;
  public isEdit: boolean = false;
  public selectedQuestion: Question = new Question();

  constructor(public globalsService: GlobalService,
    public faqService: FaqService,
    public authenticationService: AuthService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    if (this.isAdminOnly()) {
      this.isAdminView = true;
    }
    this.faqService.getQuestions().subscribe(x => {
      this.questions = x.sort(y => y.id);
      console.log(x);
    });
    this.globalsService.isQuestionDrillDown.subscribe(x => {
      this.isDrillDownActive = x;
    });
  }

  onSwap(): void {
    if (this.isAdminView) {
      this.isAdminView = false;
    }
    else {
      this.isAdminView = true;
    }
  }

  isAdmin(): boolean {
    if (this.user === null) {
      return false;
    }
    return this.user.role === Roles.Admin && this.isAdminView;
  }

  isAdminOnly(): boolean {
    if (this.user === null) {
      return false;
    }
    return this.user.role === Roles.Admin;
  }

  navigateToEditQuestion(question: Question): void {
    this.globalsService.setQuestionsDrillDownActive();
    if (question.id !== 0) {
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.selectedQuestion = question;
  }

  onBack(): void {
    this.globalsService.setQuestionsDrillDownDisabled();
  }
  updateQuestion(question: Question) {
    if (this.isEdit) {
      this.faqService.updateQuestion(question).subscribe(x => {
        let index = this.questions.findIndex(x => x.id === question.id);
        this.questions.splice(index, 1);
        this.questions.push(x);
        this.globalsService.setQuestionsDrillDownDisabled();
      });
    }
    else {
      this.faqService.createQuestion(question).subscribe(x => {
        this.questions.push(x);
        this.globalsService.setQuestionsDrillDownDisabled();
      });
    }
  }

  deleteQuestion(question: Question): void {
    this.faqService.deleteQuestion(question.id).subscribe(x => {
      this.questions.splice(this.questions.findIndex(x => x === question), 1);
    });
  }

}
