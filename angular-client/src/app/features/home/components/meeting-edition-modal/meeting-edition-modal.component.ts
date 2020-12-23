import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ATTENDANT_DELETE_CONFIRM_COOKIE } from 'src/app/core/app.constants';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { validateMeetingDates } from 'src/app/shared/validators/meeting-dates.validator';
import { User } from 'src/app/store/models/user.model';

@Component({
  selector: 'app-meeting-edition-modal',
  templateUrl: './meeting-edition-modal.component.html',
  styleUrls: ['./meeting-edition-modal.component.scss']
})
export class MeetingEditionModalComponent {

  public meetingEditionForm: FormGroup;
  public creatingMeeting = false;

  public attendantListCopy: User[];
  public selectedAttendant: User = null;

  constructor(
    private dialogRef: MatDialogRef<MeetingEditionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number, description: string, meetingStartDate: Date, meetingEndDate: Date,
      attendantList: User[], userList: User[], disabled: boolean, organiser: User
    },
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public formValidationService: FormValidationService,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) {
    this.meetingEditionForm = this.formBuilder.group({
      description: new FormControl(data.description, [Validators.required]),
      meetingStartDate: new FormControl(data.meetingStartDate, [Validators.required]),
      meetingEndDate: new FormControl(data.meetingEndDate, [Validators.required]),
    },
    {
      validators: [validateMeetingDates()],
      updateOn: 'blur',
    });

    this.attendantListCopy = Object.assign([], this.data.attendantList);

    if (!data.id || data.id === -1) {
      this.creatingMeeting = true;
    } else {
      this.meetingEditionForm.addControl('id', new FormControl(data.id));
    }

    if (data.disabled) {
      this.meetingEditionForm.disable();
    }
  }

  onSaveMeeting() {
    if (this.meetingEditionForm.valid) {
      console.log(this.attendantListCopy);
      this.meetingEditionForm.addControl('attendantList', new FormControl(this.attendantListCopy));
      this.meetingEditionForm.addControl('organiser', new FormControl(this.data.organiser));
      this.dialogRef.close(this.meetingEditionForm.value);
    } else {
      // tslint:disable-next-line: forin
      for (const i in this.meetingEditionForm.controls) {
        this.meetingEditionForm.controls[i].updateValueAndValidity();
        this.meetingEditionForm.controls[i].markAsTouched();
      }
      this.toastrService.error('Please fix all errors in form', 'Error');
    }
  }

  close() {
    this.dialogRef.close();
  }

  addAttendant() {
    this.attendantListCopy.push(this.selectedAttendant);
  }

  removeAttendant(pUser: User) {
    if (!this.cookieService.get(ATTENDANT_DELETE_CONFIRM_COOKIE)) {
      const confirmDialogRef = this.dialog.open(ModalConfirmComponent, {
        data: {
          message: 'Are you sure you want to delete attendant ' + pUser.username + '?',
          cookie: ATTENDANT_DELETE_CONFIRM_COOKIE
        }
      });
      confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.doRemoveAttendant(pUser);
        }
      });
    } else {
      this.doRemoveAttendant(pUser);
    }
  }

  doRemoveAttendant(pUser: User){
    this.attendantListCopy.splice(this.attendantListCopy.findIndex(user => user.id === pUser.id), 1);
  }

  public userComparisonFunction(option: User, value: User): boolean {
    return value && option && value.id === option.id;
  }

  public getUsersNotAttendants(): User[] {
    return this.data.userList.filter(
      user => user.id !== this.data.organiser.id && this.attendantListCopy.find(attendant => attendant.id === user.id) == null
    );
  }

}
