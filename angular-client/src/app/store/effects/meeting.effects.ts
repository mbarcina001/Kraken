import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SUCCESS_TITLE, ERROR_TITLE } from 'src/app/core/app.constants';
import { ApiListResponse } from '../models/api-list-response';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';
import { ACTION_MEETING_GET_MEETINGS, ACTION_MEETING_GET_MEETINGS_SUCCESS, ACTION_MEETING_GET_MEETINGS_ERROR, ACTION_MEETING_CREATE_MEETING,
    ACTION_MEETING_CREATE_MEETING_SUCCESS, ACTION_MEETING_EDIT_MEETING_SUCCESS, ACTION_MEETING_DELETE_MEETING,
    ACTION_MEETING_DELETE_MEETING_SUCCESS, ACTION_MEETING_EDIT_MEETING, ACTION_MEETING_CREATE_MEETING_ERROR,
    ACTION_MEETING_DELETE_MEETING_ERROR, ACTION_MEETING_EDIT_MEETING_ERROR, RESPONSE_CODE_OK } from '../store.constants';

@Injectable()
  export class MeetingEffects {

  constructor(
    private actions$: Actions,
    private meetingService: MeetingService,
    private toastrService: ToastrService
  ) {}

  @Effect()
  getUserMeetings$ = this.actions$.pipe(
    ofType(ACTION_MEETING_GET_MEETINGS),
    switchMap(() => this.meetingService.getUserMeetings()
      .pipe(
        map((meetingResponse: ApiListResponse<Meeting>) => {
          if (meetingResponse.returnCode === RESPONSE_CODE_OK) {
            const meetings = [];
            meetingResponse.data.forEach((meeting: Meeting) => {
              meetings.push({
                ...meeting,
                meetingStartDate: meeting.meetingStartDate ?
                  new Date(meeting.meetingStartDate) : null,
                meetingEndDate: meeting.meetingEndDate ?
                  new Date(meeting.meetingEndDate) : null,
              });
            });
            return { type: ACTION_MEETING_GET_MEETINGS_SUCCESS, meetings };
          }
          return { type: ACTION_MEETING_GET_MEETINGS_ERROR, error: meetingResponse.errorMessage };
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
        map((meetingResponse: ApiListResponse<Meeting>) => {
          if (meetingResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_MEETING_CREATE_MEETING_SUCCESS, meetings: meetingResponse.data };
          }
          return { type: ACTION_MEETING_CREATE_MEETING_ERROR, error: meetingResponse.errorMessage };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_MEETING_CREATE_MEETING_ERROR, error: err });
        }),
      )
    )
  );

  @Effect({dispatch: false})
  createMeetingSuccess$ = this.actions$.pipe(
    ofType(ACTION_MEETING_CREATE_MEETING_SUCCESS),
    map(() => {
      this.toastrService.success('Meeting created successfully', SUCCESS_TITLE);
    })
  );

  @Effect({dispatch: false})
  createMeetingError$ = this.actions$.pipe(
    ofType(ACTION_MEETING_CREATE_MEETING_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error, ERROR_TITLE);
    })
  );

  @Effect()
  editMeeting$ = this.actions$.pipe(
    ofType(ACTION_MEETING_EDIT_MEETING),
    switchMap((action: any) => this.meetingService.editMeeting(action.meeting)
      .pipe(
        map((meetingResponse: ApiListResponse<Meeting>) => {
          if (meetingResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_MEETING_EDIT_MEETING_SUCCESS, meetings: meetingResponse.data };
          }
          return { type: ACTION_MEETING_EDIT_MEETING_ERROR, error: meetingResponse.errorMessage };
        }),
        catchError((err: any) => {
          return of({ type: ACTION_MEETING_EDIT_MEETING_ERROR, error: err });
        }),
      )
    )
  );

  @Effect({dispatch: false})
  editMeetingSuccess$ = this.actions$.pipe(
    ofType(ACTION_MEETING_EDIT_MEETING_SUCCESS),
    map(() => {
      this.toastrService.success('Meeting edited successfully', SUCCESS_TITLE);
    })
  );

  @Effect({dispatch: false})
  editMeetingError$ = this.actions$.pipe(
    ofType(ACTION_MEETING_EDIT_MEETING_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error, ERROR_TITLE);
    })
  );

  @Effect()
  deleteMeeting$ = this.actions$.pipe(
    ofType(ACTION_MEETING_DELETE_MEETING),
    switchMap((action: any) => this.meetingService.deleteMeeting(action.meeting)
      .pipe(
        map((meetingResponse: ApiListResponse<Meeting>) => {
          if (meetingResponse.returnCode === RESPONSE_CODE_OK) {
            return { type: ACTION_MEETING_DELETE_MEETING_SUCCESS, meeting: meetingResponse.data };
          }
          return { type: ACTION_MEETING_DELETE_MEETING_ERROR, error: meetingResponse.errorMessage };
        }),
      )
    )
  );

  @Effect({dispatch: false})
  deleteMeetingSuccess$ = this.actions$.pipe(
    ofType(ACTION_MEETING_DELETE_MEETING_SUCCESS),
    map(() => {
      this.toastrService.success('Meeting deleted successfully', SUCCESS_TITLE);
    })
  );

  @Effect({dispatch: false})
  deleteMeetingError$ = this.actions$.pipe(
    ofType(ACTION_MEETING_DELETE_MEETING_ERROR),
    map((action: any) => {
      this.toastrService.error(action.error, ERROR_TITLE);
    })
  );

}
