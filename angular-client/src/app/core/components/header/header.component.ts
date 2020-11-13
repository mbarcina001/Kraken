import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticated$ = this.store.select(isAuthenticated);

  constructor(
    private store: Store<any>
  ) { }

}
