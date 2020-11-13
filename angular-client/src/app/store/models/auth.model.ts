export class Auth {
    email: string;
    username: string;
    token: string;
    roles: string[];

    constructor(pEmail: string, pUsername: string, pToken: string, pRoles: string[] ) {
        this.email = pEmail;
        this.username = pUsername;
        this.token = pToken;
        this.roles = pRoles;
    }
}