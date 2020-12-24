import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthRequest } from 'src/app/store/models/auth-request.model';
import { selectAuthenticatedUser, selectAuthError, selectAuthLoading } from 'src/app/store/selectors/auth.selector';
import { ACTION_AUTH_LOGIN, ACTION_AUTH_REGISTER } from 'src/app/store/store.constants';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {

  auth$ = this.store.select(selectAuthenticatedUser);
  authLoading$ = this.store.select(selectAuthLoading);
  authError$ = this.store.select(selectAuthError);

  constructor(
    private store: Store<any>
  ) { }

  login($event: any) {
    this.store.dispatch({type: ACTION_AUTH_LOGIN, loginRequest: new AuthRequest($event.email, $event.password)});
  }

  register($event: any) {
    this.store.dispatch({type: ACTION_AUTH_REGISTER, registerRequest: $event});
  }
}
