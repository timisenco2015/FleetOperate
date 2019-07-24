"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var createAccountService_1 = require("../createAccountService");
var router_1 = require("@angular/router");
var orderDetail_1 = require("./orderDetail");
var paymentService_1 = require("./paymentService");
var PaymentComponent = (function () {
    function PaymentComponent(_createAccountService, router, _formBuilder, paymentService) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.paymentService = paymentService;
        this.showPaymentAddress = true;
        this.displayRequiredFieldError = false;
        this.displayErrorMessage = false;
        this.showCanadaProvinces = true;
        this.showUSProvinces = false;
        this.disableContinue = false;
        this.gotoPaymentConfirmation = new core_1.EventEmitter();
        this.createBillingForm();
    }
    PaymentComponent.prototype.ngOnInit = function () {
        this.initiateStripe();
    };
    PaymentComponent.prototype.ngOnChanges = function () {
        //console.log("payment page...companyOrder info..", this.companyOrderData);
        this.companyAddress = this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.addressLine1 + ", " +
            this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.city + ", " +
            this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.province + ", " +
            this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.country + ", " +
            this.companyOrderData.createCompanyOrderProfileResponse.companyInfo.companyAddressDetails.postalCode;
        /*this.card.on('change', function(event) {
            this.setOutcome(event);
        });*/
    };
    PaymentComponent.prototype.onClickSameAddress = function () {
        this.showPaymentAddress = !this.showPaymentAddress;
        //console.log("PaymentComponent...showPaymentAddress..", this.showPaymentAddress);
    };
    PaymentComponent.prototype.createBillingForm = function () {
        this.billingForm = this._formBuilder.group({
            billingAddressLine1: [null, forms_1.Validators.required],
            billingAddressLine2: [null],
            billingCity: [null, forms_1.Validators.required],
            billingProvince: [null, forms_1.Validators.required],
            billingCountry: [null, forms_1.Validators.required],
            billingPostalCode: [null, forms_1.Validators.required]
        });
    };
    PaymentComponent.prototype.initiateStripe = function () {
        var _this = this;
        this.paymentService.getPaymentData()
            .subscribe(function (response) {
            var paymentData = response;
            _this.stripe = Stripe(paymentData.stripeKey);
            var elements = _this.stripe.elements();
            _this.card = elements.create('card', {
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
            _this.card.mount('#card-element');
            _this.card.addEventListener('change', function (event) {
                var displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                }
                else {
                    displayError.textContent = '';
                }
            });
        });
        /*this.card.on('change', function(event) {
            this.setOutcome(event);
        });*/
    };
    PaymentComponent.prototype.onClickCountry = function (value) {
        //console.log("onClickCountry is called..value..",value)
        if (value == "CANADA") {
            this.showCanadaProvinces = true;
            this.showUSProvinces = false;
        }
        else {
            this.showCanadaProvinces = false;
            this.showUSProvinces = true;
        }
    };
    PaymentComponent.prototype.onClickContinue = function (billingForm) {
        var _this = this;
        //console.log("onClickContinue...billingForm...", billingForm.value);
        //console.log("onClickContinue...showShippingAddress..", this.showPaymentAddress);
        this.disableContinue = true;
        // get payment token
        var extraDetails = {
            //name: JSON.parse(sessionStorage.getItem('adEId'))
            name: this.companyOrderData.createCompanyOrderProfileResponse.adminInfo.email
        };
        //console.log("onClickContinue...extraDetails...", extraDetails);
        this.stripe.createToken(this.card, extraDetails).then(function (result) {
            //console.log("stripe result token...",result)
            _this.displayErrorMessage = false;
            var self = _this;
            if (result.token) {
                // Use the token to create a charge or a customer
                // https://stripe.com/docs/charges
                //successElement.querySelector('.token').textContent = result.token.id;
                //successElement.classList.add('visible');
                //console.log("token..", result.token.id)
                self.tokenCode = result.token.id;
                //console.log("self.tokenCode..", self.tokenCode)
                self.makePayment(self.tokenCode, billingForm);
            }
            else if (result.error) {
                _this.disableContinue = false;
                _this.displayErrorMessage = true;
                _this.errorMessage = result.error.message;
            }
        });
    };
    PaymentComponent.prototype.makePayment = function (token, formData) {
        //console.log("payStripe called...stripeToken", token);
        var _this = this;
        var billingAddress = this.createBillingAddress(this.showPaymentAddress, formData);
        //console.log("payStripe called...billingAddress", billingAddress);
        var stripePaymentRequest = this.createMakePaymentObject(billingAddress, token);
        this._createAccountService.makePayment(stripePaymentRequest)
            .subscribe(function (response) {
            var makePaymentResponse = response.json();
            //console.log("makePaymentResponse :...", makePaymentResponse)
            if (makePaymentResponse.companyId == null) {
                _this.errorMessage = "Payment failed, please try again.";
                _this.displayErrorMessage = true;
                _this.disableContinue = false;
            }
            else {
                _this.displayErrorMessage = false;
                _this.gotoPaymentConfirmation.emit({ companyId: makePaymentResponse.companyId });
            }
        }, function (error) {
            _this.disableContinue = false;
            _this.errorMessage = "Connection error, please try again later.";
            _this.displayErrorMessage = true;
            //console.log("makePayment error: ", error.status)
        });
    };
    PaymentComponent.prototype.createBillingAddress = function (showPaymentAddress, formData) {
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
            };
            return this.billingAddress;
        }
        else {
            //console.log("formData..", formData.value)
            if (formData.status == "INVALID") {
                this.displayRequiredFieldError = true;
            }
            else {
                this.displayRequiredFieldError = false;
                this.billingAddress = {
                    "addressId": null,
                    "addressLine1": formData.value.billingAddressLine1,
                    "addressLine2": formData.value.billingAddressLine2,
                    "city": formData.value.billingCity,
                    "province": formData.value.billingProvince,
                    "postalCode": formData.value.billingCountry,
                    "country": formData.value.billingPostalCode
                };
            }
            //console.log("billingAddress..", this.billingAddress)
            return this.billingAddress;
        }
    };
    PaymentComponent.prototype.createMakePaymentObject = function (billingAddress, token) {
        //let companyId = this.getCompanyId();
        var ordersList = this.getOrderList();
        var postMakePayment = {
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
        };
        //console.log("postMakePayment...", postMakePayment)
        return postMakePayment;
    };
    PaymentComponent.prototype.getOrderList = function () {
        var existingOrderList = this.companyOrderData.createCompanyOrderProfileResponse.ordersList;
        var ordersList = [];
        for (var i = 0; i < existingOrderList.length; i++) {
            var eachOrderSummary = existingOrderList[i];
            //console.log("each order Summary order number:.." + eachOrderSummary.orderNumber);
            ordersList.push(this.createOrder(eachOrderSummary.orderNumber, eachOrderSummary.plan, eachOrderSummary.quantity));
        }
        return ordersList;
    };
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
    PaymentComponent.prototype.createOrder = function (orderNumber, plan, quantity) {
        //console.log("createOrder:..orderNumber.." + orderNumber);
        // console.log("createOrder:..plan.." + plan);
        // console.log("createOrder:..quantity.." + quantity);
        this.orderDetail = new orderDetail_1.OrderDetail();
        this.orderDetail.orderNumber = orderNumber;
        this.orderDetail.plan = plan;
        this.orderDetail.quantity = quantity;
        return this.orderDetail;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PaymentComponent.prototype, "companyOrderData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaymentComponent.prototype, "gotoPaymentConfirmation", void 0);
    PaymentComponent = __decorate([
        core_1.Component({
            selector: 'payment',
            templateUrl: 'app/createAccount/payment/paymentTemplate.html',
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder, paymentService_1.PaymentService])
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
