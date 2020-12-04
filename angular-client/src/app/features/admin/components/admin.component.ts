import { SelectionModel } from '@angular/cdk/collections';
import { Component, Output, EventEmitter, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Role, User } from 'src/app/store/models/user.model';
import { UserEditionModalComponent } from './user-edition-modal/user-edition-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  @Input() roleList: Role[];
  @Input() loading: boolean;
  @Output() reloadUsers = new EventEmitter();
  @Output() createUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

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

  dataSource: MatTableDataSource<User>;

  displayedColumns: string[] = ['checked', 'username', 'email', 'roles'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<User>(false, []);

  constructor(
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    private toastr: ToastrService
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

  onCreateUser() {
    const dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        id: '',
        username: '',
        email: '',
        roles: [],
        allRoles: this.roleList
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createUser.emit(result);
      }
    });
  }

  onEditUser() {
    const dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        id: this.selection.selected[0].id,
        username: this.selection.selected[0].username,
        email: this.selection.selected[0].email,
        roles: this.selection.selected[0].roles,
        allRoles: this.roleList
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editUser.emit(result);
      }
    });
  }

  onDeleteUser() {
    // TODO
  }

  selectRow(row: any) {
    this.selection.toggle(row);
  }

}
