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
  ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT, ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT, ACTION_USER_GET_ATTENDANTS, ACTION_USER_GET_ATTENDANTS_ERROR, ACTION_USER_GET_ATTENDANTS_SUCCESS
} from '../store.constants';
import { of } from 'rxjs';
import { ApiListResponse } from '../models/api-list-response';
import { ToastrService } from 'ngx-toastr';
import { ACCESS_DENIED_ERROR, ERROR_TITLE, SUCCESS_TITLE, UNEXPECTED_ERROR } from 'src/app/core/app.constants';

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
          return of({ type: ACTION_USER_GET_USERS_ERROR, error: err });
        }),
      )
    )
  );


  @Effect({dispatch: false})
  getUsersError$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_USERS_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'access_denied' ?
        ACCESS_DENIED_ERROR : UNEXPECTED_ERROR, ERROR_TITLE);
    })
  );

  @Effect()
  getAttendants$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_ATTENDANTS),
    switchMap(() => this.userService.getAttendants()
      .pipe(
        map((usersResponse: ApiListResponse<User>) => {
          if (usersResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_USER_GET_ATTENDANTS_SUCCESS, attendants: usersResponse.data };
          }
          return of({ type: ACTION_USER_GET_ATTENDANTS_ERROR, error: usersResponse.errorMessage });
        }),
        catchError((err: any) => {
          return of({ type: ACTION_USER_GET_ATTENDANTS_ERROR, error: err });
        }),
      )
    )
  );


  @Effect({dispatch: false})
  getAttendantsError$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_ATTENDANTS_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'access_denied' ?
        ACCESS_DENIED_ERROR : UNEXPECTED_ERROR, ERROR_TITLE);
    })
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
          return of({ type: ACTION_USER_GET_ROLES_ERROR, error: err });
        }),
      )
    )
  );

  @Effect({dispatch: false})
  getRolesError$ = this.actions$.pipe(
    ofType(ACTION_USER_GET_ROLES_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'access_denied' ?
        ACCESS_DENIED_ERROR : UNEXPECTED_ERROR, ERROR_TITLE);
    })
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
          return of({ type: ACTION_USER_CREATE_USER_ERROR, error: err });
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
      this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'access_denied' ?
        'Access Denied' : UNEXPECTED_ERROR, ERROR_TITLE);
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
          return of({ type: ACTION_USER_EDIT_USER_ERROR, error: err });
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
      this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'access_denied' ?
        'Access Denied' : UNEXPECTED_ERROR, ERROR_TITLE);
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
          return of({ type: ACTION_USER_DELETE_USER_ERROR, error: err });
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
      this.toastrService.error(action.error.error != null && action.error.error.error != null && action.error.error.error === 'access_denied' ?
        'Access Denied' : UNEXPECTED_ERROR, ERROR_TITLE);
    })
  );
}
