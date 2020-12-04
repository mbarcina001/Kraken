import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';
import { ACTION_MEETING_GET_MEETINGS, ACTION_MEETING_GET_MEETINGS_SUCCESS, ACTION_MEETING_GET_MEETINGS_ERROR, ACTION_MEETING_CREATE_MEETING,
    ACTION_MEETING_CREATE_MEETING_SUCCESS, ACTION_MEETING_EDIT_MEETING_SUCCESS, ACTION_MEETING_DELETE_MEETING,
    ACTION_MEETING_DELETE_MEETING_SUCCESS, ACTION_MEETING_EDIT_MEETING } from '../store.constants';

@Injectable()
  export class MeetingEffects {

  constructor(private actions$: Actions, private meetingService: MeetingService) {}

  @Effect()
  getUserMeetings$ = this.actions$.pipe(
    ofType(ACTION_MEETING_GET_MEETINGS),
    switchMap(() => this.meetingService.getUserMeetings()
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
          return { type: ACTION_MEETING_GET_MEETINGS_SUCCESS, meetings };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_MEETING_GET_MEETINGS_ERROR, error: err });
        }),
      )
    )
  );

  @Effect()
  createMeeting$ = this.actions$.pipe(
    ofType(ACTION_MEETING_CREATE_MEETING),
    switchMap((action: any) => this.meetingService.createMeeting(action.meeting)
      .pipe(
        map(() => {
          return { type: ACTION_MEETING_CREATE_MEETING_SUCCESS }
        }),
        catchError((err: any) => {
          return of({ type: ACTION_MEETING_GET_MEETINGS_ERROR, error: err });
        }),
      )
    )
  );

  @Effect()
  createMeetingSuccess$ = this.actions$.pipe(
    ofType(ACTION_MEETING_CREATE_MEETING),
    map(() => {
      // TODO: Show toast
      return { type: ACTION_MEETING_GET_MEETINGS };
    })
  );

  @Effect()
  editMeeting$ = this.actions$.pipe(
    ofType(ACTION_MEETING_CREATE_MEETING),
    switchMap((action: any) => this.meetingService.editMeeting(action.meeting)
      .pipe(
        map(() => {
          return { type: ACTION_MEETING_EDIT_MEETING_SUCCESS }
        }),
        catchError((err: any) => {
          return of({ type: ACTION_MEETING_GET_MEETINGS_ERROR, error: err });
        }),
      )
    )
  );

  @Effect()
  editMeetingSuccess$ = this.actions$.pipe(
    ofType(ACTION_MEETING_EDIT_MEETING),
    map(() => {
      // TODO: Show toast
      return { type: ACTION_MEETING_GET_MEETINGS };
    })
  );

  @Effect()
  deleteMeeting$ = this.actions$.pipe(
    ofType(ACTION_MEETING_CREATE_MEETING),
    switchMap((action: any) => this.meetingService.deleteMeeting(action.meeting.id)
      .pipe(
        map(() => {
          return { type: ACTION_MEETING_DELETE_MEETING_SUCCESS }
        }),
        catchError((err: any) => {
          return of({ type: ACTION_MEETING_GET_MEETINGS_ERROR, error: err });
        }),
      )
    )
  );

  @Effect()
  deleteMeetingSuccess$ = this.actions$.pipe(
    ofType(ACTION_MEETING_DELETE_MEETING),
    map(() => {
      // TODO: Show toast
      return { type: ACTION_MEETING_GET_MEETINGS };
    })
  );

}
