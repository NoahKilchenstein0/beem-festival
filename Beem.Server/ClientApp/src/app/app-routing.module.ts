import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FaqComponent } from './faq/faq.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { NewsSiteComponent } from './news/news-site/news-site.component';
import { NewsStartpageComponent } from './news/news-startpage/news-startpage.component';
import { NewsComponent } from './news/news.component';
import { ProgrammComponent } from './programm/programm.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

const routes: Routes = [
  {path: 'programm', component: ProgrammComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news-site/:id', component: NewsSiteComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'timetable', component: TimetableComponent},
  {path: 'ticket-info', component: TicketInfoComponent},
  {path: '', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }
