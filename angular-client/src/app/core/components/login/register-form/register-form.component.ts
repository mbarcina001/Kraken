import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { validateConfirmPassword } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() resetForm: Observable<any>;
  @Output() showLoginTemplate = new EventEmitter<any>();
  @Output() doRegister = new EventEmitter<any>();

  public registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    },
    {
      validators: [validateConfirmPassword()],
      updateOn: 'blur',
    });
  }

  showErrors(controlName: string) {
    return (this.registerForm.controls[controlName].dirty || this.registerForm.controls[controlName].touched)
      && this.registerForm.controls[controlName].errors;
  }

  validateAndRegister(): void {
    if (this.registerForm.valid) {
      const sub = this.resetForm.subscribe(x => {
        sub.unsubscribe();
        this.createRegisterForm();
      });
      this.doRegister.emit(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
