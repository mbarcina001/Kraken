export class User {
    id: number;
    email: string;
    username: string;
    password?: string;
    roles: Role[];
}

export class Role {
    id: number;
    name: string;
}
