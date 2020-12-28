import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    public getUserMeetings(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/meetings');
    }

    public getUsers(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/attendants');
    }

    public getRoles(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/roles');
    }

    public createUser(pUser: User): Observable<any> {
        return this.http.post<any>('/RESOURCE_API/user', pUser);
    }

    public editUser(pUser: User): Observable<any> {
        return this.http.put<any>('/RESOURCE_API/user', pUser);
    }

    public deleteUser(pUser: User): Observable<any> {
        const params = new HttpParams().set('userId', pUser.id.toString());
        return this.http.delete<any>('/RESOURCE_API/user', {params});
    }
}
