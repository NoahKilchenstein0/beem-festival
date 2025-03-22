export class User {
    public UserName: string = "";
    public JwtToken: string = "";
    public Expiration: Date = new Date();
    public Role: string = Roles.User;
}

export enum Roles {
    Admin = "Admin",
    User = "User",
}

