export class AuthRequest {
    email: string;
    password: string;

    constructor(pEmail: string, pPassword: string ) {
        this.email = pEmail;
        this.password = pPassword;
    }
}
