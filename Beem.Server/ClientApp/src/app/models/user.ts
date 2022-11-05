export class User {
    public userName: string = "";
    public jwtToken: string = "";
    public expiration: Date = new Date();
    public role: string = Roles.User;
}

export enum Roles {
    Admin = "Admin",
    User = "User",
}

