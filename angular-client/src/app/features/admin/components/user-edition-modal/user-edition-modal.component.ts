import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-edition-modal',
  templateUrl: './user-edition-modal.component.html',
  styleUrls: ['./user-edition-modal.component.scss']
})

export class UserEditionModalComponent {

  public userEditionForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {username: string, email: string, roles: string[]},
    private formBuilder: FormBuilder,
  ) {
    this.userEditionForm = this.formBuilder.group({
      username: data.username,
      email: data.email
    });
  }

  onEditUser() {
    console.log('onEditUser');
  }
}
