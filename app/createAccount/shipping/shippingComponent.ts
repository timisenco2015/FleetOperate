import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";

@Component({
    selector: 'shipping',
    templateUrl: 'app/createAccount/shipping/shippingTemplate.html'
})

export class ShippingComponent implements OnInit, OnChanges {

    @Input() companyData: any;
    private shippingForm: FormGroup;
    /*private companyAddress: any = JSON.parse(sessionStorage.getItem('cAd1'))+", "+
                                    JSON.parse(sessionStorage.getItem('cct'))+", "+
                                    JSON.parse(sessionStorage.getItem('cpv'))+", "+
                                    JSON.parse(sessionStorage.getItem('ccy'))+", "+
                                    JSON.parse(sessionStorage.getItem('cpc'));*/
    private companyAddress: any ;
    private showShippingAddress: boolean = true;
    private errorMsg: any;
    private displayErrorMessage: boolean = false;
    private displayRequiredFieldError: boolean = false;
    private shippingAddress: any;
    private createCompanyOrderProfileResponse: any;
    private showCanadaProvinces: boolean = true;
    private showUSProvinces: boolean = false;
    private disableButton: boolean = false;
    @Output() sendCompanyOrderInfo: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder) {
        this.createShippingForm();
    }

    ngOnInit() {

    }

    ngOnChanges() {
        //console.log("ShippingComponent...companyData..", this.companyData);

        this.companyAddress= this.companyData.companyInfo.companyAddressLine1+", "+
                            this.companyData.companyInfo.companyCity+", "+
                            this.companyData.companyInfo.companyProvince+", "+
                            this.companyData.companyInfo.companyCountry+", "+
                            this.companyData.companyInfo.companyPostalCode;
    }

    createShippingForm() {

        this.shippingForm = this._formBuilder.group({

            shippingAddressLine1: [null, Validators.required],
            shippingAddressLine2: [null],
            shippingCity: [null, Validators.required],
            shippingProvince: [null, Validators.required],
            shippingCountry: [null, Validators.required],
            shippingPostalCode: [null, Validators.required]

        })

    }

    onClickSameAddress() {

        this.showShippingAddress = !this.showShippingAddress;

        //console.log("ShippingComponent...showShippingAddress..", this.showShippingAddress);

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



    onClickContinue(formData) {
        //console.log("onClickContinue...showShippingAddress..", this.showShippingAddress);
        //console.log("onClickContinue...formData..", formData.value);

        this.disableButton = true;

        let shippingAddress = this.createShippingAddress(this.showShippingAddress, formData);

        //this.storeShippingAddressInSession(shippingAddress);

        let companyOrderProfile = this.createCompanyOrderProfile(shippingAddress);

        let jsoncompanyOrderProfile = JSON.stringify(companyOrderProfile);

        //console.log("jsoncompanyOrderProfile.....", jsoncompanyOrderProfile);

        this._createAccountService.createCompanyOrderProfile(companyOrderProfile)
            .subscribe(response => {

                this.createCompanyOrderProfileResponse = response.json()
                //console.log("createCompanyOrderProfileResponse :...", this.createCompanyOrderProfileResponse)
                //let jsonCompanyOrderProfileResponse = JSON.stringify(this.createCompanyOrderProfileResponse)
                //sessionStorage.setItem('jsonCompanyOrderProfileResponse', jsonCompanyOrderProfileResponse);

                this.sendCompanyOrderInfo.emit({
                    createCompanyOrderProfileResponse: this.createCompanyOrderProfileResponse,
                    ordersBillSummary: this.companyData.ordersBillSummary,
                    billCalculations: this.companyData.billCalculations
                })

            },
            error => {
                this.disableButton = false;
                this.errorMsg = "Connection error, please try again later.";
                this.displayErrorMessage = true;
                //console.log("createCompanyOrderProfile error: ", error.status)
            })

    }

    /*storeShippingAddressInSession(shippingAddress){
        sessionStorage.setItem('sAd1', JSON.stringify(shippingAddress.addressLine1));
        sessionStorage.setItem('sAd2', JSON.stringify(shippingAddress.addressLine2));
        sessionStorage.setItem('sct', JSON.stringify(shippingAddress.city));
        sessionStorage.setItem('spv', JSON.stringify(shippingAddress.province));
        sessionStorage.setItem('spc', JSON.stringify(shippingAddress.postalCode));
        sessionStorage.setItem('scy', JSON.stringify(shippingAddress.country));
    }*/

    createShippingAddress(showShippingAddress: boolean, formData: any) {

        if (showShippingAddress == false) {

           /*this.shippingAddress = {
                "addressId": null,
                "addressLine1": JSON.parse(sessionStorage.getItem('cAd1')),
                "addressLine2": JSON.parse(sessionStorage.getItem('cAd2')),
                "city": JSON.parse(sessionStorage.getItem('cct')),
                "province": JSON.parse(sessionStorage.getItem('cpv')),
                "postalCode": JSON.parse(sessionStorage.getItem('cpc')),
                "country": JSON.parse(sessionStorage.getItem('ccy'))
            }*/
            this.shippingAddress = {
                "addressId": null,
                "addressLine1": this.companyData.companyInfo.companyAddressLine1,
                "addressLine2": this.companyData.companyInfo.companyAddressLine2,
                "city": this.companyData.companyInfo.companyCity,
                "province": this.companyData.companyInfo.companyProvince,
                "postalCode": this.companyData.companyInfo.companyPostalCode,
                "country": this.companyData.companyInfo.companyCountry
            }
            return this.shippingAddress;

        } else {

            if(formData.status == "INVALID"){
                this.displayRequiredFieldError = true;
                this.disableButton = false;
            }else{
                this.displayRequiredFieldError = false;
            this.shippingAddress = {
                    "addressId": null,
                    "addressLine1": this.shippingForm.value.shippingAddressLine1,
                    "addressLine2": this.shippingForm.value.shippingAddressLine2,
                    "city": this.shippingForm.value.shippingCity,
                    "province": this.shippingForm.value.shippingProvince,
                    "postalCode": this.shippingForm.value.shippingCountry,
                    "country": this.shippingForm.value.shippingPostalCode
                }
            }
           
            return this.shippingAddress;
        }

        
    }

    createCompanyOrderProfile(shippingAddress) {

        //let orderList = this.getOrderList();

        let postCompanyOrderProfile = {

            "companyInfo": {
                "companyId": null,
                "companyName": this.companyData.companyInfo.companyName,
                "companyAddressDetails": {
                   
                    "addressId": null,
                    "addressLine1": this.companyData.companyInfo.companyAddressLine1,
                    "addressLine2": this.companyData.companyInfo.companyAddressLine2,
                    "city": this.companyData.companyInfo.companyCity,
                    "province": this.companyData.companyInfo.companyProvince,
                    "postalCode": this.companyData.companyInfo.companyPostalCode,
                    "country": this.companyData.companyInfo.companyCountry
                },
                "companyStatus": "PAYMENT_PENDING"
            },
            "ordersList": this.companyData.ordersList,
            "shippingAddress": shippingAddress,
            "adminId": this.companyData.adminInfo.adminId

        }

        return postCompanyOrderProfile;
    }

    /*private jsonOrderList: any;
    getOrderList(){
       let ordersList = sessionStorage.getItem('ordersList')

        let jsonOrderList = JSON.parse(ordersList)
        //console.log("jsonOrderList..."+jsonOrderList)

        return jsonOrderList;
    }*/


}