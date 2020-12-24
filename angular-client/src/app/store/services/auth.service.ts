import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    public auth(pEmail: string, pPass: string): Observable<any> {

        const params = new URLSearchParams();
        params.append('username', pEmail);
        params.append('password', pPass);
        params.append('grant_type', 'password');

        const headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic ' + btoa('krakenapp:krakensecret')
            });

        return this.http.post<any>('/AUTH_API/oauth/token', params.toString(), {headers});
    }

    public register(pRegisterRequest: User) {
        const params = new URLSearchParams();
        params.append('username', pRegisterRequest.username);
        params.append('password', pRegisterRequest.password);
        params.append('email', pRegisterRequest.email);

        const headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic ' + btoa('krakenapp:krakensecret')
            });

        return this.http.post<any>('/AUTH_API/register', params.toString(), {headers});
    }
}
