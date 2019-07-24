import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "./createAccountService";
import { Router } from "@angular/router";

@Component({
    selector: 'createAccount',
    templateUrl: 'app/createAccount/createAccountTemplate.html'
})

export class CreateAccountComponent implements OnInit, OnChanges {

    private showAdmin: boolean = true;
    private showConfirmEmail: boolean = false;
    private showSubscription: boolean = false;
    private showCompany: boolean = false;
    private showShipping: boolean = false;
    private showPayment: boolean = false;
    private showPaymentConfirmation: boolean = false;

    private adminActive: boolean = true;
    private confirmEmailActive: boolean = false;
    private subscriptionActive: boolean = false;
    private companyActive: boolean = false;
    private shippingActive: boolean = false;
    private paymentActive: boolean = false;

    public emitAdminInfoToVerify: any;
    public emitAdminInfoToSubscription: any;
    public emitSubscriptionDataToCompany: any;
    public emitCompanyDataToShipping: any;
    public emitShippingDataToPayment: any;
    public emitPaymentToPaymentConfirmation: any;

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder) {

    }

    ngOnInit() {
        
    }

    ngOnChanges() {

    }

    receiveAdminId($event) {

        this.onClickConfirmEmail();
        //console.log("receiveAdminId in CreateAccount...", $event.adminInfo)
        this.emitAdminInfoToVerify = $event.adminInfo;
    }

    adminInfoFromEmailConfirmaion($event) {

        this.onClickSubscription();
        //console.log("receiveAdminId in CreateAccount...", $event.adminInfo)
        this.emitAdminInfoToSubscription = $event.adminInfo;
    }

    dataFromSubscription($event) {

        this.onClickCompanyProfile();
        //console.log("dataFromSubscription in CreateAccount...", $event.adminInfo)
        //console.log("dataFromSubscription in CreateAccount...", $event.orderQuantities)
        this.emitSubscriptionDataToCompany = $event;
    }

    dataFromCompany($event) {

        this.onClickShipping();
        //console.log("dataFromCompany in CreateAccount...", $event.companyInfo)
        //console.log("dataFromCompany in CreateAccount...", $event.adminInfo)
        //console.log("dataFromCompany in CreateAccount...", $event)
        this.emitCompanyDataToShipping = $event;
    }

    dataFromShipping($event){
        this.onClickPayment();
        //console.log("dataFromCompany in CreateAccount...", $event)
        this.emitShippingDataToPayment = $event;
    }

    dataFromPayment($event){
        this.onClickPaymentConfirmation();
        //console.log("dataFromCompany in CreateAccount...", $event)
        this.emitPaymentToPaymentConfirmation = $event
    }

    onClickAdmin() {

        this.showAdmin = true;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;

        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;

    }

    onClickConfirmEmail() {

        this.showAdmin = false;
        this.showConfirmEmail = true;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;

        this.adminActive = false;
        this.confirmEmailActive = true;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;

    }

    onClickSubscription() {

        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = true;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;

        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = true;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = false;

    }
    onClickCompanyProfile() {

        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = true;
        this.showShipping = false;
        this.showPayment = false;
        this.showPaymentConfirmation = false;

        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = true;
        this.shippingActive = false;
        this.paymentActive = false;

    }
    onClickShipping() {

        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = true;
        this.showPayment = false;
        this.showPaymentConfirmation = false;

        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = true;
        this.paymentActive = false;

    }
    onClickPayment() {

        this.showAdmin = false;
        this.showConfirmEmail = false;
        this.showSubscription = false;
        this.showCompany = false;
        this.showShipping = false;
        this.showPayment = true;
        this.showPaymentConfirmation = false;

        this.adminActive = false;
        this.confirmEmailActive = false;
        this.subscriptionActive = false;
        this.companyActive = false;
        this.shippingActive = false;
        this.paymentActive = true;

    }

    onClickPaymentConfirmation() {
        
                this.showAdmin = false;
                this.showConfirmEmail = false;
                this.showSubscription = false;
                this.showCompany = false;
                this.showShipping = false;
                this.showPayment = false;
        
                this.adminActive = false;
                this.confirmEmailActive = false;
                this.subscriptionActive = false;
                this.companyActive = false;
                this.shippingActive = false;
                this.paymentActive = false;

                this.showPaymentConfirmation = true;
        
            }




}