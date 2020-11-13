import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'src/app/store/models/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() authenticatedUser: Auth;

  constructor() { }

  ngOnInit(): void {
  }

}
