import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class APIMessagesService {
    // tslint:disable-next-line: variable-name
    // private static _instance: APIMessagesService = null;

    // public static instance(): APIMessagesService {
    //     if (APIMessagesService._instance == null) {
    //         APIMessagesService._instance = new APIMessagesService();
    // }
    //     return APIMessagesService._instance;
    // }

    constructor(private toastr: ToastrService) {

    }


    public onReturnBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        // tslint:disable-next-line: max-line-length
        this.toastr.success('Cererea a fost inregistrata. Cartea: `' + value.name + '` va fi ridicata de la adresa mentionata in urmatoarele zile.');
    }

    public onDeleteFromEBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success(' Cartea: `' + value.name + '` a fost stearsa din libraria online');
    }

    public onAddToEBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success(' Cartea: `' + value.name + '` a fost adaugata in libraria online');
    }

    public onEditUserDetailsMsg(error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Profilul dumneavoastra a fost actualizat cu succes');
    }

    public onActivateSubscriptionMsg(error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Abonamentul a fost activat cu succes');
    }

    public onInvalidQuizMsg(): void {
        this.toastr.warning('Cartea selectata nu contine un quiz. Va rugam selectati alta carte');
    }

    public onMaxLimitBooksMsg(): void {
        this.toastr.warning('Ai atins limita maxima de carti imprumutate in acelasi timp');
    }

    public onAlreadyLoanedBookMsg(): void {
        this.toastr.warning('Cartea aceasta este deja la dumneavoastra. Puteti imprumuta alta carte');
    }

    public onBorrowBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Cartea `' + value.name + '` va fi livrata in urmatoarele zile');
    }

    public onAddToWishlistMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Cartea `' + value.name + '` a fost adaugata la favorite');
    }

    public onRemoveFromWishlistMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Cartea `' + value.name + '` a fost stearsa de la favorite');
    }
}
