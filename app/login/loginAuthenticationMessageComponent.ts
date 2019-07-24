import {Component, OnInit, OnChanges, Input} from '@angular/core';

@Component({
    selector: 'loginAuthMsg',
    templateUrl: 'app/login/loginAuthenticationMessageTemplate.html'
})

export class LoginAuthenticationMessageComponent implements OnInit, OnChanges {

    showLoginMessage: boolean = false;
    showAlreadyLoggedMsg: boolean = false;

    ngOnInit() {

    }

    ngOnChanges(){

    }

    displayLoginMsg(){
        this.showLoginMessage = true;
        this.showAlreadyLoggedMsg = false;
    }

    displayAlreadyLoggedMsg(){
        this.showAlreadyLoggedMsg = true;
        this.showLoginMessage = false;
    }

}