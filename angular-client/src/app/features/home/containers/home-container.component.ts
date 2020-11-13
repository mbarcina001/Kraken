import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  authenticatedUser$ = this.store.select(getAuthenticatedUser);


  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

}
