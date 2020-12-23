import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Meeting } from 'src/app/store/models/meeting.model';
import { selectAuthenticatedUser } from 'src/app/store/selectors/auth.selector';
import { selectMeetings, selectMeetingsLoading } from 'src/app/store/selectors/meeting.selector';
import { selectUsers, selectUserLoading } from 'src/app/store/selectors/user.selector';
import { ACTION_MEETING_CREATE_MEETING, ACTION_MEETING_DELETE_MEETING, ACTION_MEETING_EDIT_MEETING, ACTION_MEETING_GET_MEETINGS,
  ACTION_USER_GET_USERS } from 'src/app/store/store.constants';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  getAuthenticatedUser$ = this.store.select(selectAuthenticatedUser);
  userList$ = this.store.select(selectUsers);
  userListLoading$ = this.store.select(selectUserLoading);
  userMeetings$ = this.store.select(selectMeetings);
  meetingLoading$ = this.store.select(selectMeetingsLoading);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getUserMeetings();
    this.getUserList();
  }

  getUserMeetings() {
    this.store.dispatch({ type: ACTION_MEETING_GET_MEETINGS });
  }

  getUserList() {
    this.store.dispatch({ type: ACTION_USER_GET_USERS });
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
