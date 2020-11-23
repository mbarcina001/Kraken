import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTION_AUTH_LOGIN } from 'src/app/store/store.constants';
import { auth } from '../../../store/actions/auth.actions';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit{

  auth$ = this.store.select(state => state.auth.authResult);
  authLoading$ = this.store.select(state => state.auth.loading);
  authErrorMessage$ = this.store.select(state => state.auth.error);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {  }



  login($event: any) {
    this.store.dispatch({type: ACTION_AUTH_LOGIN, email: $event.email, password: $event.password});
  }

  register($event: any) {
    // TODO
  }
}
