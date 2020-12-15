import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { validateConfirmPassword } from 'src/app/shared/validators/confirm-password.validator';
import { Role } from 'src/app/store/models/user.model';
import * as appConstants from '../../../../core/app.constants';

@Component({
  selector: 'app-user-edition-modal',
  templateUrl: './user-edition-modal.component.html',
  styleUrls: ['./user-edition-modal.component.scss']
})

export class UserEditionModalComponent {

  creatingUser = false;
  public userEditionForm: FormGroup;
  allRoles: Role[];

  public EXPOSE_CONSTANTS = appConstants;

  constructor(
    private dialogRef: MatDialogRef<UserEditionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {id: number, username: string, email: string, roles: Role[], allRoles: Role[], password?: string},
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public formValidationService: FormValidationService
  ) {
    const userRoles = Array.isArray(data.roles) ? data.roles : [data.roles];

    this.userEditionForm = this.formBuilder.group({
      username: new FormControl(data.username, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      email: new FormControl(data.email, [Validators.required, Validators.email, Validators.maxLength(50)]),
      roles: new FormControl(userRoles, [Validators.required]),
    });

    if (!data.id || data.id === -1) {
      this.creatingUser = true;

      if (data.password) {
        this.userEditionForm.addControl('password', new FormControl(data.password,
          [Validators.required, Validators.minLength(5), Validators.maxLength(15)]));
        this.userEditionForm.addControl('confirmPassword', new FormControl(data.password,
          [Validators.required, Validators.minLength(5), Validators.maxLength(15), validateConfirmPassword(this.userEditionForm)]));
      } else {
        this.userEditionForm.addControl('password', new FormControl('',
          [Validators.required, Validators.minLength(5), Validators.maxLength(15)]));
        this.userEditionForm.addControl('confirmPassword', new FormControl('',
          [Validators.required, Validators.minLength(5), Validators.maxLength(15), validateConfirmPassword(this.userEditionForm)]));
      }
    } else {
      this.userEditionForm.addControl('id', new FormControl(data.id));
    }

    this.allRoles = data.allRoles;
  }

  onSaveUser() {
    if (this.userEditionForm.valid) {
      this.dialogRef.close(this.userEditionForm.value);
    } else {
      // tslint:disable-next-line: forin
      for (const i in this.userEditionForm.controls) {
        this.userEditionForm.controls[i].updateValueAndValidity();
        this.userEditionForm.controls[i].markAsTouched();
      }
      this.toastrService.error('Please fill all required fields', 'Error');
    }
  }

  close() {
    this.dialogRef.close();
  }

  getRoleName(role: Role) {
    return role.name.toLowerCase().replace('role_', '');
  }

  public roleComparisonFunction(option: Role, value: Role): boolean {
    return value.id === option.id;
  }
}
