import { Injectable } from '@angular/core';
import { Roles, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User = new User();

}
