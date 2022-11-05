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
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';


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
    ArtistAdminEditComponent
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
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule
  ],
  providers: [UrlbypassPipe,
              UserService,
              AuthService,
              {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
