import { createSelector } from '@ngrx/store';


export const selectIsAuthenticated = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["auth"],
    (auth) => auth.isAuthenticated
);

export const selectAuthenticatedUser = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["auth"],
    (auth) => auth.authenticatedUser
);

export const selectAuthenticatedUserToken = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["auth"],
    (auth) => auth.authenticatedUser ? auth.authenticatedUser.token : null
);
