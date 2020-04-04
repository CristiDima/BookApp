export class User {
    public firstName: number = null;
    public lastName: number = null;
    public id: number = null;
    public email: string = null;
    public phoneNumber: number = null;
    public userBankAccount: UserBankAccount = null;
    public userAddress: UserAddress = null
    public booksPerMount: number = 0;
}

export class UserBankAccount {
    public accountNumber: number = null;
    public cvs: number = null;
    public expirationDate: Date = null;
}

export class UserAddress {
    public street: string = null;
    public number: number = null;
    public city: string = null;
    public district: string = null;
}
export class UserLoginDetails {
    public username: string = '';
    public password: string = ''; 
}
