import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { ProgrammComponent } from './programm/programm.component';
import { NewsComponent } from './news/news.component';
import { ArtistCardComponent } from './programm/artist/card/artist-card.component';
import { ArtistSiteComponent } from './programm/artist/site/artist-site.component';
import { UrlbypassPipe } from './pipes/urlbyass.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProgrammComponent,
    NewsComponent,
    ArtistCardComponent,
    ArtistSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [UrlbypassPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
