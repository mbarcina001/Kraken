import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    public getUserMeetings(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/meetings');
    }

    public getUsers(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user');
    }

    public getRoles(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/roles');
    }

    public createUser(user: User): Observable<any> {
        return this.http.post<any>('/RESOURCE_API/user', user);
    }

    public editUser(user: User): Observable<any> {
        return this.http.put<any>('/RESOURCE_API/user', user);
    }

    public deleteUser(user: User): Observable<any> {
        // TODO: Establish param
        return this.http.delete<any>('/RESOURCE_API/user');
    }
}
