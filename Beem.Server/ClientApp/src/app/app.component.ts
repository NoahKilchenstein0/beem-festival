import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NavItem } from './models/navItem';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';


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

  constructor(public globalService: GlobalService,
    public router: Router,
    public authoritheService: AuthService){
      
    this.router.onSameUrlNavigation = "reload";
    this.router.events.subscribe(Event => {
      if(Event instanceof NavigationEnd){
        if(Event.url === "/programm"){
          this.globalService.setArtistDrillDownDisabled();
        }
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
