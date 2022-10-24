import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProgrammComponent } from './programm/programm.component';
import { NewsComponent } from './news/news.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ArtistCardComponent } from './programm/artist-card/artist-card.component';
import { ArtistSiteComponent } from './programm/artist-site/artist-site.component';
import { UrlbypassPipe } from './pipes/Urlbypass.pipe';

@NgModule({
  declarations: [					
    AppComponent,
      ProgrammComponent,
      NewsComponent,
      NavBarComponent,
      AdminLoginComponent,
      ArtistCardComponent,
      ArtistSiteComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [UrlbypassPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
