export class User {
    public id: number;
    public firstName: number;
    public lastName: number;
    public email: string;
    // public phoneNumber: number;
    // public userBankAccount: UserBankAccount = null;
    public addressId: number;
    public admin: boolean;
    // public booksPerMount: number = 0;
}

// export class UserBankAccount {
//     public accountNumber: number = null;
//     public cvs: number = null;
//     public expirationDate: Date = null;
// }

export class UserAddress {
    public id: number = null;
    public address: string = null;
    public city: string = null;
    public district: string = null;
}
export class UserLoginDetails {
    public username: string = '';
    public password: string = ''; 
}
