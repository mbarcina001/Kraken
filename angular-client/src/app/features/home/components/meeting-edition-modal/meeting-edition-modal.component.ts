import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-meeting-edition-modal',
  templateUrl: './meeting-edition-modal.component.html',
  styleUrls: ['./meeting-edition-modal.component.scss']
})
export class MeetingEditionModalComponent {

  public meetingEditionForm: FormGroup;
  public creatingMeeting = false;

  constructor(
    private dialogRef: MatDialogRef<MeetingEditionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {id: number, description: string, meetingStartDate: Date, meetingEndDate: Date},
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public formValidationService: FormValidationService
  ) {
    this.meetingEditionForm = this.formBuilder.group({
      description: new FormControl(data.description, [Validators.required]),
      meetingStartDate: new FormControl(data.meetingStartDate, [Validators.required]),
      meetingEndDate: new FormControl(data.meetingEndDate, [Validators.required]),
    });

    if (!data.id || data.id === -1) {
      this.creatingMeeting = true;
    }
  }

  onSaveMeeting() {
    if (this.meetingEditionForm.valid) {
      this.dialogRef.close(this.meetingEditionForm.value);
    } else {
      // tslint:disable-next-line: forin
      for (const i in this.meetingEditionForm.controls) {
        this.meetingEditionForm.controls[i].updateValueAndValidity();
        this.meetingEditionForm.controls[i].markAsTouched();
      }
      this.toastrService.error("NOK desc", "NOK title");
    }
  }

  close() {
    this.dialogRef.close();
  }

}
