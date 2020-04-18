export class User {
    public id: number;
    public firstName: number;
    public lastName: number;
    public email: string;
    public phoneNumber: number;
    public addressId: number;
    public admin: boolean;
    public booksPerMount: number = 5;
}

export class UserAddress {
    public id: number;
    public address: string;
    public city: string;
    public district: string;
}
export class UserCredentials {
    public username: string;
    public password: string; 
}

export class UserSession {
    public token: string;
    public userId: number;
}
