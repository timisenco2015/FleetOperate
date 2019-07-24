import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAccountService } from "../createAccountService";
import { Router } from "@angular/router";
import { BillSummary } from "./billModel";

@Component({
    selector: 'billing',
    templateUrl: 'app/createAccount/billing/billingTemplate.html'
})

export class BillingComponent implements OnInit, OnChanges {

    private showShippingAddress: boolean = true;
    @Input() companyOrdersDetails: any;
    private billingForm: FormGroup;
    private showBillingAddress: boolean = true;
    private shippingAddressCheckYes: boolean;
    private shippingAddressCheckNo: boolean;
    private billingAddressCheckYes: boolean;
    private billingAddressCheckNo: boolean;
    private standardBillSummary: BillSummary;
    private enhancedBillSummary: BillSummary;
    private premierBillSummary: BillSummary;
    private gst: any = 5;
    private pst: any = 8;
    private totalTax: any = 0.13;
    private totalBillAmount: any;
    private totalBillAmountWithTax: any;
    private billSummaryList: any[]=[];

    constructor(private _createAccountService: CreateAccountService,
                private router: Router,
                private _formBuilder: FormBuilder) {

        this.createBillingForm();

    }

    ngOnInit() {
       
    }

    ngOnChanges() {
       //console.log("companyOrdersDetails...",this.companyOrdersDetails);
       this.calculateBillingSummary(this.companyOrdersDetails);
    }

    createBillingForm(){

        this.billingForm = this._formBuilder.group({
 
            shippingAddressLine1: [null, Validators.required],
            shippingAddressLine2: [null],
            shippingCity: [null, Validators.required],
            shippingProvince: [null, Validators.required],
            shippingCountry: [null, Validators.required],
            shippingPostalCode: [null, Validators.required],

            billingAddressLine1: [null, Validators.required],
            billingAddressLine2: [null],
            billingCity: [null, Validators.required],
            billingProvince: [null, Validators.required],
            billingCountry: [null, Validators.required],
            billingPostalCode: [null, Validators.required]
 
        })

    }

    calculateBillingSummary(companyOrdersDetails: any){
        //console.log("calculateBilling ..companyOrdersDetails...",companyOrdersDetails);

        this.billSummaryList = this.calculateOrdersSummary(companyOrdersDetails);
        
        this.totalBillAmountWithTax = this.calculateTotalBill(this.billSummaryList);

    }

    calculateTotalBill(billSummaryList: any[]){

        var totalCost: any = 0.0

        for(var i = 0; i < billSummaryList.length; i++){

            var eachOrderSummary = billSummaryList[i];

            //console.log("each order Summary:.."+eachOrderSummary.totalPrice);

            totalCost += eachOrderSummary.totalPrice;

            //console.log("totalCost:.."+totalCost);

        }
        this.totalBillAmount = totalCost;

        let totalBillAmountWithTax = this.totalBillAmount*this.totalTax;

        return totalBillAmountWithTax;
    }

    calculateOrdersSummary(orderDetails: any){

        let billSummaryList: any[] = [];

        if(orderDetails.standardQuantity != 0){
            billSummaryList.push(this.createStandardPlanSummary(orderDetails.standardQuantity));
        }else{
            //console.log("no standard plan selected...");
        }

        if(orderDetails.enhancedQuantity != 0){
            billSummaryList.push(this.createEnhancedPlanSummary(orderDetails.enhancedQuantity));
        }else{
            //console.log("no enhanced plan selected...");
        }

        if(orderDetails.premierQuantity != 0){
            billSummaryList.push(this.createPremierPlanSummary(orderDetails.premierQuantity));
        }else{
            //console.log("no premier plan selected...");
        }

        //console.log("billSummaryList...",billSummaryList);

        return billSummaryList;

    }

    createStandardPlanSummary(standardPlanQuantity: number){
        this.standardBillSummary = new BillSummary();
        this.standardBillSummary.plan = "STANDARD";
        this.standardBillSummary.price = 35.00;
        this.standardBillSummary.quantity = standardPlanQuantity;
        this.standardBillSummary.totalPrice = standardPlanQuantity*this.standardBillSummary.price;

        return this.standardBillSummary;

    }

    createEnhancedPlanSummary(enhancedPlanQuantity: number){
        this.enhancedBillSummary = new BillSummary();
        this.enhancedBillSummary.plan = "ENHANCED";
        this.enhancedBillSummary.price = 55.00;
        this.enhancedBillSummary.quantity = enhancedPlanQuantity;
        this.enhancedBillSummary.totalPrice = enhancedPlanQuantity*this.enhancedBillSummary.price;

        return this.enhancedBillSummary;

    }

    createPremierPlanSummary(premierPlanQuantity: any){
        this.premierBillSummary = new BillSummary();
        this.premierBillSummary.plan = "PREMIER";
        this.premierBillSummary.price = 85.00;
        this.premierBillSummary.quantity = premierPlanQuantity;
        this.premierBillSummary.totalPrice = premierPlanQuantity*this.premierBillSummary.price;

        return this.premierBillSummary;

    }



}