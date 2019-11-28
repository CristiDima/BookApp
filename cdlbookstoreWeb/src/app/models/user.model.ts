import { UserAccount } from './userAccount.model';
import { UserAddress } from './userAddress.model';

export class User {
    private firstName: number = null;
    private lastName: number = null;
    private idCNP: number = null;
    private email: string = null;
    private phoneNumber: number = null;
    private userAccount: UserAccount = null;
    private userAddress: UserAddress = null
    private booksPerMount: number = 0;
}