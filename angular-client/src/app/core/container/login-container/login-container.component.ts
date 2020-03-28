import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS_ROUTE } from '../../app.constants';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void { }

  login ($event: any) {
    console.log('login');
    console.log($event);
    this.route.navigate([USERS_ROUTE]);
  }

}
