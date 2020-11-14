import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser, isAuthenticated } from 'src/app/store/selectors/auth.selector';
import { ADMIN_ROLE } from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isAuthenticated$ = this.store.select(isAuthenticated);
  isAdmin = false;

  getAuthenticatedUser$ = this.store.select(getAuthenticatedUser);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.getAuthenticatedUser$.subscribe(user => {
      console.log(user);
      if (user && user.roles.indexOf(ADMIN_ROLE) !== -1) {
        this.isAdmin = true;
      }
    });
  }

  userIsAdmin() {
    return this.isAdmin;
  }

}
