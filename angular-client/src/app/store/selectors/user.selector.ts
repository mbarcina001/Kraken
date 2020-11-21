import { createSelector } from '@ngrx/store';

export const selectUserMeetings = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["user"],
    (user) => user.meetings
);

export const selectUsers = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["user"],
    (user) => user.users
);

export const selectRoles = createSelector(
    // tslint:disable-next-line: no-string-literal
    state => state["user"],
    (user) => user.roles
);
