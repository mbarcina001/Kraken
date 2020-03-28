import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  login ($event: any) {
    console.log('login');
    console.log($event);
  }

}
