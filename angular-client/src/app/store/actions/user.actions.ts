import { createAction, props } from '@ngrx/store';
import { Role, User } from '../models/user.model';
import { ACTION_USER_CREATE_USER,
    ACTION_USER_CREATE_USER_ERROR, ACTION_USER_CREATE_USER_SUCCESS, ACTION_USER_DELETE_USER, ACTION_USER_DELETE_USER_ERROR,
    ACTION_USER_DELETE_USER_SUCCESS, ACTION_USER_EDIT_USER, ACTION_USER_EDIT_USER_ERROR, ACTION_USER_EDIT_USER_SUCCESS,
    ACTION_USER_GET_ROLES, ACTION_USER_GET_ROLES_ERROR, ACTION_USER_GET_ROLES_SUCCESS, ACTION_USER_GET_USERS, ACTION_USER_GET_USERS_ERROR,
    ACTION_USER_GET_USERS_SUCCESS } from '../store.constants';

export const getUsers = createAction(ACTION_USER_GET_USERS);
export const getUsersSuccess = createAction(ACTION_USER_GET_USERS_SUCCESS, props<{users: User[]}>());
export const getUsersError = createAction(ACTION_USER_GET_USERS_ERROR, props<{error: any}>());

export const createUser = createAction(ACTION_USER_CREATE_USER);
export const createUserSuccess = createAction(ACTION_USER_CREATE_USER_SUCCESS);
export const createUserError = createAction(ACTION_USER_CREATE_USER_ERROR);

export const editUser = createAction(ACTION_USER_EDIT_USER);
export const editUserSuccess = createAction(ACTION_USER_EDIT_USER_SUCCESS);
export const editUserError = createAction(ACTION_USER_EDIT_USER_ERROR);

export const deleteUser = createAction(ACTION_USER_DELETE_USER);
export const deleteUserSuccess = createAction(ACTION_USER_DELETE_USER_SUCCESS);
export const deleteUserError = createAction(ACTION_USER_DELETE_USER_ERROR);

export const getRoles = createAction(ACTION_USER_GET_ROLES);
export const getRolesSuccess = createAction(ACTION_USER_GET_ROLES_SUCCESS, props<{roles: Role[]}>());
export const getRolesError = createAction(ACTION_USER_GET_ROLES_ERROR, props<{error: any}>());
