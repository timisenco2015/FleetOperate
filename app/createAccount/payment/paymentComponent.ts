import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";
import { OrderDetail } from "./orderDetail";
import { Observable } from 'rxjs/Observable';
import { PaymentService } from "./paymentService";

declare var Stripe: any;
@Component({
    selector: 'payment',
    templateUrl: 'app/createAccount/payment/paymentTemplate.html',
    //styleUrls: ['app/createAccount/payment/paymentStyle.css']
})

export class PaymentComponent implements OnInit, OnChanges {

    @Input() companyOrderData: any;
    private showPaymentAddress: boolean = true;
    //private stripeKey: string = "pk_test_lU2UnGeUlHCkOypWT5AaHpGR";
    private stripe: any;
    private card: any;
    private billingForm: FormGroup;
    /*private companyAddress: any = JSON.parse(sessionStorage.getItem('cAd1')) + ", " +
                                    JSON.parse(sessionStorage.getItem('cct')) + ", " +
                                    JSON.parse(sessionStorage.getItem('cpv')) + ", " +
                                    JSON.parse(sessionStorage.getItem('ccy')) + ", " +
                                    JSON.parse(sessionStorage.getItem('cpc')) ;*/
    private companyAddress: any;

    private tokenCode: any;
    private displayRequiredFieldError: boolean = false;
    private billingAddress: any;
    private makePaymentResponse: any;
    private companyId: any;
    private ordersList: any[];
    private orderDetail: OrderDetail;
    private displayErrorMessage: boolean = false;
    private errorMessage: any;
    private showCanadaProvinces: boolean = true;
    private showUSProvinces: boolean = false;
    private disableContinue: boolean = false;
    @Output() gotoPaymentConfirmation: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private paymentService:PaymentService) {
        this.createBillingForm();
    }

    ngOnInit() {

        this.initiateStripe();

    }

    ngOnChanges() {
        //console.log("payment page...companyOrder info..", this.companyOrderData);

        this.companyAddress = this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.addressLine1 + ", " +
        this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.city + ", " +
        this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.province + ", " +
        this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.country + ", " +
        this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.postalCode ;

        /*this.card.on('change', function(event) {
            this.setOutcome(event);
        });*/
    }

    onClickSameAddress() {

        this.showPaymentAddress = !this.showPaymentAddress;

        //console.log("PaymentComponent...showPaymentAddress..", this.showPaymentAddress);

    }

    createBillingForm() {

        this.billingForm = this._formBuilder.group({

            billingAddressLine1: [null, Validators.required],
            billingAddressLine2: [null],
            billingCity: [null, Validators.required],
            billingProvince: [null, Validators.required],
            billingCountry: [null, Validators.required],
            billingPostalCode: [null, Validators.required]

        })

    }

    initiateStripe() {
        this.paymentService.getPaymentData()
            .subscribe(response => {
                let paymentData = response;

                this.stripe = Stripe(paymentData.stripeKey);
                var elements = this.stripe.elements();
        
                this.card = elements.create('card', {
                    style: {
                        base: {
                          iconColor: '#666EE8',
                          color: '#31325F',
                          lineHeight: '40px',
                          fontWeight: 300,
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSize: '15px',
                    
                          '::placeholder': {
                            color: '#CFD7E0',
                          },
                        },
                      }
                    });
                    this.card.mount('#card-element');
        
                this.card.addEventListener('change', function (event) {
                    var displayError = document.getElementById('card-errors');
                    if (event.error) {
                        displayError.textContent = event.error.message;
                    } else {
                        displayError.textContent = '';
                    }
                });
            })
        

         /*this.card.on('change', function(event) {
             this.setOutcome(event);
         });*/
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

    onClickContinue(billingForm) {
        //console.log("onClickContinue...billingForm...", billingForm.value);
        //console.log("onClickContinue...showShippingAddress..", this.showPaymentAddress);
        this.disableContinue = true;

        // get payment token
        var extraDetails = {
            //name: JSON.parse(sessionStorage.getItem('adEId'))
            name: this.companyOrderData.createCompanyOrderProfileResponse.adminInfo.email
        }
        //console.log("onClickContinue...extraDetails...", extraDetails);
        this.stripe.createToken(this.card, extraDetails).then(result => {
            //console.log("stripe result token...",result)
            
            this.displayErrorMessage = false;

            let self = this;

            if (result.token) {
                // Use the token to create a charge or a customer
                // https://stripe.com/docs/charges
                //successElement.querySelector('.token').textContent = result.token.id;
                //successElement.classList.add('visible');

                //console.log("token..", result.token.id)
                self.tokenCode = result.token.id;
                //console.log("self.tokenCode..", self.tokenCode)
                self.makePayment(self.tokenCode, billingForm);

            } else if (result.error) {
               
                this.disableContinue = false;
                this.displayErrorMessage = true;
                this.errorMessage = result.error.message;
            }

        })
    }

    makePayment(token: any, formData: any) {
        //console.log("payStripe called...stripeToken", token);

        let billingAddress = this.createBillingAddress(this.showPaymentAddress, formData);
        //console.log("payStripe called...billingAddress", billingAddress);

        let stripePaymentRequest = this.createMakePaymentObject(billingAddress, token);

        this._createAccountService.makePayment(stripePaymentRequest)
        .subscribe(response => {
            
                            let makePaymentResponse = response.json()
                            //console.log("makePaymentResponse :...", makePaymentResponse)

                            if(makePaymentResponse.companyId == null){
                                this.errorMessage = "Payment failed, please try again.";
                                this.displayErrorMessage = true;
                                this.disableContinue = false;
                            }else{
                                
                                this.displayErrorMessage = false;
                                this.gotoPaymentConfirmation.emit({companyId: makePaymentResponse.companyId})
                                //console.log("makePaymentResponse :...gotoPaymentConfirmation emitted")
                            }
    
            
                        },
                        error => {
                            this.disableContinue = false;
                            this.errorMessage = "Connection error, please try again later.";
                            this.displayErrorMessage = true;
                            //console.log("makePayment error: ", error.status)
                        })
    }

    createBillingAddress(showPaymentAddress: boolean, formData: any):Observable<any> {
        //console.log("formData..", formData.value)

        if (showPaymentAddress == false) {
            //console.log("showPaymentAddress..", showPaymentAddress)
            /*this.billingAddress = {
                "addressId": null,
                "addressLine1": JSON.parse(sessionStorage.getItem('cAd1')),
                "addressLine2": JSON.parse(sessionStorage.getItem('cAd2')),
                "city": JSON.parse(sessionStorage.getItem('cct')),
                "province": JSON.parse(sessionStorage.getItem('cpv')),
                "postalCode": JSON.parse(sessionStorage.getItem('cpc')),
                "country": JSON.parse(sessionStorage.getItem('ccy'))
            }*/
            this.billingAddress = {
                "addressId": null,
                "addressLine1": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.addressLine1,
                "addressLine2": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.addressLine2,
                "city": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.city,
                "province": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.province,
                "postalCode": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.postalCode,
                "country": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.country
            }
            return this.billingAddress;

        } else {
            //console.log("formData..", formData.value)

            if (formData.status == "INVALID") {
                this.displayRequiredFieldError = true;
            } else {
                this.displayRequiredFieldError = false;
                this.billingAddress = {
                    "addressId": null,
                    "addressLine1": formData.value.billingAddressLine1,
                    "addressLine2": formData.value.billingAddressLine2,
                    "city": formData.value.billingCity,
                    "province": formData.value.billingProvince,
                    "postalCode": formData.value.billingCountry,
                    "country": formData.value.billingPostalCode

                }
                
            }
            //console.log("billingAddress..", this.billingAddress)
            return this.billingAddress;
            
        }


    }

    createMakePaymentObject(billingAddress, token) {

        //let companyId = this.getCompanyId();

        let ordersList = this.getOrderList();

        let postMakePayment = {

            /*"stripeTokenId": token,
            "companyId": companyId,
            "adminId": JSON.parse(sessionStorage.getItem('adId')),
            "companyName": JSON.parse(sessionStorage.getItem('cNm')),
            "adminName": JSON.parse(sessionStorage.getItem('adFN')) + " " + JSON.parse(sessionStorage.getItem('adLN')),
            "adminEmailId": JSON.parse(sessionStorage.getItem('adEId')),
            "paymentDescription": "payment for first orders",
            "orderList": ordersList,
            "totalBillAmount": JSON.parse(sessionStorage.getItem('tbawt')),
            "billAmount": JSON.parse(sessionStorage.getItem('tba')),
            "gst": JSON.parse(sessionStorage.getItem('gstPrice')),
            "pst": JSON.parse(sessionStorage.getItem('pstPrice')),
            "billingAddressDetails": billingAddress*/

            "stripeTokenId": token,
            "companyId": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyId,
            "adminId": this.companyOrderData.createCompanyOrderProfileResponse.adminInfo.personId,
            "companyName": this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.name,
            "adminName": this.companyOrderData.createCompanyOrderProfileResponse.adminInfo.firstName 
                            + " " + this.companyOrderData.createCompanyOrderProfileResponse.adminInfo.lastName,
            "adminEmailId": this.companyOrderData.createCompanyOrderProfileResponse.adminInfo.email,
            "paymentDescription": "payment for first orders",
            "orderList": ordersList,
            "totalBillAmount": this.companyOrderData.billCalculations.totalBillAmountWithTax,
            "billAmount": this.companyOrderData.billCalculations.totalBillAmount,
            "gst": this.companyOrderData.billCalculations.gstPrice,
            "pst": this.companyOrderData.billCalculations.pstPrice,
            "billingAddressDetails": billingAddress

        }

        //console.log("postMakePayment...", postMakePayment)

        return postMakePayment;
    }

    private jsonCompanyOrderInfo: any;

    getOrderList() {

        let existingOrderList = this.companyOrderData.createCompanyOrderProfileResponse.ordersList

        let ordersList: any[] = [];

        for (var i = 0; i < existingOrderList.length; i++) {

            var eachOrderSummary = existingOrderList[i];

            //console.log("each order Summary order number:.." + eachOrderSummary.orderNumber);

            ordersList.push(this.createOrder(eachOrderSummary.orderNumber, eachOrderSummary.plan, eachOrderSummary.quantity))

            //console.log("ordersList:.." + ordersList);

        }

        return ordersList;
    }


    /*getCompanyId() {
        let companyOrderInfo = sessionStorage.getItem('jsonCompanyOrderProfileResponse')

        this.jsonCompanyOrderInfo = JSON.parse(companyOrderInfo)

        this.companyId = this.jsonCompanyOrderInfo.companyInfo.companyId

        return this.companyId;
    }*/

    /*getOrderList() {
        let companyOrderInfo = sessionStorage.getItem('jsonCompanyOrderProfileResponse')

        this.jsonCompanyOrderInfo = JSON.parse(companyOrderInfo)

        let existingOrderList = this.jsonCompanyOrderInfo.ordersList

        let ordersList: any[] = [];

        for (var i = 0; i < existingOrderList.length; i++) {

            var eachOrderSummary = existingOrderList[i];

            //console.log("each order Summary order number:.." + eachOrderSummary.orderNumber);

            ordersList.push(this.createOrder(eachOrderSummary.orderNumber, eachOrderSummary.plan, eachOrderSummary.quantity))

            //console.log("ordersList:.." + ordersList);

        }

        return ordersList;
    }*/

    createOrder(orderNumber: number, plan: string, quantity: number){
        //console.log("createOrder:..orderNumber.." + orderNumber);
       // console.log("createOrder:..plan.." + plan);
       // console.log("createOrder:..quantity.." + quantity);

        this.orderDetail = new OrderDetail();
        this.orderDetail.orderNumber = orderNumber;
        this.orderDetail.plan = plan;
        this.orderDetail.quantity = quantity;

        return this.orderDetail;

    }



}