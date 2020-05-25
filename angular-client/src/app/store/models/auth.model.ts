export interface AuthResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

export class Auth {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;

    constructor(pAccessToken: string, pTokenType: string, pRefreshToken: string, pExpiresIn: number, pScope: string ) {
        this.accessToken = pAccessToken;
        this.tokenType = pTokenType;
        this.refreshToken = pRefreshToken;
        this.expiresIn = pExpiresIn;
        this.scope = pScope;
    }
}