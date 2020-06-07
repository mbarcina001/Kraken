import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LOGIN_TEMPLATE, REGISTER_TEMPLATE } from '../../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginTmpl') loginTmpl: TemplateRef<any>;
  @ViewChild('registerTmpl') registerTmpl: TemplateRef<any>;

  @Output() doLogin = new EventEmitter<any>();

  public loginForm: FormGroup;
  private showingTemplate = LOGIN_TEMPLATE;

  constructor() { }

  ngOnInit(): void {
    /*this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });*/
  }

  validateAndLogin(): void {
    if (this.loginForm.valid) {
      this.doLogin.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showErrors(controlName: string) {
    return (this.loginForm.controls[controlName].dirty || this.loginForm.controls[controlName].touched)
      && this.loginForm.controls[controlName].errors;
  }

  getShowingTemplate() {
    return this.showingTemplate === LOGIN_TEMPLATE ? this.loginTmpl : this.registerTmpl;
  }

  showLoginTemplate() {
    this.showingTemplate = LOGIN_TEMPLATE;
  }

  showRegisterTemplate() {
    this.showingTemplate = REGISTER_TEMPLATE;
  }

}
