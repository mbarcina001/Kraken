import { SelectionModel } from '@angular/cdk/collections';
import { Component, Output, EventEmitter, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ACTION_CREATE, ACTION_EDIT } from 'src/app/core/app.constants';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { Role, User } from 'src/app/store/models/user.model';
import { UserEditionModalComponent } from './user-edition-modal/user-edition-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  @Input() authedUser: User;
  @Input() roleList: Role[];
  @Input() loading: boolean;
  @Output() reloadUsers = new EventEmitter();
  @Output() createUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<any>();

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

  displayedColumns: string[] = ['username', 'email', 'roles', 'actions'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  selection = new SelectionModel<User>(false, []);

  private dialogRef: MatDialogRef<UserEditionModalComponent>;
  private lastCreatedEditedUser: User;
  private lastAction: string;

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
        this.lastAction = ACTION_CREATE;
        delete result.confirmPassword;
        this.createUser.emit(result);
      }
    });
  }

  onEditUser(selectedUser: User) {
    this.dialogRef = this.dialog.open(UserEditionModalComponent, {
      data: {
        id: selectedUser.id,
        username: selectedUser.username,
        email: selectedUser.email,
        roles: selectedUser.roles,
        allRoles: this.roleList
      },
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lastCreatedEditedUser = result;
        this.lastAction = ACTION_EDIT;
        this.editUser.emit({
          user: result,
          forceLogout: result.id === this.authedUser.id
        });
      }
    });
  }

  onDeleteUser(selectedUser: User) {
    const confirmDialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        message: 'Are you sure you want to delete user ' + selectedUser.username + '?'
      }
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser.emit({
          user: selectedUser,
          forceLogout: selectedUser.id === this.authedUser.id
        });
        this.selection = new SelectionModel<User>(false, []);
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
        if (this.lastAction === ACTION_CREATE) {
          this.editUser.emit(result);
        } else {
          this.editUser.emit(result);
        }
      }
    });
  }

}
