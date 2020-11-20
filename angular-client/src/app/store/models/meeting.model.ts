import { User } from './user.model';

export class Meeting{
    id: number;
    description: string;
    meetingStartDate: Date;
    meetingEndDate: Date;
    organiser: User;
    attendantList: User[];
}
