import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() getUserList = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.getUserList.emit();
  }

}
