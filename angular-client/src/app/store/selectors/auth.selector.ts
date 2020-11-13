import { createSelector } from '@ngrx/store';


export const isAuthenticated = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["auth"],
    (auth) => auth.isAuthenticated
);

export const getAuthenticatedUser = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["auth"],
    (auth) => auth.authenticatedUser
);
