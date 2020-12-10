import { SelectionModel } from '@angular/cdk/collections';
import { Component, Output, EventEmitter, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
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
  @Output() deleteUser = new EventEmitter<User>();

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
    if (value && this.lastCreatedEditedUser) {
      this.reOpenUserModal(this.lastCreatedEditedUser);
    }
  }

  dataSource: MatTableDataSource<User>;

  displayedColumns: string[] = ['checked', 'username', 'email', 'roles'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<User>(false, []);

  private dialogRef: MatDialogRef<UserEditionModalComponent>;
  private lastCreatedEditedUser: User;

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

  getStringRoles(pElementRoles) {
    return pElementRoles.map(role => role.name.toLowerCase().replace('role_', '')).join(', ');
  }

  getRoleName(pRole: Role) {
    return pRole.name.toLowerCase().replace('role_', '');
  }

  onReloadUsers() {
    this.reloadUsers.emit();
  }

  onCreateUser() {
    this.dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        id: -1,
        username: '',
        email: '',
        roles: [],
        allRoles: this.roleList
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lastCreatedEditedUser = result;
        delete result.confirmPassword;
        this.createUser.emit(result);
      }
    });
  }

  onEditUser() {
    this.dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        id: this.selection.selected[0].id,
        username: this.selection.selected[0].username,
        email: this.selection.selected[0].email,
        roles: this.selection.selected[0].roles,
        allRoles: this.roleList
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lastCreatedEditedUser = result;
        this.editUser.emit(result);
      }
    });
  }

  onDeleteUser() {
    const confirmDialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: 'Are you sure you want to delete user ' + this.selection.selected[0].username
      }
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser.emit(this.selection.selected[0]);
      }
    });
  }

  reOpenUserModal(pUser: User) {
    this.dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        id: pUser.id,
        username: pUser.username,
        email: pUser.email,
        password: pUser.password,
        roles: pUser.roles,
        allRoles: this.roleList
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editUser.emit(result);
      }
    });
  }

  selectRow(pRow: any) {
    this.selection.toggle(pRow);
  }

}
