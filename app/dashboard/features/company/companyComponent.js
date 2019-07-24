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
var companyService_1 = require("./companyService");
var CompanyComponent = (function () {
    function CompanyComponent(companyDetailsService) {
        this.companyDetailsService = companyDetailsService;
        this.billingInfo = "hi";
        this.companyInfo = "hi";
        this.adminInfo = "hi";
    }
    // as the component loads initially, what should it execute.
    CompanyComponent.prototype.ngOnInit = function () {
        this.getCompanyDetails();
    };
    // on any change of action, what should be executed
    CompanyComponent.prototype.ngOnChanges = function () {
    };
    CompanyComponent.prototype.onClickCompanyInfo = function () {
        this.isCompanyInfoActive = true;
        this.isAccountActive = false;
        this.isAdminUsersActive = false;
        this.isBillingPaymentActive = false;
    };
    CompanyComponent.prototype.onAccount = function () {
        this.isCompanyInfoActive = false;
        this.isAccountActive = true;
        this.isAdminUsersActive = false;
        this.isBillingPaymentActive = false;
    };
    CompanyComponent.prototype.onBillingPayment = function () {
        this.isCompanyInfoActive = false;
        this.isAccountActive = false;
        this.isAdminUsersActive = false;
        this.isBillingPaymentActive = true;
    };
    CompanyComponent.prototype.onAdminUser = function () {
        this.isCompanyInfoActive = false;
        this.isAccountActive = false;
        this.isAdminUsersActive = true;
        this.isBillingPaymentActive = false;
    };
    CompanyComponent.prototype.getCompanyDetails = function () {
        var _this = this;
        this.companyDetailsService.getCompanyDetails().subscribe(function (response) {
            _this.companyCompleteInfo = response.json();
            _this.readCompanyDetailsFunction(_this.companyCompleteInfo);
            console.log("Company Details ", _this.companyCompleteInfo);
            if (response.status == 200) {
                _this.onClickCompanyInfo();
                _this.showError = false;
            }
            else {
                _this.broadcastErrorCode = response.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error != null) {
                _this.broadcastErrorCode = error;
            }
            console.log("Options request Error : ", error.status);
        });
    };
    CompanyComponent.prototype.readCompanyDetailsFunction = function (companyDetails) {
        this.billingInfo = companyDetails['billingInfo'];
        this.companyInfo = companyDetails['companyInfo'];
        this.adminInfo = companyDetails['adminInfo'];
    };
    CompanyComponent = __decorate([
        core_1.Component({
            selector: 'company',
            templateUrl: 'app/dashboard/features/company/companyTemplate.html'
        }), 
        __metadata('design:paramtypes', [companyService_1.CompanyService])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
