import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { getUserMeetings, getUserMeetingsSuccess, getUsers, getUsersSuccess } from '../actions/user.actions';
import { Meeting } from '../models/meeting.model';
import { User } from '../models/user.model';


@Injectable()
export class UserEffects {

    @Effect()
    getUserMeetings$ = this.actions$.pipe(
      ofType(getUserMeetings),
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
            return getUserMeetingsSuccess({ meetings });
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
      ofType(getUsers),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map((users: User[]) => {
            return getUsersSuccess({ users });
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