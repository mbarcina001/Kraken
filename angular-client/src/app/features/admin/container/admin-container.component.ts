import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsers, selectRoles } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  allRoles$ = this.store.select(selectRoles);

  userLoading$ = this.store.select(state => state.user.loading);
  userErrorMessage$ = this.store.select(state => state.user.error);

  constructor( private store: Store<any> ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.store.dispatch({ type: '[User] get users' });
    this.store.dispatch({ type: '[User] get roles' });
  }

}
