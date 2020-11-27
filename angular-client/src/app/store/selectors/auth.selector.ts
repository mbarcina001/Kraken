import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';


export const selectIsAuthenticated = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.auth,
    (auth: AuthState) => auth.isAuthenticated
);

export const selectAuthenticatedUser = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.auth,
    (auth: AuthState) => auth.authenticatedUser
);

export const selectAuthenticatedUserToken = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.auth,
    (auth: AuthState) => auth.authenticatedUser ? auth.authenticatedUser.token : null
);

export const selectAuthLoading = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.auth,
    (auth: AuthState) => auth.loading
);

export const selectAuthError = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.auth,
    (auth: AuthState) => auth.error
);
