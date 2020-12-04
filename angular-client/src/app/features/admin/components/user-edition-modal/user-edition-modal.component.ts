import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Role } from 'src/app/store/models/user.model';

@Component({
  selector: 'app-user-edition-modal',
  templateUrl: './user-edition-modal.component.html',
  styleUrls: ['./user-edition-modal.component.scss']
})

export class UserEditionModalComponent {

  public userEditionForm: FormGroup;
  allRoles: Role[];

  constructor(
    private dialogRef: MatDialogRef<UserEditionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {id: number, username: string, email: string, roles: Role[], allRoles: Role[]},
    private formBuilder: FormBuilder,
  ) {
    const userRoles = Array.isArray(data.roles) ? data.roles : [data.roles];
    this.userEditionForm = this.formBuilder.group({
      id: data.id,
      username: data.username,
      email: data.email,
      roles: [userRoles],
    });
    this.allRoles = data.allRoles;
  }

  onEditUser() {
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
