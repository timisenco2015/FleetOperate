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
var billModel_1 = require("./billModel");
var BillingComponent = (function () {
    function BillingComponent(_createAccountService, router, _formBuilder) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.showShippingAddress = true;
        this.showBillingAddress = true;
        this.gst = 5;
        this.pst = 8;
        this.totalTax = 0.13;
        this.billSummaryList = [];
        this.createBillingForm();
    }
    BillingComponent.prototype.ngOnInit = function () {
    };
    BillingComponent.prototype.ngOnChanges = function () {
        //console.log("companyOrdersDetails...",this.companyOrdersDetails);
        this.calculateBillingSummary(this.companyOrdersDetails);
    };
    BillingComponent.prototype.createBillingForm = function () {
        this.billingForm = this._formBuilder.group({
            shippingAddressLine1: [null, forms_1.Validators.required],
            shippingAddressLine2: [null],
            shippingCity: [null, forms_1.Validators.required],
            shippingProvince: [null, forms_1.Validators.required],
            shippingCountry: [null, forms_1.Validators.required],
            shippingPostalCode: [null, forms_1.Validators.required],
            billingAddressLine1: [null, forms_1.Validators.required],
            billingAddressLine2: [null],
            billingCity: [null, forms_1.Validators.required],
            billingProvince: [null, forms_1.Validators.required],
            billingCountry: [null, forms_1.Validators.required],
            billingPostalCode: [null, forms_1.Validators.required]
        });
    };
    BillingComponent.prototype.calculateBillingSummary = function (companyOrdersDetails) {
        //console.log("calculateBilling ..companyOrdersDetails...",companyOrdersDetails);
        this.billSummaryList = this.calculateOrdersSummary(companyOrdersDetails);
        this.totalBillAmountWithTax = this.calculateTotalBill(this.billSummaryList);
    };
    BillingComponent.prototype.calculateTotalBill = function (billSummaryList) {
        var totalCost = 0.0;
        for (var i = 0; i < billSummaryList.length; i++) {
            var eachOrderSummary = billSummaryList[i];
            //console.log("each order Summary:.."+eachOrderSummary.totalPrice);
            totalCost += eachOrderSummary.totalPrice;
        }
        this.totalBillAmount = totalCost;
        var totalBillAmountWithTax = this.totalBillAmount * this.totalTax;
        return totalBillAmountWithTax;
    };
    BillingComponent.prototype.calculateOrdersSummary = function (orderDetails) {
        var billSummaryList = [];
        if (orderDetails.standardQuantity != 0) {
            billSummaryList.push(this.createStandardPlanSummary(orderDetails.standardQuantity));
        }
        else {
        }
        if (orderDetails.enhancedQuantity != 0) {
            billSummaryList.push(this.createEnhancedPlanSummary(orderDetails.enhancedQuantity));
        }
        else {
        }
        if (orderDetails.premierQuantity != 0) {
            billSummaryList.push(this.createPremierPlanSummary(orderDetails.premierQuantity));
        }
        else {
        }
        //console.log("billSummaryList...",billSummaryList);
        return billSummaryList;
    };
    BillingComponent.prototype.createStandardPlanSummary = function (standardPlanQuantity) {
        this.standardBillSummary = new billModel_1.BillSummary();
        this.standardBillSummary.plan = "STANDARD";
        this.standardBillSummary.price = 35.00;
        this.standardBillSummary.quantity = standardPlanQuantity;
        this.standardBillSummary.totalPrice = standardPlanQuantity * this.standardBillSummary.price;
        return this.standardBillSummary;
    };
    BillingComponent.prototype.createEnhancedPlanSummary = function (enhancedPlanQuantity) {
        this.enhancedBillSummary = new billModel_1.BillSummary();
        this.enhancedBillSummary.plan = "ENHANCED";
        this.enhancedBillSummary.price = 55.00;
        this.enhancedBillSummary.quantity = enhancedPlanQuantity;
        this.enhancedBillSummary.totalPrice = enhancedPlanQuantity * this.enhancedBillSummary.price;
        return this.enhancedBillSummary;
    };
    BillingComponent.prototype.createPremierPlanSummary = function (premierPlanQuantity) {
        this.premierBillSummary = new billModel_1.BillSummary();
        this.premierBillSummary.plan = "PREMIER";
        this.premierBillSummary.price = 85.00;
        this.premierBillSummary.quantity = premierPlanQuantity;
        this.premierBillSummary.totalPrice = premierPlanQuantity * this.premierBillSummary.price;
        return this.premierBillSummary;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BillingComponent.prototype, "companyOrdersDetails", void 0);
    BillingComponent = __decorate([
        core_1.Component({
            selector: 'billing',
            templateUrl: 'app/createAccount/billing/billingTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder])
    ], BillingComponent);
    return BillingComponent;
}());
exports.BillingComponent = BillingComponent;
