import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NewsComponent } from './news/news.component';
import { ProgrammComponent } from './programm/programm.component';

const routes: Routes = [
  {path: 'programm', component: ProgrammComponent},
  {path: 'news', component: NewsComponent},
  {path: 'admin-login', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }