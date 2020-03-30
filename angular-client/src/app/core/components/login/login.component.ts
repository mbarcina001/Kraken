import { Component, OnInit, Output, EventEmitter, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() doLogin = new EventEmitter<any>();

  public loginForm;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  validateAndLogin(): void {
    if(this.loginForm.valid) {
      this.doLogin.emit('test')
    } else {
      console.log("Show errors");
      console.log(this.loginForm);
      this.loginForm.markAllAsTouched();
    }
  }

  showErrors(controlName: string) {
    return (this.loginForm.controls[controlName].dirty || this.loginForm.controls[controlName].touched) && this.loginForm.controls[controlName].errors
  }

}
