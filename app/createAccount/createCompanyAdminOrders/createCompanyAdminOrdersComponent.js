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
var CreateCompanyAdminOrdersComponent = (function () {
    function CreateCompanyAdminOrdersComponent(_formBuilder, _createAccountService, router) {
        this._formBuilder = _formBuilder;
        this._createAccountService = _createAccountService;
        this.router = router;
        this.displayUsernameExists = false;
        this.displayEmailIdExists = false;
        this.displayRequiredFieldError = false;
        this.validEmailId = false;
        this.displayAcceptTermsConditions = false;
        this.minimumOrderCondition = false;
        this.displayMinimumOrderCondition = false;
        this.displayBilling = new core_1.EventEmitter();
        this.createAddCompanyAndAdminForm();
    }
    CreateCompanyAdminOrdersComponent.prototype.ngOnChanges = function (changes) {
        //throw new Error("Method not implemented.");
    };
    CreateCompanyAdminOrdersComponent.prototype.ngOnInit = function () {
        this.extractLocalTimezone();
    };
    CreateCompanyAdminOrdersComponent.prototype.onClickCancel = function () {
        this.router.navigate(['login']);
    };
    CreateCompanyAdminOrdersComponent.prototype.createAddCompanyAndAdminForm = function () {
        this.addCompanyForm = this._formBuilder.group({
            companyName: [null, forms_1.Validators.required],
            companyAddressLine1: [null, forms_1.Validators.required],
            companyAddressLine2: [null],
            companyCity: [null, forms_1.Validators.required],
            companyProvince: [null, forms_1.Validators.required],
            companyPostalCode: [null, forms_1.Validators.required],
            companyCountry: [null, forms_1.Validators.required],
            adminFirstName: [null, forms_1.Validators.required],
            adminMiddleName: [null],
            adminLastName: [null, forms_1.Validators.required],
            adminCellPhone: [null, forms_1.Validators.required],
            adminEmail: [null, forms_1.Validators.required],
            standardQuantity: [0],
            enhancedQuantity: [0],
            premierQuantity: [0],
        });
    };
    CreateCompanyAdminOrdersComponent.prototype.extractLocalTimezone = function () {
        //console.log("The extractLocalTimezone is called: ");
        var currentDate = new Date();
        //console.log("The currentDate is: ", currentDate);
    };
    //=============THIS BELOW METHOD NOT REQUIRED ANYMORE==========================
    CreateCompanyAdminOrdersComponent.prototype.onClickSave = function (formData) {
        //console.log("The company details are: ", formData.value)
        //console.log("The company details are: ", formData.status)
        this.displayUsernameExists = false;
        this.displayEmailIdExists = false;
        this.checkIfUsernameExists(formData);
        //console.log("checkIfUsernameExists response is...: ", this.usernameCheckResponse)
    };
    //=============THIS ABOVE METHOD NOT REQUIRED ANYMORE==========================
    CreateCompanyAdminOrdersComponent.prototype.checkIfUsernameExists = function (adminEmailId) {
        //console.log("checkIfUsernameExists called: ", adminEmailId)
        var _this = this;
        this._createAccountService.checkIfUsernameExistsInDB(/*formData.adminUsername,*/ adminEmailId)
            .subscribe(function (serviceResponse) {
            _this.usernameCheckResponse = serviceResponse.json();
            //console.log("checkIfUsernameExists response 1:...", this.usernameCheckResponse.usernameExists)
            //console.log("checkIfUsernameExists response 2:...", this.usernameCheckResponse.personEmailIdExists)
            if (_this.usernameCheckResponse.personEmailIdExists == false) {
                //console.log("emailId is NOT registered");
                //this.registerCompanyAndAdmin(formData);
                _this.validEmailId = true;
                _this.displayEmailIdExists = false;
            }
            else {
                //console.log("emailId is already registered");
                _this.displayEmailIdExists = true;
                window.scrollTo(0, 0);
                _this.validEmailId = false;
            }
        }, function (error) {
            _this.errorMessage = error;
            //console.log("checkIfUsernameExists error: ", error.status)
        });
        //return this.usernameCheckResponse;
    };
    CreateCompanyAdminOrdersComponent.prototype.registerCompanyAndAdmin = function (formData) {
        var _this = this;
        this._createAccountService.addCompanyAndAdmin(formData)
            .subscribe(function (serviceResponse) {
            _this.addCompanyResponse = serviceResponse;
            //console.log("add company response:...", this.addCompanyResponse.status)
            if (_this.addCompanyResponse.status == 200) {
                //console.log("Add company and admin successful: ");
                document.getElementById("showModal").click();
            }
            else {
            }
        }, function (error) {
            _this.errorMessage = error;
            //console.log("Add company error: ", error.status)
        });
    };
    CreateCompanyAdminOrdersComponent.prototype.onEmailIdTabOff = function (formData) {
        //console.log("emailId: ", formData.adminEmail);
        this.checkIfUsernameExists(formData.adminEmail);
    };
    CreateCompanyAdminOrdersComponent.prototype.onClickTermAndConditions = function () {
        //console.log("onClickTermAndConditions: ")
        document.getElementById("showTermsConditionsModal").click();
    };
    CreateCompanyAdminOrdersComponent.prototype.checkIfAtleastOneOrderIsMade = function (formData) {
        //console.log("checkIfAtleastOneOrderIsMade, formData: ", formData);
        if (formData.standardQuantity != 0
            || formData.enhancedQuantity != 0
            || formData.premierQuantity != 0) {
            //this.minimumOrderCondition = false;
            //console.log("checkIfAtleastOneOrderIsMade, standardQuantity: ", formData.standardQuantity);
            //console.log("checkIfAtleastOneOrderIsMade, enhancedQuantity: ", formData.enhancedQuantity);
            //console.log("checkIfAtleastOneOrderIsMade, premierQuantity: ", formData.enhancedQuantity);
            return true;
        }
        else {
            //this.minimumOrderCondition = true;
            return false;
        }
        //console.log("minimumOrderCondition: ", this.minimumOrderCondition);
        //return this.minimumOrderCondition;
    };
    CreateCompanyAdminOrdersComponent.prototype.onClickNext = function (formData) {
        //console.log("onClickNext: formData..", formData.value)
        // check if all form fields are filled
        if (formData.status == "INVALID") {
            //console.log("formData.status: ", formData.value);
            this.displayRequiredFieldError = true;
            window.scrollTo(0, 0);
        }
        else {
            //console.log("formData.status: ", formData.value);
            this.displayRequiredFieldError = false;
            // check if email id exits in db or not
            if (this.validEmailId == true) {
                //console.log("valid email id: ");
                this.displayEmailIdExists = false;
                //console.log("checking to diaplay form data: ", formData.value);
                // check if atleast one order is made
                var minOrderCondition = this.checkIfAtleastOneOrderIsMade(formData.value);
                //console.log("minOrderCondition: ",minOrderCondition);
                if (minOrderCondition == true) {
                    //console.log("minimum order is made: ");
                    this.displayMinimumOrderCondition = false;
                    // check if terms and conditions are accepted or not
                    if (this.acceptTerms == true) {
                        //console.log("check box clicked : ");
                        this.displayAcceptTermsConditions = false;
                        //console.log("proceed to next page : ");
                        this.displayBilling.emit({ companyAdminOrders: formData.value });
                    }
                    else {
                        //console.log("check box NOT checked : ");
                        this.displayAcceptTermsConditions = true;
                        window.scrollTo(0, 0);
                    }
                }
                else {
                    //console.log("minimum order is NOT made: ");
                    this.displayMinimumOrderCondition = true;
                    window.scrollTo(0, 0);
                }
            }
            else {
                //console.log("not valid email id: ");
                this.displayEmailIdExists = true;
                window.scrollTo(0, 0);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CreateCompanyAdminOrdersComponent.prototype, "displayBilling", void 0);
    CreateCompanyAdminOrdersComponent = __decorate([
        core_1.Component({
            selector: 'createCompanyAdminOrders',
            templateUrl: 'app/createAccount/createCompanyAdminOrders/createCompanyAdminOrdersTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, createAccountService_1.CreateAccountService, router_1.Router])
    ], CreateCompanyAdminOrdersComponent);
    return CreateCompanyAdminOrdersComponent;
}());
exports.CreateCompanyAdminOrdersComponent = CreateCompanyAdminOrdersComponent;
