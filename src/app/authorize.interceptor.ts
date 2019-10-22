import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {LoginService} from './login.service';
import {CurrentUser} from './current-user';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,
              private currentUser: CurrentUser,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log(req);
    if (req.headers.get('noToken') === 'true') {
      return next.handle(req);
    }

    const newRequest = req.clone({
      headers: req.headers.set(
        'Authorization', 'Bearer ' + localStorage.getItem('token')
      )
    });

    console.log(newRequest + " Bauka " + localStorage.getItem('token'));

    return next.handle(newRequest).pipe( catchError(error => {
      console.log(error);
      if (error.status == '401' || error.error == 'unauthorized') {
        this.currentUser.deleteCurrentUser();
        this.loginService.logout();
        this.router.navigate(['login']);
      }
      throw new Error('error');
    }));
  }
}
