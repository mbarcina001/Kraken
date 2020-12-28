import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth.model';
import { HOME_ROUTE, LOGIN_ERROR_TITLE, LOGIN_ROUTE, UNEXPECTED_ERROR, WRONG_CREDENTIALS_ERROR } from 'src/app/core/app.constants';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ACTION_AUTH_LOGIN, ACTION_AUTH_LOGIN_ERROR, ACTION_AUTH_LOGIN_SUCCESS, ACTION_AUTH_LOGOUT, ACTION_AUTH_LOGOUT_SUCCESS,
  ACTION_AUTH_REGISTER, ACTION_AUTH_REGISTER_ERROR, ACTION_AUTH_REGISTER_SUCCESS, RESPONSE_CODE_OK } from '../store.constants';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private route: Router,
    private toastrService: ToastrService
  ) {}

    @Effect()
    auth$ = this.actions$.pipe(
      ofType(ACTION_AUTH_LOGIN),
      switchMap((action: any) =>
        this.authService.auth(action.loginRequest.email, action.loginRequest.password).pipe(
          map((result: any) => {
            const decoded: any = jwt_decode(result.access_token);
            const authenticatedUser = new Auth(decoded.id, decoded.email, decoded.user_name, result.access_token, decoded.authorities);
            return { type: ACTION_AUTH_LOGIN_SUCCESS, authenticatedUser };
          }),
          catchError((err: any) => {
            return of({ type: ACTION_AUTH_LOGIN_ERROR, error: err });
          }),
        )
      )
    );

    @Effect({dispatch: false})
    authSuccess$ = this.actions$.pipe(
      ofType(ACTION_AUTH_LOGIN_SUCCESS),
      map(() => {
        this.route.navigate([HOME_ROUTE]);
      })
    );

    @Effect({dispatch: false})
    authError$ = this.actions$.pipe(
      ofType(ACTION_AUTH_LOGIN_ERROR),
      map((action: any) => {
        this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'invalid_grant' ?
          WRONG_CREDENTIALS_ERROR : UNEXPECTED_ERROR, LOGIN_ERROR_TITLE);
      })
    );

    @Effect()
    register$ = this.actions$.pipe(
      ofType(ACTION_AUTH_REGISTER),
      switchMap((action: any) =>
        this.authService.register(action.registerRequest).pipe(
          map((registerResponse: any) => {
            if (registerResponse.returnCode === RESPONSE_CODE_OK) {
              return { type: ACTION_AUTH_REGISTER_SUCCESS };
            }
            return of({ type: ACTION_AUTH_REGISTER_ERROR, error: registerResponse.errorMessage });
          }),
          catchError((err: any) => {
            return of({ type: ACTION_AUTH_REGISTER_ERROR, error: err.statusText });
          }),
        )
      )
    );

    @Effect({dispatch: false})
    registerSuccess$ = this.actions$.pipe(
      ofType(ACTION_AUTH_REGISTER_SUCCESS),
      map(() => {
        this.toastrService.success('User registered succesfully', 'Register success');
      })
    );

    @Effect({dispatch: false})
    registerError$ = this.actions$.pipe(
      ofType(ACTION_AUTH_REGISTER_ERROR),
      map((action: any) => {
        this.toastrService.error(action.error, 'Register Error');
      })
    );

    @Effect()
    logout$ = this.actions$.pipe(
      ofType(ACTION_AUTH_LOGOUT),
      map(() => {
        this.route.navigate([LOGIN_ROUTE]);
        return { type: ACTION_AUTH_LOGOUT_SUCCESS };
      })
    );
}
