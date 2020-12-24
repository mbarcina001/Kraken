import { Role } from './user.model';

export class Auth {
    id: number;
    email: string;
    username: string;
    token: string;
    roles: Role[];

    constructor(pId: number, pEmail: string, pUsername: string, pToken: string, pRoles: Role[] ) {
        this.id = pId;
        this.email = pEmail;
        this.username = pUsername;
        this.token = pToken;
        this.roles = pRoles;
    }
}
