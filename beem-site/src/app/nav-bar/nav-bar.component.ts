import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/navItem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input("navItems") navItems: NavItem[] = [];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public onNavigateHome(): void  {
    this.router.navigateByUrl("/");
  }

}
