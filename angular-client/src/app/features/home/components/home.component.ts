import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Meeting } from 'src/app/store/models/meeting.model';

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
        meeting => meeting.meetingStartDate.getTime() < currentTime
      );

      if (this.currentMeetings.length > 0) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex = 1;
      }
    }
  }

  @Input() loading: boolean;
  @Output() reloadMeetings: EventEmitter<void> = new EventEmitter();

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
  selectedIndex: number;

  constructor(
    private toastr: ToastrService
  ) { }

  onReloadMeetings() {
    this.reloadMeetings.emit();
  }

}
