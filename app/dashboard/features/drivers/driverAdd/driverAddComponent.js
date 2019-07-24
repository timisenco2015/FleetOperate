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
var driverService_1 = require('../driverService');
var DriverAddComponent = (function () {
    function DriverAddComponent(_formBuilder, _driverService) {
        this._formBuilder = _formBuilder;
        this._driverService = _driverService;
        this.showError = false;
        this.showForm = true;
        this.displayDriverAdded = false;
        this.showFieldError = false;
        this.inputFirstNameFieldCss = '';
        this.inputMiddleNameFieldCss = '';
        this.inputLastNameFieldCss = '';
        this.inputGenderFieldCss = '';
        this.inputDobFieldCss = '';
        this.inputAddressLine1FieldCss = '';
        this.inputAddressLine2FieldCss = '';
        this.inputCityFieldCss = '';
        this.inputState_provinceFieldCss = '';
        this.inputZip_postal_codFieldCss = '';
        this.inputMobilePhoneFieldCss = '';
        this.inputCountryFieldCss = '';
        this.inputHomePhoneFieldCss = '';
        this.inputDriverLincNumberFieldCss = '';
        this.inputDriverLicencseExpiryFieldCss = '';
        this.inputDriverLincEIssuedAuthorityFieldCss = '';
        this.inputDriverLincEIssuedProvinceStateFieldCss = '';
        this.inputCandaVisaStatusFieldCss = '';
        this.inputUsaVisaStatusFieldCss = '';
        this.inputNationalityFieldCss = '';
        this.createAddDriverForm();
        this.addDriverViewPage1 = true;
    }
    DriverAddComponent.prototype.ngOnInit = function () {
    };
    DriverAddComponent.prototype.ngOnChanges = function () {
    };
    DriverAddComponent.prototype.createAddDriverForm = function () {
        this.firstNameFc = this._formBuilder.control('', forms_1.Validators.required);
        this.middleNameFc = this._formBuilder.control('', forms_1.Validators.required);
        this.lastNameFc = this._formBuilder.control('', forms_1.Validators.required);
        this.genderFc = this._formBuilder.control('', forms_1.Validators.required);
        this.dobFc = this._formBuilder.control('', forms_1.Validators.required);
        this.emailFc = this._formBuilder.control('', forms_1.Validators.required);
        this.addressLine1Fc = this._formBuilder.control('', forms_1.Validators.required);
        this.addressLine2Fc = this._formBuilder.control('', forms_1.Validators.required);
        this.cityFc = this._formBuilder.control('', forms_1.Validators.required);
        this.state_provinceFc = this._formBuilder.control('', forms_1.Validators.required);
        this.zip_postal_codeFc = this._formBuilder.control('', forms_1.Validators.required);
        this.countryFc = this._formBuilder.control('', forms_1.Validators.required);
        this.mobilePhoneFc = this._formBuilder.control('', forms_1.Validators.required);
        this.homePhoneFc = this._formBuilder.control('', forms_1.Validators.required);
        this.driverLincNumberFc = this._formBuilder.control('', forms_1.Validators.required);
        this.driverLicencseExpiryFc = this._formBuilder.control('', forms_1.Validators.required);
        this.driverLincEIssuedAuthorityFc = this._formBuilder.control('', forms_1.Validators.required);
        this.driverLincEIssuedProvinceStateFc = this._formBuilder.control('', forms_1.Validators.required);
        this.candaVisaStatusFc = this._formBuilder.control('', forms_1.Validators.required);
        this.usaVisaStatusFc = this._formBuilder.control('', forms_1.Validators.required);
        this.nationalityFc = this._formBuilder.control('', forms_1.Validators.required);
        this.notesFc = this._formBuilder.control('', forms_1.Validators.required);
        this.addDriverForm = this._formBuilder.group({
            firstName: this.firstNameFc,
            middleName: this.middleNameFc,
            lastName: this.lastNameFc,
            gender: this.genderFc,
            dob: this.dobFc,
            email: this.emailFc,
            addressLine1: this.addressLine1Fc,
            addressLine2: this.addressLine2Fc,
            city: this.cityFc,
            province: this.state_provinceFc,
            postalCode: this.zip_postal_codeFc,
            country: this.countryFc,
            cellPhone: this.mobilePhoneFc,
            homePhone: this.homePhoneFc,
            licenseNumber: this.driverLincNumberFc,
            licenseExpiry: this.driverLicencseExpiryFc,
            licenseIssuedAuthority: this.driverLincEIssuedProvinceStateFc,
            licenseIssuedProvince: this.driverLincEIssuedProvinceStateFc,
            canVisaStatus: this.candaVisaStatusFc,
            usaVisaStatus: this.usaVisaStatusFc,
            nationality: this.nationalityFc,
            notes: this.notesFc
        });
    };
    DriverAddComponent.prototype.showAddnewDrivePage2 = function () {
        this.addDriverViewPage2 = true;
        this.addDriverViewPage1 = false;
    };
    DriverAddComponent.prototype.showAddnewDrivePage1 = function () {
        this.addDriverViewPage1 = true;
        this.addDriverViewPage2 = false;
    };
    //this method set input 
    DriverAddComponent.prototype.confirmAllInputFieldsValid = function () {
        if (this.firstNameFc.hasError('required')) {
            this.inputFirstNameFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.middleNameFc.hasError('required')) {
            this.inputMiddleNameFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.lastNameFc.hasError('required')) {
            this.inputLastNameFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.genderFc.hasError('required')) {
            this.inputGenderFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.dobFc.hasError('required')) {
            this.inputDobFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.addressLine1Fc.hasError('required')) {
            this.inputAddressLine1FieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.addressLine2Fc.hasError('required')) {
            this.inputAddressLine2FieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.cityFc.hasError('required')) {
            this.inputCityFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.state_provinceFc.hasError('required')) {
            this.inputState_provinceFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.zip_postal_codeFc.hasError('required')) {
            this.inputZip_postal_codFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.countryFc.hasError('required')) {
            this.inputCountryFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.homePhoneFc.hasError('required')) {
            this.inputHomePhoneFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.mobilePhoneFc.hasError('required')) {
            this.inputMobilePhoneFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.driverLincNumberFc.hasError('required')) {
            this.inputDriverLincNumberFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.driverLicencseExpiryFc.hasError('required')) {
            this.inputDriverLicencseExpiryFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.driverLincEIssuedAuthorityFc.hasError('required')) {
            this.inputDriverLincEIssuedAuthorityFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.driverLincEIssuedProvinceStateFc.hasError('required')) {
            this.inputDriverLincEIssuedProvinceStateFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.candaVisaStatusFc.hasError('required')) {
            this.inputCandaVisaStatusFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.usaVisaStatusFc.hasError('required')) {
            this.inputUsaVisaStatusFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.nationalityFc.hasError('required')) {
            this.inputNationalityFieldCss = { 'border-left': '4px solid #ff0000' };
        }
        if (this.notesFc.hasError('required')) {
            this.inputNotesFieldCss = { 'border-left': '4px solid #ff0000' };
        }
    };
    DriverAddComponent.prototype.onClickSave = function (formData) {
        var _this = this;
        console.log("The Driver details are: ", formData);
        this.submitAttempt = true;
        if (this.addDriverForm.status == 'INVALID') {
            this.confirmAllInputFieldsValid();
            this.showFieldError = true;
            this.errorMessages = "You have error in one of the fields below";
        }
        else {
            //this.registerCompanyAndAdmin(formData); 
            this._driverService.addDrivers(formData).subscribe(function (response) {
                alert(response.json());
                //console.log(" drivers logs:  ", this.driverAllLogs);
                if (response.status == 200) {
                    _this.showError = false;
                }
                else {
                    _this.broadcastErrorCode = response.status;
                    _this.showError = true;
                    if (_this.showError = true) {
                    }
                }
            }, function (error) {
                _this.errorMessage = error;
                if (error != null) {
                    _this.broadcastErrorCode = error;
                    _this.showError = true;
                    if (_this.showError = true) {
                    }
                }
                console.log("Options request Error : ", error.status);
            });
        }
        /* this._driverSettingsService.checkIfUsernameExistsInDB(formData.email)
         .subscribe(
              serviceResponse => {
                  this.usernameCheckResponse = serviceResponse.json();
                 console.log("checkIfUsernameExists response:...", this.usernameCheckResponse.personEmailIdExists);
 
                 if(this.usernameCheckResponse.personEmailIdExists == false){
                     console.log("username is NOT registered")
 
                     this._driverSettingsService.addDriver(formData)
                     .subscribe(
                     serviceResponse => {
                         this.addResponse = serviceResponse
                         console.log("add driver response:...", this.addResponse)
 
                         if(this.addResponse.status == 200){
                             this.showForm = false;
                             setTimeout(() => {
                                 this.createAddDriverForm();
                                 this.showForm = true;
                             });
                             //this.addTruckForm.reset();
                             this.displayDriverAdded = true;
                             window.scrollTo(0,0)
                         }else{
                             this.broadcastErrorCode = this.addResponse.status;
                             this.showError = true;
                             if(this.showError = true){
                                 window.scrollTo(0,0)
                             }
                         }
                     },
                     error => {
                         this.errorMessage = error;
                         if(error.status != null){
                         this.broadcastErrorCode = error.status;
                         this.displayDriverAdded = false;
                         this.showError = true;
                         if(this.showError = true){
                             window.scrollTo(0,0)
                         }
                     }
                         console.log("Add truck error: ", error.status)
                     })
                     }else{
                     console.log("username is registered")
                 }
              },
              error => {
                 this.errorMessage = error;
                 console.log("checkIfUsernameExists error: ", error.status)
              })
 
         //this.displayDriverList.emit("displayDriverList");
         */
    };
    DriverAddComponent.prototype.onClickCancel = function () {
        //this.displayDriverList.emit("displayDriverList");
    };
    DriverAddComponent = __decorate([
        core_1.Component({
            selector: 'driver-add',
            templateUrl: 'app/dashboard/features/drivers/driverAdd/driverAddTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, driverService_1.DriverService])
    ], DriverAddComponent);
    return DriverAddComponent;
}());
exports.DriverAddComponent = DriverAddComponent;
