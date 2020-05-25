import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS_ROUTE } from '../../app.constants';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { auth } from '../../../store/actions/auth.actions';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  auth$ = this.store.select(state => state.auth.auth);
  authLoading$ = this.store.select(state => state.auth.loading);
  authErrorMessage$ = this.store.select(state => state.auth.error);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.auth$.subscribe(x => {
      console.log(x);
    });
  }

  login($event: any) {
    // this.authService.login($event.email, $event.password);
    this.store.dispatch(auth({email: $event.email, password: $event.password}));
    // this.route.navigate([USERS_ROUTE]);
  }

}
