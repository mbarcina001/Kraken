import { createAction, props } from '@ngrx/store';
import { Auth } from '../models/auth.model';

export const auth = createAction('[Auth] auth', props<{email: string, password: string}>());
export const authSuccess = createAction('[Auth] auth success', props<{authenticatedUser: Auth}>());
