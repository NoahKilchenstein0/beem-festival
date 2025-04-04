import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FaqComponent } from './faq/faq.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { NewsSiteComponent } from './news/news-site/news-site.component';
import { NewsComponent } from './news/news.component';
import { ProgrammComponent } from './programm/programm.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SponsoringComponent } from './sponsoring/sponsoring.component';
import { NewsAdminOverviewComponent } from './news/news-admin-overview/news-admin-overview.component';

const routes: Routes = [
  {path: 'lineup', component: ProgrammComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news-site/:id', component: NewsSiteComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'timetable', component: TimetableComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'sponsoring', component: SponsoringComponent},
  {path: 'news-admin-overview', component: NewsAdminOverviewComponent},
  {path: '', component: NewsComponent},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }
