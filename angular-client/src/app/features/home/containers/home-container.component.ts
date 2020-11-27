import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserError, selectUserLoading, selectUserMeetings } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  userMeetings$ = this.store.select(selectUserMeetings);

  userLoading$ = this.store.select(selectUserLoading);
  userError$ = this.store.select(selectUserError);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getUserMeetings();
  }

  getUserMeetings() {
    this.store.dispatch({ type: '[User] get meetings' });
  }

}
