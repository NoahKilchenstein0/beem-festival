import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/navItem';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input("navItems") navItems: NavItem[] = [];
  
  public user: User | null = null;

  constructor(public router: Router,
              public authoritheService: AuthService) 
  {
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
