import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/model/user';
import { UserService } from 'src/app/features/service/user-service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
  }

  getUserList() {
    this.userService.getUserList().subscribe(
      (data) => console.log(data)
    )
  }

}
