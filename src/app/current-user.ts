import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUser {

  setCurrentUser(user: any) {
    console.log(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  deleteCurrentUser() {
    localStorage.clear();
  }
}
