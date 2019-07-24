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
var DriverEditComponent = (function () {
    function DriverEditComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.showError = false;
        this.createForm();
    }
    DriverEditComponent.prototype.ngOnInit = function () {
        console.log(" driver to edit in edit component :  ");
        //this.driverToEdit.addressLine1)
        /*for (var i = 0; i < this.driverList.length; i++) {

            var editData = this.driverList[i];
             console.log(" driver summary ID:  ", editData.driverId)
            if (editData.driverId == this.selectedDriverIdToEdit) {

                this.driverDetails = editData;
                console.log("driverDetails is:  ", this.driverDetails);
                break;

            } else {
                this.driverDetails = null;
            }
        }
       // this.driverDetails = this.driverToEdit;
       */
    };
    DriverEditComponent.prototype.ngOnChanges = function () {
    };
    DriverEditComponent.prototype.createForm = function () {
        this.editDriverForm = this._formBuilder.group({
            'companyId': [localStorage.getItem("token_2")],
            'driverId': [],
            'firstName': [],
            'middleName': [],
            'lastName': [],
            'dob': [],
            'gender': [],
            'licenseNumber': [],
            'licenseExpiry': [],
            'addressLine1': [],
            'addressLine2': [],
            'city': [],
            'province': [],
            'country': [],
            'postalCode': [],
            'cellPhone': [],
            'homePhone': [],
            'email': [],
            'canVisaStatus': [],
            'usaVisaStatus': [],
            'nationality': [],
            'notes': []
        });
    };
    DriverEditComponent.prototype.onClickSave = function (formData) {
        /*  console.log("The edited Driver details are: ", formData)
          this._driverSettingsService.updateDriver(formData, this.selectedDriverIdToEdit)
              .subscribe(
              updateResponse => {
                  this.updateResponse = updateResponse
                  console.log("updateResponse :...", this.updateResponse.status)
                  if(this.updateResponse.status == 200){
                       this.displayDriverList.emit("displayDriverList");
                  }else{
                      this.broadcastErrorCode = this.updateResponse.status;
                      console.log("errorMessage 2: ", this.broadcastErrorCode)
                      this.showError = true;
                       if(this.showError = true){
                          window.scrollTo(0,0)
                      }
                  }
              },
              error => {this.errorMessage = error;
                          if(error.status != null){
                              console.log("errorMessage 1: ", error.status)
                              this.broadcastErrorCode = error.status;
                              this.showError = true;
                                  if(this.showError = true){
                                      window.scrollTo(0,0)
                                  }
                          }
                      })
  
         // this.displayDriverList.emit("displayDriverList");
         */
    };
    DriverEditComponent.prototype.onClickCancel = function () {
        // this.displayDriverList.emit("displayDriverList");
    };
    DriverEditComponent = __decorate([
        core_1.Component({
            selector: 'driver-edit',
            templateUrl: 'app/dashboard/features/drivers/driverEdit/driverEditTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], DriverEditComponent);
    return DriverEditComponent;
}());
exports.DriverEditComponent = DriverEditComponent;
