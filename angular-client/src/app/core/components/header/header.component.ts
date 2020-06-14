import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);

  constructor(
    private store: Store<any>
  ) { }

}
