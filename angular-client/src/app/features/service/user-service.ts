import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        // return this.http.get<any>('http://localhost:8080/api/users/');
        // return this.http.get<any>('http://localhost:8080/');
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Bearer ' + 'd07505a5-f509-49e4-acf8-494a304c6bd4'
        });
        return this.http.get<any>('http://localhost:8080/greeting', { headers });
    }
}