import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser, selectIsAuthenticated } from 'src/app/store/selectors/auth.selector';
import { ACTION_AUTH_LOGOUT } from 'src/app/store/store.constants';
import * as appConstants from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  getAuthenticatedUser$ = this.store.select(selectAuthenticatedUser);

  EXPOSE_CONSTANTS = appConstants;
  isAdmin = false;

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthenticatedUser$.subscribe(user => {
      if (user && user.roles.find(role => role.name === appConstants.ADMIN_ROLE)) {
        this.isAdmin = true;
      }
    });
  }

  userIsAdmin(): boolean {
    return this.isAdmin;
  }

  getActiveRoute(): string {
    return this.router.url.replace('/', '');
  }

  logout(): void {
    this.store.dispatch({type: ACTION_AUTH_LOGOUT});
  }

}
