import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/store/selectors/auth.selector';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<any>, public router: Router) {}

  canActivate(): /*Observable<boolean>*/ boolean {
    return true;
    /*return this.store.pipe(
      select(isAuthenticated),
      map(authed => {
        if (!authed) {
          console.log('navigate login');
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );*/
  }
}