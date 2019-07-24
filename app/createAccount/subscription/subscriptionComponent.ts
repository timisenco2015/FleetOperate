import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";
import { SubscriptionDetails } from "./subscriptionModel";
import { OrderDetails } from "./OrdersModel";
import { SubscriptionService } from "./subscriptionService";

@Component({
    selector: 'subscription',
    templateUrl: 'app/createAccount/subscription/subscriptionTemplate.html'
})

export class SubscriptionComponent implements OnInit, OnChanges {

    @Input() adminData: any;
    private subscriptionForm: FormGroup;
    private totalPrice: any;
    @Output() sendDataFromSubscription: EventEmitter<any> = new EventEmitter<any>();
    private standardSubscription: SubscriptionDetails;
    private enhancedSubscription: SubscriptionDetails;
    private subscriptionSummaryList: any[] = [];
    private standardOrder: OrderDetails;
    private enhancedOrder: OrderDetails;
    private orderSummaryList: any[] = [];
    private gst: any;
    private pst: any;
    private totalTax: any;
    private totalBillAmount: any;
    private billCalculations: any;
    
    private displayRequiredFieldError: boolean = false;
    private displayNoSubscription: boolean = true;
    private standardSubscriptionPrice: any;
    private enhancedSubscriptionPrice: any;
    private standardQuantity: any = 0;
    private enhancedQuantity: any = 0;
    private disableButton: boolean = false;
    private showComparePlans:boolean;

    constructor(private _createAccountService: CreateAccountService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private subscriptionService:SubscriptionService) {
        this.createSubscriptionForm();
        this.getSubscriptionData();
        
    }

    ngOnInit() {

    }

    ngOnChanges() {

    }

    createSubscriptionForm() {
        this.subscriptionForm = this._formBuilder.group({

            standardQuantity: [0],
            enhancedQuantity: [0]

        })
    }

    onClickComparePlans(){
        this.showComparePlans=!this.showComparePlans;
    }

    getSubscriptionData(){

        this.subscriptionService.getSubscriptionData()
        .subscribe(response => {
            let subscriptionData = response;

            this.gst = subscriptionData.tax.manitoba.gst;
            this.pst = subscriptionData.tax.manitoba.pst;
            this.totalTax = subscriptionData.tax.manitoba.totalTax;

            this.standardSubscriptionPrice = subscriptionData.subscriptionPrices.standard;
            this.enhancedSubscriptionPrice = subscriptionData.subscriptionPrices.enhanced;

        })
    }

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

    onClickContinue(formData: any) {
        //console.log("onClickContinue..", formData.value);
        //console.log("onClickContinue..", formData.status);
        this.disableButton = true;

        // check if atleast one order is selected
        if (formData.value.standardQuantity == 0 ||
            formData.value.enhancedQuantity == 0) {
            this.displayRequiredFieldError = true;
            this.disableButton = false;
        } else {
            this.displayRequiredFieldError = false;

            this.createOrder(formData.value);

            
        }

    }

    createOrder(orders){

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

           
    }

    calculateTotalBill(billSummaryList: any[]) {

        var totalCost: any = 0.0

        for (var i = 0; i < billSummaryList.length; i++) {

            var eachOrderSummary = billSummaryList[i];

            //console.log("each order Summary:.." + eachOrderSummary.totalPrice);

            totalCost += eachOrderSummary.totalPrice;

            //console.log("totalCost:.." + totalCost);

        }
        this.totalBillAmount = totalCost;
        //sessionStorage.setItem("tba", JSON.stringify(this.totalBillAmount))

        let gstPrice = this.totalBillAmount * this.gst;
        //sessionStorage.setItem("gstPrice", JSON.stringify(gstPrice.toLocaleString()))

        let pstPrice = this.totalBillAmount * this.pst;
        //sessionStorage.setItem("pstPrice", JSON.stringify(pstPrice.toLocaleString()))

        let totalBillAmountWithTax = (this.totalBillAmount * this.totalTax) + this.totalBillAmount;

        let billCalculations = {
            "totalBillAmount": this.totalBillAmount,
            "gstPrice": gstPrice,
            "pstPrice": pstPrice,
            "totalBillAmountWithTax": totalBillAmountWithTax
        }


        return billCalculations;
    }

    createOrderList(orders: any) {
        //console.log("createOrderList..", orders);

        let ordersList: any[] = [];

        if (orders.standardQuantity != 0) {
            ordersList.push(this.createStandardOrder(orders.standardQuantity));
        } else {
            //console.log("no standard plan selected...");
        }

        if (orders.enhancedQuantity != 0) {
            ordersList.push(this.createEnhancedOrder(orders.enhancedQuantity));
        } else {
            //console.log("no enhanced plan selected...");
        }

        return ordersList;
    }

    createStandardOrder(standardPlanQuantity: number) {
        this.standardOrder = new OrderDetails();
        this.standardOrder.orderNumber = null;
        this.standardOrder.companyId = null;
        this.standardOrder.plan = "STANDARD";
        this.standardOrder.quantity = standardPlanQuantity;

        return this.standardOrder;
    }
    createEnhancedOrder(enhancedPlanQuantity: number) {
        this.enhancedOrder = new OrderDetails();
        this.enhancedOrder.orderNumber = null;
        this.enhancedOrder.companyId = null;
        this.enhancedOrder.plan = "ENHANCED";
        this.enhancedOrder.quantity = enhancedPlanQuantity;

        return this.enhancedOrder;
    }

    calculateOrdersSummary(orderDetails: any) {

        let orderSummaryList: any[] = [];

        if (orderDetails.standardQuantity != 0) {
            orderSummaryList.push(this.createStandardPlanSummary(orderDetails.standardQuantity));
        } else {
           //console.log("no standard plan selected...");
        }

        if (orderDetails.enhancedQuantity != 0) {
            orderSummaryList.push(this.createEnhancedPlanSummary(orderDetails.enhancedQuantity));
        } else {
           //console.log("no enhanced plan selected...");
        }

        /*if(orderDetails.premierQuantity != 0){
            billSummaryList.push(this.createPremierPlanSummary(orderDetails.premierQuantity));
        }else{
            console.log("no premier plan selected...");
        }*/

        //console.log("orderSummaryList...", orderSummaryList);

        return orderSummaryList;

    }

    createStandardPlanSummary(standardPlanQuantity: number) {
        this.standardSubscription = new SubscriptionDetails();
        this.standardSubscription.plan = "STANDARD";
        this.standardSubscription.price = this.standardSubscriptionPrice;
        this.standardSubscription.quantity = standardPlanQuantity;
        this.standardSubscription.totalPrice = standardPlanQuantity * this.standardSubscriptionPrice;

        return this.standardSubscription;

    }

    createEnhancedPlanSummary(enhancedPlanQuantity: number) {
        this.enhancedSubscription = new SubscriptionDetails();
        this.enhancedSubscription.plan = "ENHANCED";
        this.enhancedSubscription.price = this.enhancedSubscriptionPrice;
        this.enhancedSubscription.quantity = enhancedPlanQuantity;
        this.enhancedSubscription.totalPrice = enhancedPlanQuantity * this.enhancedSubscriptionPrice;

        return this.enhancedSubscription;

    }


}