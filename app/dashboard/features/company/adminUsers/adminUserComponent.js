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
var forms_1 = require('@angular/forms');
var AdminUserComponent = (function () {
    // as the component loads initially, what should it execute.
    function AdminUserComponent(companyFullInfoService, _formBuilder) {
        this.companyFullInfoService = companyFullInfoService;
        this._formBuilder = _formBuilder;
        this.createAddCompanyAndAdminForm();
        this.inputFieldCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
        // this. populateFormFields();
    }
    AdminUserComponent.prototype.ngOnInit = function () {
        this.adminInformation = this.adminInfo;
        this.submitAttempt = false;
        this.isEditInfo = false;
        this.showError = false;
        this.noInputFeildEdit = true;
        this.populateFormFields();
    };
    // on any change of action, what should be executed
    AdminUserComponent.prototype.ngOnChanges = function () {
    };
    AdminUserComponent.prototype.populateFormFields = function () {
        // alert(this.adminInfo)
        if (this.adminInformation['username'] != '' && this.adminInformation['username'] != null) {
            this.adminUserForm['controls']['adminUsername'].setValue(this.adminInformation['username']);
        }
        else {
            this.adminUserForm['controls']['adminUsername'].setValue('none');
        }
        if (this.adminInformation['email'] != '' && this.adminInformation['email'] != null) {
            this.adminUserForm['controls']['adminEmail'].setValue(this.adminInformation['email']);
        }
        else {
            this.adminUserForm['controls']['adminEmail'].setValue('None');
        }
        if (this.adminInformation['cellPhone'] != '' && this.adminInformation['cellPhone'] != null) {
            this.adminUserForm['controls']['adminCellPhone'].setValue(this.adminInformation['cellPhone']);
        }
        else {
            this.adminUserForm['controls']['adminCellPhone'].setValue('None');
        }
        if (this.adminInformation['gender'] != '' && this.adminInformation['gender'] != null) {
            this.adminUserForm['controls']['adminGender'].setValue(this.adminInformation['gender']);
        }
        else {
            this.adminUserForm['controls']['adminGender'].setValue('None');
        }
        if (this.adminInformation['dob'] != null && this.adminInformation['dob'] != '') {
            this.adminUserForm['controls']['adminDob'].setValue(this.adminInformation['dob']);
        }
        else {
            this.adminUserForm['controls']['adminDob'].setValue('None');
        }
        if (this.adminInformation['addressLine1'] != '' && this.adminInformation['addressLine1'] != null) {
            this.adminUserForm['controls']['adminAddressLine1'].setValue(this.adminInformation['addressLine1']);
        }
        else {
            this.adminUserForm['controls']['adminAddressLine1'].setValue('None');
        }
        if (this.adminInformation['addressLine2'] != '' && this.adminInformation['addressLine2'] != null) {
            this.adminUserForm['controls']['adminAddressLine2'].setValue(this.adminInformation['addressLine2']);
        }
        else {
            this.adminUserForm['controls']['adminAddressLine2'].setValue('None');
        }
        if (this.adminInformation['city'] != '' && this.adminInformation['city'] != null) {
            this.adminUserForm['controls']['adminCity'].setValue(this.adminInformation['city']);
        }
        else {
            this.adminUserForm['controls']['adminCity'].setValue('None');
        }
        if (this.adminInformation['province'] != '' && this.adminInformation['province'] != null) {
            this.adminUserForm['controls']['adminPronvice'].setValue(this.adminInformation['province']);
        }
        else {
            this.adminUserForm['controls']['adminPronvice'].setValue('None');
        }
        if (this.adminInformation['country'] != '' && this.adminInformation['country'] != null) {
            this.adminUserForm['controls']['adminCountry'].setValue(this.adminInformation['country']);
        }
        else {
            this.adminUserForm['controls']['adminCountry'].setValue('None');
        }
        if (this.adminInformation['postalCode'] != '' && this.adminInformation['postalCode'] != null) {
            this.adminUserForm['controls']['adminPostalCode'].setValue(this.adminInformation['postalCode']);
        }
        else {
            this.adminUserForm['controls']['adminPostalCode'].setValue('None');
        }
    };
    AdminUserComponent.prototype.createAddCompanyAndAdminForm = function () {
        this.adminUsernameFc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminEmailFc = this._formBuilder.control(null);
        this.adminCellPhoneFc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminGenderFc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminDobFc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminAddressLine1Fc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminAddressLine2Fc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminCityFc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminPronviceFc = this._formBuilder.control('', forms_1.Validators.required);
        this.adminCountryFc = this._formBuilder.control('', forms_1.Validators.nullValidator);
        this.adminPostalCodeFc = this._formBuilder.control('', forms_1.Validators.nullValidator);
        this.adminUserForm = this._formBuilder.group({
            adminUsername: this.adminUsernameFc,
            adminEmail: this.adminEmailFc,
            adminCellPhone: this.adminCellPhoneFc,
            adminGender: this.adminGenderFc,
            adminDob: this.adminDobFc,
            adminAddressLine1: this.adminAddressLine1Fc,
            adminAddressLine2: this.adminAddressLine2Fc,
            adminCity: this.adminCityFc,
            adminPronvice: this.adminPronviceFc,
            adminCountry: this.adminCountryFc,
            adminPostalCode: this.adminPostalCodeFc
        });
    };
    AdminUserComponent.prototype.onEnableFieldInput = function (event) {
        if (!this.noInputFeildEdit) {
            this.noInputFeildEdit = true;
            this.inputFieldCss = { 'outline': 'none', 'border': 'inherit', 'box-shadow': 'none', 'background': 'none' };
            this.isEditInfo = false;
        }
        else {
            this.noInputFeildEdit = false;
            this.inputFieldCss = null;
            this.isEditInfo = true;
        }
    };
    AdminUserComponent.prototype.onUpdate = function (adminUserFormValue) {
        this.submitAttempt = true;
        if (this.adminUserForm.status == 'INVALID') {
            this.showError = true;
        }
        else {
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdminUserComponent.prototype, "adminInfo", void 0);
    AdminUserComponent = __decorate([
        core_1.Component({
            selector: 'adminUser',
            templateUrl: 'app/dashboard/features/company/adminUsers/adminUserTemplate.html',
        }), 
        __metadata('design:paramtypes', [companyService_1.CompanyService, forms_1.FormBuilder])
    ], AdminUserComponent);
    return AdminUserComponent;
}());
exports.AdminUserComponent = AdminUserComponent;
