import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/store/selectors/auth.selector';
import { map } from 'rxjs/operators';
import { LOGIN_ROUTE } from '../app.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<any>, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(isAuthenticated),
      map(authed => {
        if (!authed) {
          this.router.navigate([LOGIN_ROUTE]);
          return false;
        }
        return true;
      })
    );
  }
}
