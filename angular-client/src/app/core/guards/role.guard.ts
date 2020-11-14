import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticatedUser } from 'src/app/store/selectors/auth.selector';
import { map } from 'rxjs/operators';
import { NO_PERMISSIONS_ROUTE } from '../app.constants';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private store: Store<any>, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data.expectedRole;

    return this.store.pipe(
      select(getAuthenticatedUser),
      map(user => {
        if (user.roles.indexOf(expectedRole) === -1) {
          this.router.navigate([NO_PERMISSIONS_ROUTE]);
          return false;
        }
        return true;
      })
    );
  }
}
