import { SelectionModel } from '@angular/cdk/collections';
import { Component, Output, EventEmitter, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role, User } from 'src/app/store/models/user.model';
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

  roleList$: Role[];
  get roleList(): Role[] {
    return this.roleList$;
  }
  @Input() set roleList(value: Role[]) {
    if (value && value.length > 0) {
      value.forEach(role => {
        this.roles.push({
          ...role,
          name: this.getRoleName(role)
        });
      });
    }
  }

  dataSource: MatTableDataSource<User>;
  roles: Role[] = [];

  displayedColumns: string[] = ['checked', 'username', 'email', 'roles'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<User>(false, []);

  constructor(
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef
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

  getRoleName(role: Role) {
    return role.name.toLowerCase().replace('role_', '');
  }

  onReloadUsers() {
    this.reloadUsers.emit();
  }

  editUser() {
    const dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        username: this.selection.selected[0].username,
        email: this.selection.selected[0].email,
        roles: this.selection.selected[0].roles,
        allRoles: this.roles
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  selectRow(row: any) {
    this.selection.toggle(row);
  }

}
