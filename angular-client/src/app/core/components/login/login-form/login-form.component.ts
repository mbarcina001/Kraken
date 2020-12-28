import { Component, Output, EventEmitter, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  @Input() enableForm: Observable<any>;
  @Input() isLoading: boolean;
  @Output() showRegisterTemplate = new EventEmitter<any>();
  @Output() doLogin = new EventEmitter<any>();

  public loginForm: FormGroup;
  public avoidAutocompleteLoad = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.avoidAutocompleteLoad = true;
    this.loginForm.disable();
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loginForm.enable();
      this.avoidAutocompleteLoad = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

  showErrors(controlName: string) {
    return (this.loginForm.controls[controlName].dirty || this.loginForm.controls[controlName].touched)
      && this.loginForm.controls[controlName].errors;
  }

  validateAndLogin(): void {
    if (this.loginForm.valid) {
      const sub = this.enableForm.subscribe(x => {
        sub.unsubscribe();
        this.loginForm.enable();
      });
      this.doLogin.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
