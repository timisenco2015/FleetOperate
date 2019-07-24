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
var companyInfoService_1 = require('../companyInfo/companyInfoService');
var forms_1 = require('@angular/forms');
var AdminUserComponent = (function () {
    // as the component loads initially, what should it execute.
    function AdminUserComponent(companyInfoService, _formBuilder) {
        this.companyInfoService = companyInfoService;
        this._formBuilder = _formBuilder;
        this.createAddCompanyAndAdminForm();
        this.populateFormFields();
    }
    AdminUserComponent.prototype.ngOnInit = function () {
        this.notCompanyNameEdit = true;
        this.notCompanyNameEdit = true;
        this.notBusinessNumberEdit = true;
        this.notBusinessNameEdit = true;
        this.notCompanyWebsiteIdEdit = true;
        this.notCompanyEmailEdit = true;
        this.notCompanyAddress1Edit = true;
        this.notCompanyAddress2Edit = true;
        this.notCompanyCityEdit = true;
        this.notCompanyProvinceEdit = true;
        this.notCompanyPostalCodeEdit = true;
        this.notCompanyCountryEdit = true;
        this.notCompanyPhoneNumberEdit = true;
        this.isEditInfo = false;
        this.companyNameCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.businessNumberCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.businessNameCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyWebsiteCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyEmailCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyAddress1Css = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyAddress2Css = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyCityCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyProvinceCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyPostalCodeCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyCountryCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        this.companyPhoneNumberCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
    };
    // on any change of action, what should be executed
    AdminUserComponent.prototype.ngOnChanges = function () {
    };
    AdminUserComponent.prototype.populateFormFields = function () {
        this.companyInfoForm['controls']['companyPhoneNumber'].setValue('aaa');
        this.companyInfoForm['controls']['companyAddress2'].setValue('sss');
        this.companyInfoForm['controls']['businessName'].setValue('ddddd');
        this.companyInfoForm['controls']['companyName'].setValue('ddddd');
        this.companyInfoForm['controls']['companyWebsite'].setValue('ddddd');
        this.companyInfoForm['controls']['companyCity'].setValue('ddddd');
    };
    AdminUserComponent.prototype.createAddCompanyAndAdminForm = function () {
        this.companyPhoneNumberFc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyCountryFc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyPostalCodeFc = this._formBuilder.control(null);
        this.companyProvinceFc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyCityFc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyAddress2Fc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyAddress1Fc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyEmailFc = this._formBuilder.control('', forms_1.Validators.required);
        this.companyWebsiteFc = this._formBuilder.control('', forms_1.Validators.required);
        this.businessNameFc = this._formBuilder.control('', forms_1.Validators.required);
        this.businessNumberFc = this._formBuilder.control('', forms_1.Validators.nullValidator);
        this.companyNameFc = this._formBuilder.control('', forms_1.Validators.nullValidator);
        this.companyInfoForm = this._formBuilder.group({
            companyPhoneNumber: this.companyPhoneNumberFc,
            companyCountry: this.companyCountryFc,
            companyPostalCode: this.companyPostalCodeFc,
            companyProvince: this.companyProvinceFc,
            companyCity: this.companyCityFc,
            companyAddress2: this.companyAddress2Fc,
            companyAddress1: this.companyAddress1Fc,
            companyEmail: this.companyEmailFc,
            companyWebsite: this.companyWebsiteFc,
            businessName: this.businessNameFc,
            businessNumber: this.businessNumberFc,
            companyName: this.companyNameFc
        });
    };
    AdminUserComponent.prototype.onEnableFieldInput = function (event) {
        var elementName = event.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].attributes.name.value;
        if (elementName == "companyName") {
            this.notCompanyNameEdit = false;
            this.companyNameCss = null;
        }
        else if (elementName == "businessNumber") {
            this.notBusinessNumberEdit = false;
            this.businessNumberCss = null;
        }
        else if (elementName == "businessName") {
            this.notBusinessNameEdit = false;
            this.businessNameCss = null;
        }
        else if (elementName == "companyWebsite") {
            this.notCompanyWebsiteIdEdit = false;
            this.companyWebsiteCss = null;
        }
        else if (elementName == "companyEmail") {
            this.notCompanyEmailEdit = false;
            this.companyEmailCss = null;
        }
        else if (elementName == "companyAddress1") {
            this.notCompanyAddress1Edit = false;
            this.companyAddress1Css = null;
        }
        else if (elementName == "companyAddress2") {
            this.notCompanyAddress2Edit = false;
            this.companyAddress2Css = null;
        }
        else if (elementName == "companyCity") {
            this.notCompanyCityEdit = false;
            this.companyCityCss = null;
        }
        else if (elementName == "companyProvince") {
            this.notCompanyProvinceEdit = false;
            this.companyProvinceCss = null;
        }
        else if (elementName == "companyPostalCode") {
            this.notCompanyPostalCodeEdit = false;
            this.companyPostalCodeCss = null;
        }
        else if (elementName == "companyCountry") {
            this.notCompanyCountryEdit = false;
            this.companyCountryCss = null;
        }
        else if (elementName == "companyPhoneNumber") {
            this.notCompanyPhoneNumberEdit = false;
            this.companyPhoneNumberCss = null;
        }
        this.isEditInfo = true;
    };
    AdminUserComponent = __decorate([
        core_1.Component({
            selector: 'companyInfo',
            templateUrl: 'app/dashboard/features/company/companyInfo/companyInfoTemplate.html',
        }), 
        __metadata('design:paramtypes', [companyInfoService_1.CompanyInfoService, forms_1.FormBuilder])
    ], AdminUserComponent);
    return AdminUserComponent;
}());
exports.AdminUserComponent = AdminUserComponent;
//# sourceMappingURL=adminUsersComponent.js.map