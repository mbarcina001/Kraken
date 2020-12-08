import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    public data: {id: number, description: string, startDate: Date, endDate: Date},
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.meetingEditionForm = this.formBuilder.group({
      id: new FormControl(data.id),
      description: new FormControl(data.description, [Validators.required]),
      startDate: new FormControl(data.startDate, [Validators.required]),
      endDate: new FormControl(data.endDate, [Validators.required]),
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
