import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from './models/navItem';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beem-site';
  
  public isTopNav: boolean = true;
  public navItems: NavItem[] = [new NavItem ("Künstler", "Künstlerseite","programm"), 
    new NavItem("Neuigkeiten", "Alle Neuigkeiten übers Beem Festival","news"), 
    new NavItem("Impressum", "Impressum Beem e.V.","impressum")];

  constructor(breakpointObserver: BreakpointObserver,
    public router: Router,
    public authoritheService: AuthService){
    breakpointObserver.observe([
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        this.isTopNav = true;
      }
    });
    breakpointObserver.observe([
      Breakpoints.Tablet,
      Breakpoints.Handset
    ]).subscribe(result => {
      if(result.matches){
        this.isTopNav = false;
      }
    });
  }

  public onNavigateHome(): void  {
    this.router.navigateByUrl("/");
  }

  public onLogout(): void {
    this.authoritheService.logout();
  }

}
