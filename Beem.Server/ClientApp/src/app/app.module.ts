import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProgrammComponent } from './programm/programm.component';
import { NewsComponent } from './news/news.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ArtistCardComponent } from './programm/artist-card/artist-card.component';
import { ArtistSiteComponent } from './programm/artist-site/artist-site.component';
import { UrlbypassPipe } from './pipes/Urlbypass.pipe';
import { UserService } from './services/user.service';
import { ArtistAdminOverviewComponent } from './programm/artist-admin-overview/artist-admin-overview.component';
import { ArtistAdminEditComponent } from './programm/artist-admin-overview/artist-admin-edit/artist-admin-edit.component';
import { NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ArtistService } from './services/artist.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { RichTextEditorModule } from 'src/richtexteditor/richtexteditor.module';
import {MatSelectModule} from '@angular/material/select';
import { ImpressumComponent } from './impressum/impressum.component';
import { GlobalService } from './services/global.service';
import { ImageUploadModule } from 'src/image-upload/image-upload.module';
import { NewsService } from './services/news.service';
import { NewsCardComponent } from './news/news-card/news-card.component';
import { NewsSiteComponent } from './news/news-site/news-site.component';
import { NewsAdminOverviewComponent } from './news/news-admin-overview/news-admin-overview.component';
import { NewsAdminEditComponent } from './news/news-admin-overview/news-admin-edit/news-admin-edit.component';
import { NewsStartpageComponent } from './news/news-startpage/news-startpage.component';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "l, LTS"
  },
  display: {
    dateInput: "l, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  declarations: [						
    AppComponent,
    ProgrammComponent,
    NewsComponent,
    NavBarComponent,
    AdminLoginComponent,
    ArtistCardComponent,
    ArtistSiteComponent,
    ArtistAdminOverviewComponent,
    ArtistAdminEditComponent,
    NewsCardComponent,
    NewsSiteComponent,
    NewsAdminOverviewComponent,
    NewsAdminEditComponent,
    ImpressumComponent,
    NewsStartpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatIconModule,
    RichTextEditorModule,
    MatSelectModule,
    ImageUploadModule
  ],
  providers: [UrlbypassPipe,
              UserService,
              AuthService,
              ArtistService,
              GlobalService,
              NewsService,
              {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
              AuthInterceptor,
              {
                   provide: HTTP_INTERCEPTORS,
                   useExisting: AuthInterceptor,
                   multi: true
               }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
