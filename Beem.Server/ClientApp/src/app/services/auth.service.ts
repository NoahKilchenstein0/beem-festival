import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles, User } from '../models/user';
import * as moment from 'moment';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

       
      constructor(private http: HttpClient, private userService: UserService, 
        private router: Router) {
      }
        
      login(userName:string, password:string ) {
        return this.http.post<User>('/api/Authenticate/login', {userName, password}).subscribe((res: any) => this.setSession(res,userName));
      }

      private setSession(authResult: any, userName: string) {
        const expiresAt = moment().add(authResult.expiration,'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        this.userService.user.userName = userName,
        this.userService.user.role = Roles.Admin,
        this.userService.user.jwtToken = authResult.idToken;
        console.log("Succesfully logged in");
        this.router.navigateByUrl('/');
      }          

    logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
      return !this.isLoggedIn();
    }

    getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      if(expiration !== null){
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
      }
      else {
        return moment();
      }
    }         
}
