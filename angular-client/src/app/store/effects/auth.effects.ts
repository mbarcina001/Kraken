import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { auth, authSuccess } from '../actions/auth.actions';
import { Auth } from '../models/auth.model';
import { HOME_ROUTE } from 'src/app/core/app.constants';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Injectable()
export class AuthEffects {

    @Effect()
    auth$ = this.actions$.pipe(
      ofType(auth),
      mergeMap((action: any) => this.authService.auth(action.email, action.password)
        .pipe(
          map((result: any) => {
            this.route.navigate([HOME_ROUTE]);
            const decoded: any = jwt_decode(result.access_token);
            const authenticatedUser = new Auth('', decoded.user_name, result.access_token, decoded.authorities);
            return authSuccess({ authenticatedUser });
          }),
          /*catchError((err: any) => {
            // return of(getIssueListFail({ error: error.message}))
            console.error(err);
          })*/
        )
      )
    );

    constructor(private actions$: Actions, private authService: AuthService, private route: Router) {}
}