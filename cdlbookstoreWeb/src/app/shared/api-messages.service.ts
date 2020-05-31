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

    public onLoginFailedMsg(): void {
        this.toastr.error('A aparut o eroare in timpul procesului. Emailul sau parola sunt incorecte');
    }

    public onLogoutMsg(value?: boolean, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        if (value) {
            this.toastr.warning('A expirat sesiunea');
        }
    }

    public onResetPassMsg(error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Un email de resetare a fost trimis catre dumneavoastra');
    }

    public onChangePassMsg(error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('Parola dumneavoastra a fost schimbata');
    }

    public onCreateQuizMessages(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost adaugat un quiz pentru cartea: `' + value.name + '`');
    }

    public onAddQuestionMsg(value: any): void {
        this.toastr.warning('A fost adaugat un intrebare pentru cartea: `' + value.name + '`. Pentru a salva quiz-ul apasati `Salveaza`');
    }

    public onUpdateQuizMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost actualizat o intrebare pentru cartea: `' + value.name + '`');
    }

    public onDeleteQuizMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost stearsa o intrebare pentru cartea: `' + value.name + '`');
    }

    public onAddAuthorMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost adaugat autorul: `' + value.name + '`');
    }

    public onExistAuthorMsg(): void {
        this.toastr.warning('Acest autor nu poate fi sters deoarece este alocat unei carti');
    }

    public onDeleteAuthorMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost sters autorul: `' + value.name + '`');
    }

    public onUpdateAuthorMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost actualizat autorul: `' + value.name + '`');
    }

    public onAddGenreMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost adaugat genul: `' + value.name + '`');
    }

    public onExistGenreMsg(): void {
        this.toastr.warning('Acest gen nu poate fi sters deoarece este alocat unei carti');
    }

    public onDeleteGenreMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost sters genul: `' + value.name + '`');
    }

    public onUpdateGenreMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost actualizat genul: `' + value.name + '`');
    }

    public onAddBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost adaugata cartea: `' + value.name + '`');
    }

    public onDeleteBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost stearsa cartea: `' + value.name + '`');
    }

    public onUpdateBookMsg(value: any, error?: any): void {
        if (error) {
            this.toastr.error('A aparut o eroare in timpul procesului. Actiunea nu a fost finalizata');
            return;
        }
        this.toastr.success('A fost actualizata cartea: `' + value.name + '`');
    }

}
