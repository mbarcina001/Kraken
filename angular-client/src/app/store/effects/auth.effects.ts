import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth.model';
import { HOME_ROUTE, LOGIN_ROUTE } from 'src/app/core/app.constants';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ACTION_AUTH_LOGIN, ACTION_AUTH_LOGIN_ERROR, ACTION_AUTH_LOGIN_SUCCESS, ACTION_AUTH_LOGOUT, ACTION_AUTH_LOGOUT_SUCCESS } from '../store.constants';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    @Effect()
    auth$ = this.actions$.pipe(
      ofType(ACTION_AUTH_LOGIN),
      switchMap((action: any) =>
        this.authService.auth(action.loginRequest.email, action.loginRequest.password).pipe(
          map((result: any) => {
            const decoded: any = jwt_decode(result.access_token);
            const authenticatedUser = new Auth(decoded.email, decoded.user_name, result.access_token, decoded.authorities);
            this.route.navigate([HOME_ROUTE]);
            return { type: ACTION_AUTH_LOGIN_SUCCESS, authenticatedUser };
          }),
          catchError((err: any) => {
            return of({ type: ACTION_AUTH_LOGIN_ERROR, error: err });
          }),
        )
      )
    );

    @Effect()
    logout$ = this.actions$.pipe(
      ofType(ACTION_AUTH_LOGOUT),
      map(() => {
        this.route.navigate([LOGIN_ROUTE]);
        return { type: ACTION_AUTH_LOGOUT_SUCCESS };
      })
    );

    constructor(private actions$: Actions, private authService: AuthService, private route: Router) {}
}
