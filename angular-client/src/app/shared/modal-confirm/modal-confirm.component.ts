import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {message: string},
  ) { }

  ngOnInit(): void {
  }

  confirm(result: boolean) {
    this.dialogRef.close(result);
  }

}
