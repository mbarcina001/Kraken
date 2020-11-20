import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserMeetings } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  userMeetings$ = this.store.select(selectUserMeetings);

  userLoading$ = this.store.select(state => state.user.loading);
  userErrorMessage$ = this.store.select(state => state.user.error);

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
