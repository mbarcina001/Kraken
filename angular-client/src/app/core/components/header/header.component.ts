import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser, selectIsAuthenticated } from 'src/app/store/selectors/auth.selector';
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

  ngOnInit() {
    this.getAuthenticatedUser$.subscribe(user => {
      if (user && user.roles.indexOf(appConstants.ADMIN_ROLE) !== -1) {
        this.isAdmin = true;
      }
    });
  }

  userIsAdmin() {
    return this.isAdmin;
  }

  getActiveRoute() {
    return this.router.url.replace('/', '');
  }

}
