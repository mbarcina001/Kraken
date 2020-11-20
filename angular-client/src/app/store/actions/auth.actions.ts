import { createAction, props } from '@ngrx/store';
import { Auth } from '../models/auth.model';

export const auth = createAction('[Auth] login', props<{email: string, password: string}>());
export const authSuccess = createAction('[Auth] login success', props<{authenticatedUser: Auth}>());
