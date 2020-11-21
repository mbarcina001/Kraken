import { SelectionModel } from '@angular/cdk/collections';
import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/store/models/user.model';
import { UserEditionModalComponent } from './user-edition-modal/user-edition-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  @Input() loading: boolean;
  @Output() reloadUsers = new EventEmitter();

  userList$: User[];
  get userList(): User[] {
    return this.userList$;
  }
  @Input() set userList(value: User[]) {
    if (value && value.length > 0) {
      this.dataSource = new MatTableDataSource(value);
      this.sortAndPaginate();
    }
  }

  dataSource: any;

  displayedColumns: string[] = ['checked', 'username', 'email', 'roles'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<User>(false, []);

  constructor(
    public dialog: MatDialog
  ) { }

  sortAndPaginate() {
    /*
    * The code needs to be inside a timeout function as angular material paginator doesn't work well inside *ngIf
    */
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getStringRoles(elementRoles) {
    return elementRoles.map(role => role.name.toLowerCase().replace('role_', '')).join(', ');
  }

  onReloadUsers() {
    this.reloadUsers.emit();
  }

  editUser() {
    console.log('edit');
    console.log(this.selection);
    const dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: { username: 'austin', email: 'austin@email.com' },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
