import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";

@Component({
    selector: 'adminEmailVerification',
    templateUrl: 'app/createAccount/adminEmailVerification/adminEmailVerificationTemplate.html'
})

export class AdminEmailVerificationComponent implements OnInit, OnChanges {

    @Input() adminInfo: any;
    private emailVerificationCodeForm: FormGroup;
    private displayRequiredFieldError: boolean = false;
    private errorMsg: any;
    private displayErrorMessage: boolean = false;
    private displayVerificationCodeResent: boolean = false;
    private disableButton: boolean = false;
    private adminEmail: string;
    @Output() transferAdminInfoToSubscription: EventEmitter<any> = new EventEmitter<any>();
    private code: number;

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder) {

        this.createEmailVerificationCodeForm();
    }

    ngOnInit() {
        
    }

    ngOnChanges() {
        this.adminEmail = this.adminInfo.adminEmailId;
    }

    createEmailVerificationCodeForm() {
        this.emailVerificationCodeForm = this._formBuilder.group({

            verificationCode: [null, Validators.required]

        })
    }

    resendVerificationCode() {

        this._createAccountService.resendEmailVerificationCode(this.adminInfo.adminId)
            .subscribe(response => {

                let jsonResponse = response.json()

                if (jsonResponse = "email sent") {
                    this.displayVerificationCodeResent = true;
                    this.displayErrorMessage = false;
                } else {
                    this.displayVerificationCodeResent = false;
                    this.errorMsg = "Failed to resend verification code, please try again."
                    this.displayErrorMessage = true;
                    window.scrollTo(0, 0);

                }
            },
            error => {
                this.errorMsg = "Connection error, please try again later.";
                this.displayErrorMessage = true;
                //console.log("createAdminProfile error: ", error.status)
            })
    }


    onClickConfirmCode(formData: any) {

        //console.log("emailVerificationCodeForm...", formData);
        this.disableButton = true;

        // confirm code
        this._createAccountService.confirmVerificationCode(formData)
        .subscribe(response => {

            let jsonResponse = response.json()
            //console.log("code verification result...",jsonResponse)
            if (jsonResponse == true) {
                this.displayVerificationCodeResent = true;
                this.displayErrorMessage = false;

                // send admin info to subscription page
                this.transferAdminInfoToSubscription.emit({adminInfo: this.adminInfo});
            } else {
                this.disableButton = false;
                this.displayVerificationCodeResent = false;
                this.errorMsg = "Entered Verification Code is not valid, please enter valid code."
                this.displayErrorMessage = true;
                window.scrollTo(0, 0);

            }
        },
        error => {
            this.disableButton = false;
            this.errorMsg = "Connection error, please try again later.";
            this.displayErrorMessage = true;
           // console.log("createAdminProfile error: ", error.status)
        })

        // check if the form is not empty
        /*if (formData.status == "INVALID") {
            console.log("VerificationCode: ", formData.value);
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        } else {
            console.log("VerificationCode: ", formData.value)
            let verificationCode = formData.value;
            console.log("emailVerificationCodeForm...verificationCode...", verificationCode);
            this.displayRequiredFieldError = false;

            // confirm code
            this._createAccountService.confirmVerificationCode(this.code)
                .subscribe(response => {

                    let jsonResponse = response.json()
                    console.log("code verification result...",jsonResponse)
                    if (jsonResponse == true) {
                        this.displayVerificationCodeResent = true;
                        this.displayErrorMessage = false;

                        // send admin info to subscription page
                        this.transferAdminInfoToSubscription.emit({adminInfo: this.adminInfo});
                    } else {
                        this.displayVerificationCodeResent = false;
                        this.errorMsg = "Entered Verification Code is not valid, please enter valid code."
                        this.displayErrorMessage = true;
                        window.scrollTo(0, 0);

                    }
                },
                error => {
                    this.errorMsg = "Connection error, please try again later.";
                    this.displayErrorMessage = true;
                    console.log("createAdminProfile error: ", error.status)
                })
        }*/

    }


}