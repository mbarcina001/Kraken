import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Role, User } from '../models/user.model';
import {
  ACTION_USER_GET_USERS, ACTION_USER_GET_ROLES, ACTION_USER_GET_USERS_SUCCESS, ACTION_USER_GET_ROLES_SUCCESS,
  ACTION_USER_GET_ROLES_ERROR, ACTION_USER_GET_USERS_ERROR, ACTION_USER_CREATE_USER, ACTION_USER_CREATE_USER_ERROR,
  ACTION_USER_CREATE_USER_SUCCESS, ACTION_USER_DELETE_USER, ACTION_USER_DELETE_USER_ERROR, ACTION_USER_DELETE_USER_SUCCESS,
  ACTION_USER_EDIT_USER, ACTION_USER_EDIT_USER_ERROR, ACTION_USER_EDIT_USER_SUCCESS, RESPONSE_CODE_OK, ACTION_AUTH_LOGOUT,
  ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT, ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT
} from '../store.constants';
import { of } from 'rxjs';
import { ApiListResponse } from '../models/api-list-response';
import { ToastrService } from 'ngx-toastr';
import { ERROR_TITLE, SUCCESS_TITLE } from 'src/app/core/app.constants';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toastrService: ToastrService,
  ) { }

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_USERS),
    switchMap(() => this.userService.getUsers()
      .pipe(
        map((usersResponse: ApiListResponse<User>) => {
          if (usersResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_USER_GET_USERS_SUCCESS, users: usersResponse.data };
          }
          return of({ type: ACTION_USER_GET_USERS_ERROR, error: usersResponse.errorMessage });
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_GET_USERS_ERROR, error: err.statusText });
        }),
      )
    )
  );


  @Effect()
  getRoles$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_ROLES),
    switchMap(() => this.userService.getRoles()
      .pipe(
        map((rolesResponse: ApiListResponse<Role>) => {
          if (rolesResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_USER_GET_ROLES_SUCCESS, roles: rolesResponse.data };
          }
          return of({ type: ACTION_USER_GET_ROLES_ERROR, roles: rolesResponse.errorMessage });
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_GET_ROLES_ERROR, error: err.statusText });
        }),
      )
    )
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType(ACTION_USER_CREATE_USER),
    switchMap((action: any) => this.userService.createUser(action.user)
      .pipe(
        map((userResponse: ApiListResponse<User>) => {
          if (userResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_USER_CREATE_USER_SUCCESS, users: userResponse.data };
          }
          return { type: ACTION_USER_CREATE_USER_ERROR, error: userResponse.errorMessage };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_CREATE_USER_ERROR, error: err.statusText });
        }),
      )
    )
  );

  @Effect({ dispatch: false })
  createUserSuccess$ = this.actions$.pipe(
    ofType(ACTION_USER_CREATE_USER_SUCCESS),
    map(() => {
      this.toastrService.success('User created successfully', SUCCESS_TITLE);
    })
  );

  @Effect({ dispatch: false })
  createUserError$ = this.actions$.pipe(
    ofType(ACTION_USER_CREATE_USER_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error, ERROR_TITLE);
    })
  );

  @Effect()
  editUser$ = this.actions$.pipe(
    ofType(ACTION_USER_EDIT_USER),
    switchMap((action: any) => this.userService.editUser(action.user)
      .pipe(
        map((userResponse: ApiListResponse<User>) => {
          if (userResponse.returnCode === RESPONSE_CODE_OK) {
            return action.forceLogout ?
              { type: ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT, users: userResponse.data } :
              { type: ACTION_USER_EDIT_USER_SUCCESS, users: userResponse.data };
          }
          return { type: ACTION_USER_EDIT_USER_ERROR, error: userResponse.errorMessage };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_EDIT_USER_ERROR, error: err.statusText });
        }),
      )
    )
  );

  @Effect({ dispatch: false })
  editUserSuccess$ = this.actions$.pipe(
    ofType(ACTION_USER_EDIT_USER_SUCCESS),
    map(() => {
      this.toastrService.success('User edited successfully', SUCCESS_TITLE);
    })
  );

  @Effect()
  editUserSuccessForceLogout$ = this.actions$.pipe(
    ofType(ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT),
    map(() => {
      this.toastrService.success('User edited successfully', SUCCESS_TITLE);
      return { type: ACTION_AUTH_LOGOUT };
    })
  );

  @Effect({ dispatch: false })
  editUserError$ = this.actions$.pipe(
    ofType(ACTION_USER_EDIT_USER_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error, ERROR_TITLE);
    })
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(ACTION_USER_DELETE_USER),
    switchMap((action: any) => this.userService.deleteUser(action.user)
      .pipe(
        map((userResponse: ApiListResponse<User>) => {
          if (userResponse.returnCode === RESPONSE_CODE_OK) {
            return action.forceLogout ?
              { type: ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT, users: userResponse.data } :
              { type: ACTION_USER_DELETE_USER_SUCCESS, users: userResponse.data };
          }
          return { type: ACTION_USER_DELETE_USER_ERROR, error: userResponse.errorMessage };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_DELETE_USER_ERROR, error: err.statusText });
        }),
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserSuccess$ = this.actions$.pipe(
    ofType(ACTION_USER_DELETE_USER_SUCCESS),
    map(() => {
      this.toastrService.success('User deleted successfully', SUCCESS_TITLE);
    })
  );

  @Effect()
  deleteUserSuccessForceLogout$ = this.actions$.pipe(
    ofType(ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT),
    map(() => {
      this.toastrService.success('User deleted successfully', SUCCESS_TITLE);
      return { type: ACTION_AUTH_LOGOUT };
    })
  );

  @Effect({ dispatch: false })
  deleteUserError$ = this.actions$.pipe(
    ofType(ACTION_USER_DELETE_USER_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error, ERROR_TITLE);
    })
  );
}
