import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Meeting } from 'src/app/store/models/meeting.model';
import { selectMeetings, selectMeetingsLoading, selectMeetingsError } from 'src/app/store/selectors/meeting.selector';
import { ACTION_MEETING_CREATE_MEETING, ACTION_MEETING_DELETE_MEETING, ACTION_MEETING_EDIT_MEETING, ACTION_MEETING_GET_MEETINGS } from 'src/app/store/store.constants';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  userMeetings$ = this.store.select(selectMeetings);
  meetingLoading$ = this.store.select(selectMeetingsLoading);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getUserMeetings();
  }

  getUserMeetings() {
    this.store.dispatch({ type: ACTION_MEETING_GET_MEETINGS });
  }

  createMeeting(pMeeting: Meeting) {
    this.store.dispatch({ type: ACTION_MEETING_CREATE_MEETING, meeting: pMeeting });
  }

  editMeeting(pMeeting: Meeting) {
    this.store.dispatch({ type: ACTION_MEETING_EDIT_MEETING, meeting: pMeeting });
  }

  deleteMeeting(pMeeting: Meeting) {
    this.store.dispatch({ type: ACTION_MEETING_DELETE_MEETING, meeting: pMeeting });
  }

}
