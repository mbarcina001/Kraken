import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { Meeting } from 'src/app/store/models/meeting.model';
import { MeetingEditionModalComponent } from './meeting-edition-modal/meeting-edition-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userMeetings$: Meeting[];
  get userMeetings(): Meeting[] {
    return this.userMeetings$;
  }
  @Input() set userMeetings(value: Meeting[]) {
    if (value && value.length > 0) {
      const currentTime = new Date().getTime();

      this.currentMeetings = value.filter(
        meeting => meeting.meetingStartDate.getTime() <= currentTime && meeting.meetingEndDate.getTime() >= currentTime
      );
      this.nextMeetings = value.filter(
        meeting => meeting.meetingStartDate.getTime() > currentTime
      );
      this.pastMeetings = value.filter(
        meeting => meeting.meetingEndDate.getTime() < currentTime
      );

      if (this.currentMeetings.length > 0) {
        this.selectedTabIndex = 0;
      } else {
        this.selectedTabIndex = 1;
      }
    }
  }

  @Input() loading: boolean;
  @Output() reloadMeetings: EventEmitter<void> = new EventEmitter();
  @Output() createMeeting: EventEmitter<Meeting> = new EventEmitter();
  @Output() editMeeting: EventEmitter<Meeting> = new EventEmitter();
  @Output() deleteMeeting: EventEmitter<Meeting> = new EventEmitter();

  error$: any;
  get error(): any {
    return this.error$;
  }
  @Input() set error(value: any) {
    if (value) {
      const message = value.error && value.error.error_description ? value.error.error_description : value.message;
      this.toastr.error(message, 'An error happened');
    }
  }

  currentMeetings: Meeting[];
  nextMeetings: Meeting[];
  pastMeetings: Meeting[];

  selectedTabIndex: number;

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  onReloadMeetings() {
    this.reloadMeetings.emit();
  }

  onCreateMeeting(): void {
    const dialogRef = this.dialog.open(MeetingEditionModalComponent, {
      data: {
        id: -1
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createMeeting.emit(result);
      }
    });
  }

  viewMeeting(pMeeting: Meeting): void {
    // TODO
  }

  onEditMeeting(pMeeting: Meeting): void {
    const dialogRef = this.dialog.open(MeetingEditionModalComponent, {
      data: {
        id: pMeeting.id,
        description: pMeeting.description,
        meetingStartDate: pMeeting.meetingStartDate,
        meetingEndDate: pMeeting.meetingEndDate,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editMeeting.emit(pMeeting);
      }
    });
  }

  onDeleteMeeting(pMeeting: Meeting): void {
    const confirmDialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: 'Are you sure you want to delete meeting ' + pMeeting.description + '?'
      }
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMeeting.emit(pMeeting);
      }
    });
  }
}
