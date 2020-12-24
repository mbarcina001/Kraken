import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ACTION_CREATE, ACTION_EDIT } from 'src/app/core/app.constants';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { Meeting } from 'src/app/store/models/meeting.model';
import { User } from 'src/app/store/models/user.model';
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

  @Input() authedUser: User;
  @Input() userList: User[];
  @Input() userListLoading: boolean;
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
    console.log(this.lastCreatedEditedMeeting);
    if (value && this.lastCreatedEditedMeeting) {
      this.reOpenMeetingModal(this.lastCreatedEditedMeeting);
    }
  }

  currentMeetings: Meeting[];
  nextMeetings: Meeting[];
  pastMeetings: Meeting[];

  selectedTabIndex: number;

  private dialogRef: MatDialogRef<MeetingEditionModalComponent>;
  private lastCreatedEditedMeeting: Meeting;
  private lastAction: string;

  constructor(
    public dialog: MatDialog
  ) { }

  onReloadMeetings() {
    this.reloadMeetings.emit();
  }

  onCreateMeeting(): void {
    this.dialogRef = this.dialog.open(MeetingEditionModalComponent, {
      data: {
        id: -1,
        attendantList: [],
        userList: this.userList,
        disabled: false,
        organiser: this.authedUser
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lastCreatedEditedMeeting = result;
        this.lastAction = ACTION_CREATE;
        this.createMeeting.emit(result);
      }
    });
  }

  onViewMeeting(pMeeting: Meeting): void {
    this.onEditMeeting(pMeeting, true);
  }

  onEditMeeting(pMeeting: Meeting, disabled?: boolean): void {
    this.dialogRef = this.dialog.open(MeetingEditionModalComponent, {
      data: {
        id: pMeeting.id,
        description: pMeeting.description,
        meetingStartDate: pMeeting.meetingStartDate,
        meetingEndDate: pMeeting.meetingEndDate,
        attendantList: pMeeting.attendantList,
        userList: this.userList,
        disabled: disabled ? disabled : false,
        organiser: pMeeting.organiser
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lastCreatedEditedMeeting = result;
        this.lastAction = ACTION_EDIT;
        this.editMeeting.emit(result);
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

  reOpenMeetingModal(pMeeting: Meeting) {
    this.dialogRef = this.dialog.open(MeetingEditionModalComponent, {
      data: {
        id: pMeeting.id,
        description: pMeeting.description,
        meetingStartDate: pMeeting.meetingStartDate,
        meetingEndDate: pMeeting.meetingEndDate,
        attendantList: pMeeting.attendantList,
        userList: this.userList,
        disabled: false,
        organiser: pMeeting.organiser
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.lastAction === ACTION_CREATE) {
          this.createMeeting.emit(result);
        } else {
          this.editMeeting.emit(result);
        }
      }
    });
  }
}
