import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS_ROUTE } from '../../app.constants';
import { Store } from '@ngrx/store';
import { auth } from '../../../store/actions/auth.actions';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {

  auth$ = this.store.select(state => state.auth.authResult);
  authLoading$ = this.store.select(state => state.auth.loading);
  authErrorMessage$ = this.store.select(state => state.auth.error);

  constructor(
    private store: Store<any>
  ) { }

  login($event: any) {
    this.store.dispatch(auth({email: $event.email, password: $event.password}));
    // this.route.navigate([USERS_ROUTE]);
  }

  register($event: any) {
    // TODO
  }
}
