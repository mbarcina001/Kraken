import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserMeetings = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.user,
    (user: UserState) => user.meetings
);

export const selectUsers = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.user,
    (user: UserState) => user.users
);

export const selectRoles = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.user,
    (user: UserState) => user.roles
);

export const selectUserLoading = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.user,
    (user: UserState) => user.loading
);

export const selectUserError = createSelector(
    // tslint:disable-next-line: no-string-literal
    (state: any) => state.user,
    (user: UserState) => user.error
);
