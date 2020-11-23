import { createAction, props } from '@ngrx/store';
import { Meeting } from '../models/meeting.model';
import { Role, User } from '../models/user.model';
import { ACTION_USER_GET_MEETINGS, ACTION_USER_GET_MEETINGS_SUCCESS, ACTION_USER_GET_ROLES, ACTION_USER_GET_ROLES_SUCCESS, ACTION_USER_GET_USERS, ACTION_USER_GET_USERS_SUCCESS } from '../store.constants';

export const getUserMeetings = createAction(ACTION_USER_GET_MEETINGS);
export const getUserMeetingsSuccess = createAction(ACTION_USER_GET_MEETINGS_SUCCESS, props<{meetings: Meeting[]}>());

export const getUsers = createAction(ACTION_USER_GET_USERS);
export const getUsersSuccess = createAction(ACTION_USER_GET_USERS_SUCCESS, props<{users: User[]}>());

export const getRoles = createAction(ACTION_USER_GET_ROLES);
export const getRolesSuccess = createAction(ACTION_USER_GET_ROLES_SUCCESS, props<{roles: Role[]}>());
