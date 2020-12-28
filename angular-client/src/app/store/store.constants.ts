/* Response codes */
export const RESPONSE_CODE_OK = 1;
export const RESPONSE_CODE_NOK = -1;

/* Meeting actions */
export const ACTION_MEETING_GET_MEETINGS = '[Meeting] get meetings';
export const ACTION_MEETING_GET_MEETINGS_SUCCESS = '[Meeting] get meetings success';
export const ACTION_MEETING_GET_MEETINGS_ERROR = '[Meeting] get meetings error';

export const ACTION_MEETING_CREATE_MEETING = '[Meeting] create meeting';
export const ACTION_MEETING_CREATE_MEETING_SUCCESS = '[Meeting] create meeting success';
export const ACTION_MEETING_CREATE_MEETING_ERROR = '[Meeting] create meeting error';

export const ACTION_MEETING_EDIT_MEETING = '[Meeting] edit meeting';
export const ACTION_MEETING_EDIT_MEETING_SUCCESS = '[Meeting] edit meeting success';
export const ACTION_MEETING_EDIT_MEETING_ERROR = '[Meeting] edit meeting error';

export const ACTION_MEETING_DELETE_MEETING = '[Meeting] delete meeting';
export const ACTION_MEETING_DELETE_MEETING_SUCCESS = '[Meeting] delete meeting success';
export const ACTION_MEETING_DELETE_MEETING_ERROR = '[Meeting] delete meeting error';


/* Auth actions */
export const ACTION_USER_GET_USERS = '[User] get users';
export const ACTION_USER_GET_USERS_SUCCESS = '[User] get users success';
export const ACTION_USER_GET_USERS_ERROR = '[User] get users error';

export const ACTION_USER_GET_ATTENDANTS = '[User] get attendants';
export const ACTION_USER_GET_ATTENDANTS_SUCCESS = '[User] get attendants success';
export const ACTION_USER_GET_ATTENDANTS_ERROR = '[User] get attendants error';

export const ACTION_USER_CREATE_USER = '[User] create user';
export const ACTION_USER_CREATE_USER_SUCCESS = '[User] create user success';
export const ACTION_USER_CREATE_USER_ERROR = '[User] create user error';

export const ACTION_USER_EDIT_USER = '[User] edit user';
export const ACTION_USER_EDIT_USER_SUCCESS = '[User] edit user success';
export const ACTION_USER_EDIT_USER_SUCCESS_FORCE_LOGOUT = '[User] edit user success force logout';
export const ACTION_USER_EDIT_USER_ERROR = '[User] edit user error';

export const ACTION_USER_DELETE_USER = '[User] delete user';
export const ACTION_USER_DELETE_USER_SUCCESS = '[User] delete user success';
export const ACTION_USER_DELETE_USER_SUCCESS_FORCE_LOGOUT = '[User] delete user success force logout';
export const ACTION_USER_DELETE_USER_ERROR = '[User] delete user error';

export const ACTION_USER_GET_ROLES = '[User] get roles';
export const ACTION_USER_GET_ROLES_SUCCESS = '[User] get roles success';
export const ACTION_USER_GET_ROLES_ERROR = '[User] get roles error';


/* Auth actions */
export const ACTION_AUTH_LOGIN = '[Auth] login';
export const ACTION_AUTH_LOGIN_SUCCESS = '[Auth] login success';
export const ACTION_AUTH_LOGIN_ERROR = '[Auth] login error';

export const ACTION_AUTH_REGISTER = '[Auth] register';
export const ACTION_AUTH_REGISTER_SUCCESS = '[Auth] register success';
export const ACTION_AUTH_REGISTER_ERROR = '[Auth] register error';

export const ACTION_AUTH_LOGOUT = '[Auth] logout';
export const ACTION_AUTH_LOGOUT_SUCCESS = '[Auth] logout success';
