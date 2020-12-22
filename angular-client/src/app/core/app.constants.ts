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

/**
 * Field error constants
 */
export const FIELD_ERROR_MESSAGES = {
    required: () => 'Field is required',
    maxlength: (params) => 'Field allows ' + params.requiredLength + ' characters maximum',
    minlength: (params) => 'Field allows ' + params.requiredLength + ' characters minimum',
    email: () => 'Valid email is required: ex@abc.xyz',
    confirmPassword: () => 'Passwords must match'
};
