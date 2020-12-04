import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-edition-modal',
  templateUrl: './meeting-edition-modal.component.html',
  styleUrls: ['./meeting-edition-modal.component.scss']
})
export class MeetingEditionModalComponent {

  public meetingEditionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MeetingEditionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {id: number, userId: string, description: string, startDate: Date, endDate: Date},
    private formBuilder: FormBuilder,
  ) {
    this.meetingEditionForm = this.formBuilder.group({
      id: data.id,
      organiser: data.userId,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  }

  onEditUser() {
    this.dialogRef.close(this.meetingEditionForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
