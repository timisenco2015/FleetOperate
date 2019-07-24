import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";

@Component({
    selector: 'companyProfile',
    templateUrl: 'app/createAccount/companyProfile/companyProfileTemplate.html'
})

export class CompanyProfileComponent implements OnInit, OnChanges {

    @Input() subscriptionData: any;
    private companyProfileForm: FormGroup;
    private displayRequiredFieldError: boolean = false;
    @Output() sendCompanyAdminOrderInfo: EventEmitter<any> = new EventEmitter<any>();
    private showCanadaProvinces = true;
    private showUSProvinces = false;
    private disableButton: boolean = false;

    constructor(private _createAccountService: CreateAccountService,
                private router: Router,
                private _formBuilder: FormBuilder) {
        this.creatCompanyForm();
    }

    ngOnInit() {
       
    }

    ngOnChanges() {
       
    }

    creatCompanyForm(){
        this.companyProfileForm = this._formBuilder.group({
            companyName: [null, Validators.required],
            companyAddressLine1: [null, Validators.required],
            companyAddressLine2: [null],
            companyCity: [null, Validators.required],
            companyProvince: [null, Validators.required],
            companyPostalCode: [null, Validators.required],
            companyCountry: [null, Validators.required]
 
        })
    }

    onClickCountry(value){
        //console.log("onClickCountry is called..value..",value)
        if(value == "CANADA"){
            this.showCanadaProvinces = true;
            this.showUSProvinces = false;
        }else{
            this.showCanadaProvinces = false;
            this.showUSProvinces = true;
        }
        
    }

    onClickContinue(formData: any){
        //console.log("onClickContinue..company profile..", formData.value)
        this.disableButton = true;

        if(formData.status == "INVALID"){
            //console.log("onClickContinue..company profile..INVALID..", formData.status)
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
            this.disableButton = false;
        }else{
            //console.log("onClickContinue..company profile..VALID..", formData.status)
            this.displayRequiredFieldError = false;

            /*sessionStorage.setItem('cNm', JSON.stringify(formData.value.companyName));
            sessionStorage.setItem('cAd1', JSON.stringify(formData.value.companyAddressLine1));
            sessionStorage.setItem('cAd2', JSON.stringify(formData.value.companyAddressLine2));
            sessionStorage.setItem('cct', JSON.stringify(formData.value.companyCity));
            sessionStorage.setItem('cpv', JSON.stringify(formData.value.companyProvince));
            sessionStorage.setItem('cpc', JSON.stringify(formData.value.companyPostalCode));
            sessionStorage.setItem('ccy', JSON.stringify(formData.value.companyCountry));*/

            this.sendCompanyAdminOrderInfo.emit({
                companyInfo: formData.value,
                adminInfo: this.subscriptionData.adminInfo,
                orderQuantities: this.subscriptionData.orderQuantities,
                ordersList: this.subscriptionData.ordersList,
                ordersBillSummary: this.subscriptionData.ordersBillSummary,
                billCalculations: this.subscriptionData.billCalculations

            })
        }
    }


}