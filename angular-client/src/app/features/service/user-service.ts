import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    getUserList() {
        return this.http.get<any>('http://localhost:8080/');
    }
}