import {Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/store/models/user.model';

@Component({
  selector: 'app-user-edition-modal',
  templateUrl: './user-edition-modal.component.html',
  styleUrls: ['./user-edition-modal.component.scss']
})

export class UserEditionModalComponent {

  creatingUser = false;
  public userEditionForm: FormGroup;
  allRoles: Role[];

  constructor(
    private dialogRef: MatDialogRef<UserEditionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {id: number, username: string, email: string, roles: Role[], allRoles: Role[]},
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    const userRoles = Array.isArray(data.roles) ? data.roles : [data.roles];
    this.userEditionForm = this.formBuilder.group({
      id: new FormControl(data.id),
      username: new FormControl(data.username, [Validators.required]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      roles: new FormControl([userRoles], [Validators.required]),
    });

    if (!data.id || data.id === -1) {
      this.creatingUser = true;
      this.userEditionForm.addControl('password', new FormControl('', [Validators.required]))
      this.userEditionForm.addControl('confirmPassword', new FormControl('', [Validators.required]))
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
      this.toastrService.error("NOK desc", "NOK title");
    }

    this.dialogRef.close(this.userEditionForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  getRoleName(role: Role) {
    return role.name.toLowerCase().replace('role_', '');
  }

  public roleComparisonFunction( option: Role, value: Role ): boolean {
    return option.id === value.id;
  }
}
