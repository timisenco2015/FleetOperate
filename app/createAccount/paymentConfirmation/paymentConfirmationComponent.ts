import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";

@Component({
    selector: 'paymentConfirmation',
    templateUrl: 'app/createAccount/paymentConfirmation/paymentConfirmationTemplate.html'
})

export class PaymentConfirmationComponent implements OnInit, OnChanges {

    @Input() companyId: any;

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder) {

    }

    ngOnInit() {

    }

    ngOnChanges() {

    }

    onClickGotoSignIn(){
        this.router.navigate(['login'])
    }

}