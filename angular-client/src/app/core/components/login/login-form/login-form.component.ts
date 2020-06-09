import { Component, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  @Output() showRegisterTemplate = new EventEmitter<any>();
  @Output() doLogin = new EventEmitter<any>();

  public loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  showErrors(controlName: string) {
    return (this.loginForm.controls[controlName].dirty || this.loginForm.controls[controlName].touched)
      && this.loginForm.controls[controlName].errors;
  }

  validateAndLogin(): void {
    if (this.loginForm.valid) {
      this.doLogin.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
