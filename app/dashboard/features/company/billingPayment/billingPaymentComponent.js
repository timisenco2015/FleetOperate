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
var companyService_1 = require('../companyService');
var BillingPaymentComponent = (function () {
    function BillingPaymentComponent(companyFullInfoService) {
        this.companyFullInfoService = companyFullInfoService;
        this.orderDetailsView = false;
        this.showItem = true;
    }
    BillingPaymentComponent.prototype.ngOnInit = function () {
        this.displayBillingInfo = this.billingInfo;
        this.orderDetailsView = false;
        this.showItem = true;
    };
    // on any change of action, what should be executed
    BillingPaymentComponent.prototype.ngOnChanges = function () {
    };
    // this method is used to view sub order information. it listened to click event in the template and checked if the sub oder information is 
    // showing or not. if it showing it will hide but if it not then it will display. it also works like accordion. the index its recieved let us know
    // the div index the click event is coming from
    BillingPaymentComponent.prototype.onSubDetailsView = function (index) {
        $('.subDetailsViewClicked').removeAttr("hidden");
        var length = $('.detailsViewClicked').length;
        var i;
        for (i = 0; i < length; i++) {
            if (i == index) {
                if ($($('.detailsViewClicked').eq(index).find('.subDetailsViewClicked')).is(':visible')) {
                    $($('.detailsViewClicked').eq(index).find('.subDetailsViewClicked')).hide();
                }
                else {
                    $($('.detailsViewClicked').eq(index).find('.subDetailsViewClicked')).show();
                }
            }
            else {
                $($('.detailsViewClicked').eq(i).find('.subDetailsViewClicked')).hide();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BillingPaymentComponent.prototype, "billingInfo", void 0);
    BillingPaymentComponent = __decorate([
        core_1.Component({
            selector: 'billingPayment',
            templateUrl: 'app/dashboard/features/company/billingPayment/billingPaymentTemplate.html',
        }), 
        __metadata('design:paramtypes', [companyService_1.CompanyService])
    ], BillingPaymentComponent);
    return BillingPaymentComponent;
}());
exports.BillingPaymentComponent = BillingPaymentComponent;
