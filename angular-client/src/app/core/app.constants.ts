/**
 * Module Routes
 */
export const LOGIN_ROUTE = 'login';
export const ADMIN_ROUTE = 'admin';
export const HOME_ROUTE = 'home';
export const NO_PERMISSIONS_ROUTE = 'no-permissions';

/**
 * Templates
 */
export const LOGIN_TEMPLATE = 'loginTmpl';
export const REGISTER_TEMPLATE = 'registerTmpl';

/**
 * Roles
 */
export const ADMIN_ROLE = 'ROLE_ADMIN';
export const USER_ROLE = 'ROLE_USER';

/**
 * Toast messages
 */
export const SUCCESS_TITLE = 'SUCCESS';
export const ERROR_TITLE = 'ERROR';
export const LOGIN_ERROR_TITLE = 'Login error';
export const UNEXPECTED_ERROR = 'Unexpected error happenned';
export const WRONG_CREDENTIALS_ERROR = 'Wrong credentials';
export const ACCESS_DENIED_ERROR = 'Access denied';

/**
 * Field error constants
 */
export const FIELD_ERROR_MESSAGES = {
    required: () => 'Field is required',
    maxlength: (params) => 'Field allows ' + params.requiredLength + ' characters maximum',
    minlength: (params) => 'Field allows ' + params.requiredLength + ' characters minimum',
    email: () => 'Valid email is required: ex@abc.xyz',
    confirmPassword: () => 'Passwords must match',
    matDatetimePickerParse: () => 'Field must be a date',
    attendants: () => '2 attendants minimum'
};


/**
 * Cookies
 */
export const ATTENDANT_DELETE_CONFIRM_COOKIE = 'attendantDeleteConfirm';

/**
 * Actions (Not store)
 */
export const ACTION_CREATE = 'create';
export const ACTION_EDIT = 'edit';
