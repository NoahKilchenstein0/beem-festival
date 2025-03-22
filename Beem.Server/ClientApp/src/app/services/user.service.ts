import { Injectable, OnInit } from '@angular/core';
import { Roles, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  public user: User | null = null;

  ngOnInit(): void {
    const userName = localStorage.getItem("userName");
    console.log(userName);
    if(userName !== undefined && userName !== null){
      this.user = new User();
      this.user.UserName = userName;
      const jwtToken = localStorage.getItem("id_token");
      this.user.JwtToken = jwtToken !== null ? jwtToken: "";
      this.user.Role = Roles.Admin;
    }

  }

  public isAdmin(): boolean{
    if(this.user === null){
      return false;
    }
    return this.user.Role === Roles.Admin;
  }

}
