import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

import { of } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    getUserList() {
		/*return of([
			{username: 'test', password: 'test', email: 'test'}
		])*/
        return this.http.get<any>('http://localhost:8080/api/users');
    }
}