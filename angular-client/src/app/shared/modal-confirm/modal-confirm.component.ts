import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  doNotAskAgain = false;

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {message: string, cookie: string},
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  confirm(result: boolean) {

    if (this.doNotAskAgain) {
      this.setCookie();
    }

    this.dialogRef.close(result);
  }

  showCookieCheckbox() {
    return this.data.cookie != null && !this.cookieService.get(this.data.cookie);
  }

  setCookie() {
    this.cookieService.set(this.data.cookie, 'ok');
  }

}
