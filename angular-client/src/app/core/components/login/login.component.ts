import { Component, Output, EventEmitter, ViewChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { LOGIN_TEMPLATE, REGISTER_TEMPLATE } from '../../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  @ViewChild('loginTmpl') loginTmpl: TemplateRef<any>;
  @ViewChild('registerTmpl') registerTmpl: TemplateRef<any>;

  @Output() doLogin = new EventEmitter<any>();
  @Output() doRegister = new EventEmitter<any>();

  private showingTemplate = LOGIN_TEMPLATE;

  constructor(private cdRef:ChangeDetectorRef){} 

  ngAfterViewInit() {
    this.cdRef.detectChanges();
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
