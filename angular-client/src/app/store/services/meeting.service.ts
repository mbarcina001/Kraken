import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../models/meeting.model';

@Injectable()
export class MeetingService {

    constructor(private http: HttpClient) {}

    public getUserMeetings(): Observable<any> {
        return this.http.get<any>('/RESOURCE_API/meeting');
    }

    public createMeeting(pMeeting: Meeting): Observable<any> {
        return this.http.post<any>('/RESOURCE_API/meeting', pMeeting);
    }

    public editMeeting(pMeeting: Meeting): Observable<any> {
        return this.http.put<any>('/RESOURCE_API/meeting', pMeeting);
    }

    public deleteMeeting(pMeeting: Meeting): Observable<any> {
        const params = new HttpParams().set('meetingId', pMeeting.id.toString());
        return this.http.delete<any>('/RESOURCE_API/meeting', {params});
    }
}
