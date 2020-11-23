import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Meeting } from '../models/meeting.model';
import { Role, User } from '../models/user.model';
import { ACTION_USER_GET_MEETINGS, ACTION_USER_GET_USERS, ACTION_USER_GET_ROLES, ACTION_USER_GET_MEETINGS_SUCCESS, ACTION_USER_GET_USERS_SUCCESS, ACTION_USER_GET_ROLES_SUCCESS } from '../store.constants';


@Injectable()
export class UserEffects {

    @Effect()
    getUserMeetings$ = this.actions$.pipe(
      ofType(ACTION_USER_GET_MEETINGS),
      mergeMap(() => this.userService.getUserMeetings()
        .pipe(
          map((meetingsResult: Meeting[]) => {
            const meetings = [];
            meetingsResult.forEach((meeting: Meeting) => {
              meetings.push({
                ...meeting,
                meetingStartDate: meeting.meetingStartDate ?
                  new Date(meeting.meetingStartDate) : null,
                meetingEndDate: meeting.meetingEndDate ?
                  new Date(meeting.meetingEndDate) : null,
              });
            });
            return { type: ACTION_USER_GET_MEETINGS_SUCCESS, meetings };
          }),
          /*catchError((err: any) => {
            // return of(getIssueListFail({ error: error.message}))
            console.error(err);
          })*/
        )
      )
    );

    @Effect()
    getUsers$ = this.actions$.pipe(
      ofType(ACTION_USER_GET_USERS),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map((users: User[]) => {
            return { type: ACTION_USER_GET_USERS_SUCCESS, users };
          }),
          /*catchError((err: any) => {
            // return of(getIssueListFail({ error: error.message}))
            console.error(err);
          })*/
        )
      )
    );

    @Effect()
    getRoles$ = this.actions$.pipe(
      ofType(ACTION_USER_GET_ROLES),
      mergeMap(() => this.userService.getRoles()
        .pipe(
          map((roles: Role[]) => {
            return { type: ACTION_USER_GET_ROLES_SUCCESS, roles };
          }),
          /*catchError((err: any) => {
            // return of(getIssueListFail({ error: error.message}))
            console.error(err);
          })*/
        )
      )
    );

    constructor(private actions$: Actions, private userService: UserService) {}
}