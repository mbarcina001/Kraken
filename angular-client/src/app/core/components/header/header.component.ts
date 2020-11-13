import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser, isAuthenticated } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticated$ = this.store.select(isAuthenticated);
  getAuthenticatedUser$ = this.store.select(getAuthenticatedUser);

  constructor(
    private store: Store<any>
  ) { }

}
