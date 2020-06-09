import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() showLoginTemplate = new EventEmitter<any>();
  @Output() doRegister = new EventEmitter<any>();

  public registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  showErrors(controlName: string) {
    return (this.registerForm.controls[controlName].dirty || this.registerForm.controls[controlName].touched)
      && this.registerForm.controls[controlName].errors;
  }

  validateAndRegister(): void {
    if (this.registerForm.valid) {
      this.doRegister.emit(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
