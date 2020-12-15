import { createAction, props } from '@ngrx/store';
import { Role, User } from '../models/user.model';
import { ACTION_USER_CREATE_USER,
    ACTION_USER_CREATE_USER_ERROR, ACTION_USER_CREATE_USER_SUCCESS, ACTION_USER_DELETE_USER, ACTION_USER_DELETE_USER_ERROR,
    ACTION_USER_DELETE_USER_SUCCESS, ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT, ACTION_USER_EDIT_USER, ACTION_USER_EDIT_USER_ERROR,
    ACTION_USER_EDIT_USER_SUCCESS, ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT, ACTION_USER_GET_ROLES, ACTION_USER_GET_ROLES_ERROR,
    ACTION_USER_GET_ROLES_SUCCESS, ACTION_USER_GET_USERS, ACTION_USER_GET_USERS_ERROR, ACTION_USER_GET_USERS_SUCCESS
} from '../store.constants';

export const getUsers = createAction(ACTION_USER_GET_USERS);
export const getUsersSuccess = createAction(ACTION_USER_GET_USERS_SUCCESS, props<{users: User[]}>());
export const getUsersError = createAction(ACTION_USER_GET_USERS_ERROR, props<{error: any}>());

export const createUser = createAction(ACTION_USER_CREATE_USER, props<{user: User}>());
export const createUserSuccess = createAction(ACTION_USER_CREATE_USER_SUCCESS, props<{users: User[]}>());
export const createUserError = createAction(ACTION_USER_CREATE_USER_ERROR, props<{error: any}>());

export const editUser = createAction(ACTION_USER_EDIT_USER, props<{user: User, forceLogout: boolean}>());
export const editUserSuccess = createAction(ACTION_USER_EDIT_USER_SUCCESS, props<{users: User[]}>());
export const editUserSuccessForceLogout = createAction(ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT, props<{users: User[]}>());
export const editUserError = createAction(ACTION_USER_EDIT_USER_ERROR, props<{error: any}>());

export const deleteUser = createAction(ACTION_USER_DELETE_USER, props<{user: User, forceLogout: boolean}>());
export const deleteUserSuccess = createAction(ACTION_USER_DELETE_USER_SUCCESS, props<{users: User[]}>());
export const deleteUserSuccessForceLogout = createAction(ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT, props<{users: User[]}>());
export const deleteUserError = createAction(ACTION_USER_DELETE_USER_ERROR, props<{error: any}>());

export const getRoles = createAction(ACTION_USER_GET_ROLES);
export const getRolesSuccess = createAction(ACTION_USER_GET_ROLES_SUCCESS, props<{roles: Role[]}>());
export const getRolesError = createAction(ACTION_USER_GET_ROLES_ERROR, props<{error: any}>());
