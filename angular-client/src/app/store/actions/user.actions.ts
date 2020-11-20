import { createAction, props } from '@ngrx/store';
import { Meeting } from '../models/meeting.model';
import { User } from '../models/user.model';

export const getUserMeetings = createAction('[User] get meetings');
export const getUserMeetingsSuccess = createAction('[User] get meetings success', props<{meetings: Meeting[]}>());

export const getUsers = createAction('[User] get users');
export const getUsersSuccess = createAction('[User] get users success', props<{users: User[]}>());
