export class User {
    public userName: string = "";
    public jwtToken: string = "";
    public role: Roles = 2;
}

export enum Roles {
    Admin = 1,
    User = 2,
}

