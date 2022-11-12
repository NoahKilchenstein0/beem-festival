import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { NewsSiteComponent } from './news/news-site/news-site.component';
import { NewsStartpageComponent } from './news/news-startpage/news-startpage.component';
import { NewsComponent } from './news/news.component';
import { ProgrammComponent } from './programm/programm.component';

const routes: Routes = [
  {path: 'programm', component: ProgrammComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news-site/:id', component: NewsSiteComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: '', component: NewsStartpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }
