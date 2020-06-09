import { createSelector } from '@ngrx/store';


export const isAuthenticated = createSelector(
    state => state["auth"],
    (auth) => auth.isAuthenticated
)