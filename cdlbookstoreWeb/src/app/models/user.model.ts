export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: number;
    public addressId: number;
    public admin: boolean;
    public totalBooks: number = 5;
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

export class UserOnlineSubscription {
    public id: number;
    public valid: boolean = false;
    public expiresAt: Date;
    public activatedAt: Date;
    public userId: number;
}

export class UserPhysicalSubscription {
    public id: number;
    public valid: boolean = false;
    public expiresAt: Date;
    public activatedAt: Date;
    public userId: number;
}
