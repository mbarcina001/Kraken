import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-meeting-table',
  templateUrl: './meeting-table.component.html',
  styleUrls: ['./meeting-table.component.scss']
})
export class MeetingTableComponent implements OnInit, AfterViewInit {


  data$: any[];
  get data(): any[] {
    return this.data$;
  }
  @Input() set data(value: any[]) {
    if (value) {
      this.dataSource = new MatTableDataSource(value);
    }
  }

  dataSource: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
