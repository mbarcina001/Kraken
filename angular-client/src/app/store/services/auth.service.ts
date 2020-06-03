  
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    public auth(email: string, pass: string): Observable<any> {

        // Option 1
        const headers = new HttpHeaders()
            .set('Content-Type',  'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa('krakenapp:krakensecret'));

        const params = new HttpParams()
            .set('username', email)
            .set('password', pass)
            .set('grant_type', 'password');

        return this.http.post<any>('localhost:9191/oauth/token', {}, {headers, params});


        // Option 2
        /*const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', pass);
        params.append('grant_type', 'password');
        params.append('client_id', 'krakenapp');

        const headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic ' + btoa('krakenapp:krakensecret')
            });

        return this.http.post<any>('localhost:9191/oauth/token', params.toString(), {headers});*/
    }
}