import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles, User } from '../models/user';
import * as moment from 'moment';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User| null> = new BehaviorSubject<User | null>(null);
  public userSaved: Observable<User| null> = this.userSubject.asObservable();
       
      constructor(private http: HttpClient, private userService: UserService, 
        private router: Router) {
          const user = localStorage.getItem('user');
          if(user != null){
            this.userSubject = new BehaviorSubject<User | null>(JSON.parse(user));
            this.userSaved = this.userSubject.asObservable();
          }
      }

      public get userValue(): User|null {
        return this.userSubject.value;
    }
        
      login(userName:string, password:string ) {
        return this.http.post<User>('/api/Authenticate/login', {userName, password}).subscribe((res: User) => this.setSession(res,userName));
      }

      private setSession(authResult: User, userName: string) {
        const expiresAt = moment(authResult.expiration).add('second');

        localStorage.setItem('id_token', authResult.jwtToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        localStorage.setItem('user', JSON.stringify(authResult));
        if(this.userSubject === undefined){
          this.userSubject = new BehaviorSubject<User | null>(authResult);
          this.userSaved = this.userSubject.asObservable();
        }
        else {
          this.userSubject.next(authResult);
        }
        this.router.navigateByUrl('/');
      }          

    logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/']);
      
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
