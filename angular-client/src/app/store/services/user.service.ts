import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    public getUserMeetings(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/meetings');
    }

    public getUsers(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/list');
    }

    public getRoles(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/roles/list');
    }
}
