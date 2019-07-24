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
var subscriptionModel_1 = require("./subscriptionModel");
var OrdersModel_1 = require("./OrdersModel");
var subscriptionService_1 = require("./subscriptionService");
var SubscriptionComponent = (function () {
    function SubscriptionComponent(_createAccountService, router, _formBuilder, subscriptionService) {
        this._createAccountService = _createAccountService;
        this.router = router;
        this._formBuilder = _formBuilder;
        this.subscriptionService = subscriptionService;
        this.sendDataFromSubscription = new core_1.EventEmitter();
        this.subscriptionSummaryList = [];
        this.orderSummaryList = [];
        this.displayRequiredFieldError = false;
        this.displayNoSubscription = true;
        this.standardQuantity = 0;
        this.enhancedQuantity = 0;
        this.disableButton = false;
        this.createSubscriptionForm();
        this.getSubscriptionData();
    }
    SubscriptionComponent.prototype.ngOnInit = function () {
    };
    SubscriptionComponent.prototype.ngOnChanges = function () {
    };
    SubscriptionComponent.prototype.createSubscriptionForm = function () {
        this.subscriptionForm = this._formBuilder.group({
            standardQuantity: [0],
            enhancedQuantity: [0]
        });
    };
    SubscriptionComponent.prototype.onClickComparePlans = function () {
        this.showComparePlans = !this.showComparePlans;
    };
    SubscriptionComponent.prototype.getSubscriptionData = function () {
        var _this = this;
        this.subscriptionService.getSubscriptionData()
            .subscribe(function (response) {
            var subscriptionData = response;
            _this.gst = subscriptionData.tax.manitoba.gst;
            _this.pst = subscriptionData.tax.manitoba.pst;
            _this.totalTax = subscriptionData.tax.manitoba.totalTax;
            _this.standardSubscriptionPrice = subscriptionData.subscriptionPrices.standard;
            _this.enhancedSubscriptionPrice = subscriptionData.subscriptionPrices.enhanced;
        });
    };
    /* checkIfAtleastOneOrderIsMade(formData: any): Boolean{
         console.log("checkIfAtleastOneOrderIsMade, formData: ", formData);
     
         if(formData.standardQuantity != 0
             || formData.enhancedQuantity != 0
             || formData.premierQuantity != 0){
             //this.minimumOrderCondition = false;
             console.log("checkIfAtleastOneOrderIsMade, standardQuantity: ", formData.standardQuantity);
             console.log("checkIfAtleastOneOrderIsMade, enhancedQuantity: ", formData.enhancedQuantity);
             return true;
         }else{
             //this.minimumOrderCondition = true;
             return false;
         }
     }*/
    /*calculateTotalAmountToDisplay(subscriptionForm) {
        console.log("calculateTotalAmountToDisplay..", subscriptionForm.value);

        if (subscriptionForm.value.standardQuantity != 0 ||
            subscriptionForm.value.enhancedQuantity != 0) {
            this.displayNoSubscription = false;

            let standardPrice = (subscriptionForm.value.standardQuantity*this.standardSubscriptionPrice)

            let enhancedPrice = (subscriptionForm.value.enhancedQuantity*this.enhancedSubscriptionPrice)

            this.amountDisplayed = (standardPrice+enhancedPrice);
        } else {
            this.displayNoSubscription = true;
        }


}*/
    SubscriptionComponent.prototype.onClickContinue = function (formData) {
        //console.log("onClickContinue..", formData.value);
        //console.log("onClickContinue..", formData.status);
        this.disableButton = true;
        // check if atleast one order is selected
        if (formData.value.standardQuantity == 0 ||
            formData.value.enhancedQuantity == 0) {
            this.displayRequiredFieldError = true;
            this.disableButton = false;
        }
        else {
            this.displayRequiredFieldError = false;
            this.createOrder(formData.value);
        }
    };
    SubscriptionComponent.prototype.createOrder = function (orders) {
        // create order list in session
        this.orderSummaryList = this.createOrderList(orders);
        //console.log("orderSummaryList..", this.orderSummaryList);
        //let jsonOrderSummaryList = JSON.stringify(this.orderSummaryList)
        //sessionStorage.setItem("ordersList", jsonOrderSummaryList)
        // store bill summary in session for billing info
        this.subscriptionSummaryList = this.calculateOrdersSummary(orders);
        //console.log("subscriptionSummaryList..", this.subscriptionSummaryList);
        //sessionStorage.setItem("ordersBillSummary", JSON.stringify(this.subscriptionSummaryList));
        // store total amount with tax in session
        this.billCalculations = this.calculateTotalBill(this.subscriptionSummaryList);
        //console.log("billCalculations..", this.billCalculations);
        //sessionStorage.setItem("tbawt", JSON.stringify(this.totalBillAmountWithTax))
        this.sendDataFromSubscription.emit({
            adminInfo: this.adminData,
            orderQuantities: orders,
            ordersList: this.orderSummaryList,
            ordersBillSummary: this.subscriptionSummaryList,
            billCalculations: this.billCalculations
        });
    };
    SubscriptionComponent.prototype.calculateTotalBill = function (billSummaryList) {
        var totalCost = 0.0;
        for (var i = 0; i < billSummaryList.length; i++) {
            var eachOrderSummary = billSummaryList[i];
            //console.log("each order Summary:.." + eachOrderSummary.totalPrice);
            totalCost += eachOrderSummary.totalPrice;
        }
        this.totalBillAmount = totalCost;
        //sessionStorage.setItem("tba", JSON.stringify(this.totalBillAmount))
        var gstPrice = this.totalBillAmount * this.gst;
        //sessionStorage.setItem("gstPrice", JSON.stringify(gstPrice.toLocaleString()))
        var pstPrice = this.totalBillAmount * this.pst;
        //sessionStorage.setItem("pstPrice", JSON.stringify(pstPrice.toLocaleString()))
        var totalBillAmountWithTax = (this.totalBillAmount * this.totalTax) + this.totalBillAmount;
        var billCalculations = {
            "totalBillAmount": this.totalBillAmount,
            "gstPrice": gstPrice,
            "pstPrice": pstPrice,
            "totalBillAmountWithTax": totalBillAmountWithTax
        };
        return billCalculations;
    };
    SubscriptionComponent.prototype.createOrderList = function (orders) {
        //console.log("createOrderList..", orders);
        var ordersList = [];
        if (orders.standardQuantity != 0) {
            ordersList.push(this.createStandardOrder(orders.standardQuantity));
        }
        else {
        }
        if (orders.enhancedQuantity != 0) {
            ordersList.push(this.createEnhancedOrder(orders.enhancedQuantity));
        }
        else {
        }
        return ordersList;
    };
    SubscriptionComponent.prototype.createStandardOrder = function (standardPlanQuantity) {
        this.standardOrder = new OrdersModel_1.OrderDetails();
        this.standardOrder.orderNumber = null;
        this.standardOrder.companyId = null;
        this.standardOrder.plan = "STANDARD";
        this.standardOrder.quantity = standardPlanQuantity;
        return this.standardOrder;
    };
    SubscriptionComponent.prototype.createEnhancedOrder = function (enhancedPlanQuantity) {
        this.enhancedOrder = new OrdersModel_1.OrderDetails();
        this.enhancedOrder.orderNumber = null;
        this.enhancedOrder.companyId = null;
        this.enhancedOrder.plan = "ENHANCED";
        this.enhancedOrder.quantity = enhancedPlanQuantity;
        return this.enhancedOrder;
    };
    SubscriptionComponent.prototype.calculateOrdersSummary = function (orderDetails) {
        var orderSummaryList = [];
        if (orderDetails.standardQuantity != 0) {
            orderSummaryList.push(this.createStandardPlanSummary(orderDetails.standardQuantity));
        }
        else {
        }
        if (orderDetails.enhancedQuantity != 0) {
            orderSummaryList.push(this.createEnhancedPlanSummary(orderDetails.enhancedQuantity));
        }
        else {
        }
        /*if(orderDetails.premierQuantity != 0){
            billSummaryList.push(this.createPremierPlanSummary(orderDetails.premierQuantity));
        }else{
            console.log("no premier plan selected...");
        }*/
        //console.log("orderSummaryList...", orderSummaryList);
        return orderSummaryList;
    };
    SubscriptionComponent.prototype.createStandardPlanSummary = function (standardPlanQuantity) {
        this.standardSubscription = new subscriptionModel_1.SubscriptionDetails();
        this.standardSubscription.plan = "STANDARD";
        this.standardSubscription.price = this.standardSubscriptionPrice;
        this.standardSubscription.quantity = standardPlanQuantity;
        this.standardSubscription.totalPrice = standardPlanQuantity * this.standardSubscriptionPrice;
        return this.standardSubscription;
    };
    SubscriptionComponent.prototype.createEnhancedPlanSummary = function (enhancedPlanQuantity) {
        this.enhancedSubscription = new subscriptionModel_1.SubscriptionDetails();
        this.enhancedSubscription.plan = "ENHANCED";
        this.enhancedSubscription.price = this.enhancedSubscriptionPrice;
        this.enhancedSubscription.quantity = enhancedPlanQuantity;
        this.enhancedSubscription.totalPrice = enhancedPlanQuantity * this.enhancedSubscriptionPrice;
        return this.enhancedSubscription;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SubscriptionComponent.prototype, "adminData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SubscriptionComponent.prototype, "sendDataFromSubscription", void 0);
    SubscriptionComponent = __decorate([
        core_1.Component({
            selector: 'subscription',
            templateUrl: 'app/createAccount/subscription/subscriptionTemplate.html'
        }), 
        __metadata('design:paramtypes', [createAccountService_1.CreateAccountService, router_1.Router, forms_1.FormBuilder, subscriptionService_1.SubscriptionService])
    ], SubscriptionComponent);
    return SubscriptionComponent;
}());
exports.SubscriptionComponent = SubscriptionComponent;
