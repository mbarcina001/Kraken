  
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    public auth(email: string, pass: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type',  'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa('krakenapp:krakensecret'));

        const params = new HttpParams()
            .set('username', email)
            .set('password', pass)
            .set('grant_type', 'password');

        return this.http.post<any>('localhost:9191/oauth/token', {}, {headers, params});
    }
}