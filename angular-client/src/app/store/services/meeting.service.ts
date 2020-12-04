import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../models/meeting.model';

@Injectable()
export class MeetingService {

    constructor(private http: HttpClient) {}

    public getUserMeetings(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/user/meetings');
    }

    public createMeeting(meeting: Meeting): Observable<any> {
        return this.http.post<any>('/RESOURCE_API/user/meetings', meeting);
    }

    public editMeeting(meeting: Meeting): Observable<any> {
        return this.http.put<any>('/RESOURCE_API/user/meetings', meeting);
    }

    public deleteMeeting(meetingId: number): Observable<any> {
        // TODO: Establish param
        return this.http.delete<any>('/RESOURCE_API/user/meetings');
    }
}