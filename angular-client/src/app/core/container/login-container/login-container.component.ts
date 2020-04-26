import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS_ROUTE } from '../../app.constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  login ($event: any) {
    this.authService.login($event.email, $event.password);
    this.route.navigate([USERS_ROUTE]);
  }

}
