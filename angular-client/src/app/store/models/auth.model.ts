export class Auth {
    id: number;
    email: string;
    username: string;
    token: string;
    roles: string[];

    constructor(pId: number, pEmail: string, pUsername: string, pToken: string, pRoles: string[] ) {
        this.id = pId;
        this.email = pEmail;
        this.username = pUsername;
        this.token = pToken;
        this.roles = pRoles;
    }
}
