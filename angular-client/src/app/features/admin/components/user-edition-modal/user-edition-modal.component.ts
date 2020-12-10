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
      username: new FormControl(data.username, [Validators.required]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      roles: new FormControl([userRoles], [Validators.required]),
    });

    if (!data.id || data.id === -1) {
      this.creatingUser = true;
    } else {
      this.userEditionForm.addControl('id', new FormControl(data.id));
    }

    if (data.password) {
      this.userEditionForm.addControl('password', new FormControl(data.password, [Validators.required]));
      this.userEditionForm.addControl('confirmPassword', new FormControl(data.password,
        [Validators.required, validateConfirmPassword(this.userEditionForm)]));
    } else {
      this.userEditionForm.addControl('password', new FormControl('', [Validators.required]));
      this.userEditionForm.addControl('confirmPassword', new FormControl('',
        [Validators.required, validateConfirmPassword(this.userEditionForm)]));
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

  public roleComparisonFunction( option: Role, value: Role[] ): boolean {
    return value.find(role => role.id === option.id) != null;
  }
}
