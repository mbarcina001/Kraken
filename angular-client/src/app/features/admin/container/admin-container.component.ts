import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsers, selectRoles, selectUserLoading, selectUserError } from 'src/app/store/selectors/user.selector';
import { ACTION_USER_GET_ROLES, ACTION_USER_GET_USERS } from 'src/app/store/store.constants';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  allRoles$ = this.store.select(selectRoles);

  userLoading$ = this.store.select(selectUserLoading);
  userErrorMessage$ = this.store.select(selectUserError);

  constructor( private store: Store<any> ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.store.dispatch({ type: ACTION_USER_GET_USERS });
    this.store.dispatch({ type: ACTION_USER_GET_ROLES });
  }

}
