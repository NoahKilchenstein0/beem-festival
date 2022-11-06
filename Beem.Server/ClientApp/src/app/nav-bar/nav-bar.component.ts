import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NavItem } from '../models/navItem';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input("navItems") navItems: NavItem[] = [];
  
  public user: User | null = null;
  public name: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authoritheService: AuthService,
    public globalsService: GlobalService) 
  {
    this.router.events.subscribe(Event => {
      if(Event instanceof NavigationEnd){
        if(Event.url === "/programm"){
          this.globalsService.setArtistDrillDownDisabled();
        }
      }
    });
  }

  ngOnInit() {
  }

  public onNavigateHome(): void  {
    this.router.navigateByUrl("/");
  }

  public onLogout(): void {
    this.authoritheService.logout();
  }

}
