import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Role, User } from '../models/user.model';
import { ACTION_USER_GET_USERS, ACTION_USER_GET_ROLES, ACTION_USER_GET_USERS_SUCCESS, ACTION_USER_GET_ROLES_SUCCESS,
  ACTION_USER_GET_ROLES_ERROR, ACTION_USER_GET_USERS_ERROR } from '../store.constants';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_USERS),
    switchMap(() => this.userService.getUsers()
      .pipe(
        map((users: User[]) => {
          return { type: ACTION_USER_GET_USERS_SUCCESS, users };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_GET_USERS_ERROR, error: err });
        }),
      )
    )
  );


  @Effect()
  getRoles$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_ROLES),
    switchMap(() => this.userService.getRoles()
      .pipe(
        map((roles: Role[]) => {
          return { type: ACTION_USER_GET_ROLES_SUCCESS, roles };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_GET_ROLES_ERROR, error: err });
        }),
      )
    )
  );
}
