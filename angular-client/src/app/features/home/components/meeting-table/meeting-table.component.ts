import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Meeting } from 'src/app/store/models/meeting.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-meeting-table',
  templateUrl: './meeting-table.component.html',
  styleUrls: ['./meeting-table.component.scss']
})
export class MeetingTableComponent {

  data$: Meeting[];
  get data(): Meeting[] {
    return this.data$;
  }
  @Input() set data(value: Meeting[]) {
    if (value && value.length > 0) {
      this.dataSource = new MatTableDataSource(value);
      this.sortAndPaginate();
    }
  }

  @Output() viewMeeting = new EventEmitter<Meeting>();
  @Output() editMeeting = new EventEmitter<Meeting>();
  @Output() deleteMeeting = new EventEmitter<Meeting>();

  dataSource: any;
  displayedColumns: string[] = ['description', 'organiser', 'startDate', 'endDate', 'actions'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<Meeting>(false, []);

  constructor() { }

  sortAndPaginate() {
    /*
    * The code needs to be inside a timeout function as angular material paginator doesn't work well inside *ngIf
    */
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onViewMeeting(pSelectedMeeting: Meeting) {
    this.viewMeeting.emit(pSelectedMeeting);
  }

  onEditMeeting(pSelectedMeeting: Meeting) {
    this.editMeeting.emit(pSelectedMeeting);
  }

  onDeleteMeeting(pSelectedMeeting: Meeting) {
    this.deleteMeeting.emit(pSelectedMeeting);
  }

}
