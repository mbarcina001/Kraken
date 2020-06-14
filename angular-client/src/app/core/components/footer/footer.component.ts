import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

}
