import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

}
