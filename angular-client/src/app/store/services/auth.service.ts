import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    public auth(email: string, pass: string): Observable<any> {

        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', pass);
        params.append('grant_type', 'password');

        const headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic ' + btoa('krakenapp:krakensecret')
            });

        return this.http.post<any>('/oauth/token', params.toString(), {headers});
    }
}
