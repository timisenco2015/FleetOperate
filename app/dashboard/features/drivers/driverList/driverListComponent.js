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
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
var driverService_1 = require('../driverService');
var forms_1 = require('@angular/forms');
var DriverListComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function DriverListComponent(_driverService, _formBuilder, elementRef) {
        this._driverService = _driverService;
        this._formBuilder = _formBuilder;
        this.elementRef = elementRef;
        this.showSummary = false;
        this.showGeneral = true;
        this.showLog = false;
        this.generalActive = true;
        this.logActive = false;
        this.showError = false;
        this.showRODS = false;
        this.hideFieldsInModal = true;
        this.createSendEmailForm();
        this.driverListView = true;
        this.driverEditView = false;
        this.closeHidden = false;
        this.driversearch = false;
        this.addNewDriverView = false;
        this.showLogView = false;
        this.notCompanyNameEdit = false;
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    DriverListComponent.prototype.ngOnInit = function () {
        this.getDrivers();
        this.userSelectedDates = [];
        this.showLogYesterday = false;
        this.showLogToday = false;
        this.showLogOneWeek = false;
        this.showLogTwoWeeks = false;
        this.clickToViewLogEvent = false;
    };
    // on update of info changes to implement
    DriverListComponent.prototype.ngOnChanges = function () {
    };
    DriverListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setFieldTableNotEditable();
        }, 2000);
    };
    DriverListComponent.prototype.ngAfterContentInit = function () {
    };
    DriverListComponent.prototype.getDrivers = function () {
        var _this = this;
        this.companyId = localStorage.getItem("token_2");
        this._driverService.getDrivers(this.companyId)
            .subscribe(function (response) {
            _this.fleetdrivers = response.json();
            _this.finalFleetdrivers = _this.fleetdrivers;
            console.log(" drivers:  ", _this.fleetdrivers);
            if (response.status == 200) {
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
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Options request Error : ", error.status);
        });
    };
    // on click of each driver in the driver summary list
    DriverListComponent.prototype.onClickEachDriver = function (driverData) {
        var _this = this;
        console.log("driverData..", driverData);
        this.sendDriverData = driverData;
        this.showLogView = true;
        this.clickToViewLogEvent = true;
        this.showSummary = false;
        setTimeout(function () {
            _this.showSummary = true;
        }, 100);
    };
    DriverListComponent.prototype.onClickGeneral = function () {
        this.showGeneral = true;
        this.showRODS = false;
        this.generalActive = true;
        this.logActive = false;
    };
    // this method will display the search criteria box
    DriverListComponent.prototype.searchDriver = function () {
        this.driverListView = true;
        this.driverEditView = false;
        this.closeHidden = false;
        this.addNewDriverView = false;
        if (this.driversearch) {
            this.driversearch = false;
        }
        else {
            this.driversearch = true;
        }
    };
    //this method is used to set the all the input field in all the table rows to be non editable and transparent
    DriverListComponent.prototype.setFieldTableNotEditable = function () {
        var index;
        for (index = 0; index < this.finalFleetdrivers.length; index++) {
            $('#driverTableOptions tr').eq(index).find('td').each(function () {
                $(this).css({ 'pointer-events': 'none' });
            });
        }
    };
    DriverListComponent.prototype.listDriver = function () {
        this.driverEditView = false;
        this.closeHidden = false;
        this.driversearch = false;
        this.driverListView = true;
        this.addNewDriverView = false;
    };
    DriverListComponent.prototype.addDriver = function (data) {
        var reponse;
        this.driverEditView = false;
        this.closeHidden = false;
        this.driversearch = false;
        this.driverListView = false;
        this.addNewDriverView = true;
    };
    //this method will change the display row in the drrivers table. The total number of rows display will depend on the
    // number selected by the user
    DriverListComponent.prototype.setTableListDisplay = function (value) {
        // var div =  this.elementRef.nativeElement.querySelector('#driverTable');
        // alert(div.find('tr'));
        var i;
        this.finalFleetdrivers = [];
        if (value == 0) {
            for (i = 0; i < this.fleetdrivers.length; i++) {
                this.finalFleetdrivers[i] = this.fleetdrivers[i];
            }
        }
        else {
            for (i = 0; i < this.fleetdrivers.length && i < value; i++) {
                this.finalFleetdrivers[i] = this.fleetdrivers[i];
            }
        }
    };
    DriverListComponent.prototype.onKeySearchId = function (driverSearchId) {
        var i;
        var j = 0;
        // alert(driverSearchId);
        this.finalFleetdrivers = null;
        this.finalFleetdrivers = [];
        for (i = 0; i < this.fleetdrivers.length; i++) {
            if (this.fleetdrivers[i]["driverId"].indexOf(driverSearchId) == 0) {
                this.finalFleetdrivers[j] = this.fleetdrivers[i];
                j++;
            }
        }
    };
    DriverListComponent.prototype.onKeySearchDriverName = function (searchDriverName) {
        var i;
        var j = 0;
        // alert(driverSearchId);
        this.finalFleetdrivers = null;
        this.finalFleetdrivers = [];
        for (i = 0; i < this.fleetdrivers.length; i++) {
            if (this.fleetdrivers[i]["firstName"].indexOf(searchDriverName) == 0 || this.fleetdrivers[i]["lastName"].indexOf(searchDriverName) == 0) {
                this.finalFleetdrivers[j] = this.fleetdrivers[i];
                j++;
            }
        }
    };
    DriverListComponent.prototype.onKeySearchLincNumber = function (searchLincNumber) {
        var i;
        var j = 0;
        // alert(driverSearchId);
        this.finalFleetdrivers = null;
        this.finalFleetdrivers = [];
        for (i = 0; i < this.fleetdrivers.length; i++) {
            if (this.fleetdrivers[i]["licenseNumber"].indexOf(searchLincNumber) == 0) {
                this.finalFleetdrivers[j] = this.fleetdrivers[i];
                j++;
            }
        }
    };
    DriverListComponent.prototype.getDateRangeArrays = function (days) {
        var i;
        for (i = 0; i < days; i++) {
            var currentDate = new Date();
            var dateRange = new Date();
            dateRange.setDate(currentDate.getDate() - i);
            this.userSelectedDates[i] = dateRange;
        }
    };
    DriverListComponent.prototype.createSendEmailForm = function () {
        this.sendEmailForm = this._formBuilder.group({
            'emailId': [],
            'subject': [],
            'body': [],
            'fromDate': [],
            'toDate': [],
            'driverId': [],
            'month': []
        });
    };
    DriverListComponent.prototype.onClickEmail = function () {
        console.log("onClickEmail is called..", this.sendDriverData.driverId);
        this.driverId = this.sendDriverData.driverId;
        var currentDate = new Date();
        //  this.fromDate = currentDate;
    };
    DriverListComponent.prototype.onClickEmailSend = function (emailData) {
        console.log("onClickEmailSend ..", emailData);
    };
    DriverListComponent.prototype.onClickEdit = function (index) {
        if (this.notCompanyNameEdit) {
            $('#driverTableOptions tr').eq(index).find('td').each(function () {
                $(this).css({ 'pointer-events': 'none' });
            });
            this.notCompanyNameEdit = false;
        }
        else {
            $('#driverTableOptions tr').eq(index).find('td').each(function () {
                $(this).css({ 'pointer-events': 'all' });
            });
            this.notCompanyNameEdit = true;
        }
    };
    DriverListComponent.prototype.onClickDelete = function (iindex) {
    };
    DriverListComponent.prototype.onClickEditDriver = function (driverId) {
        console.log("onClickEditTruck clicked: ", driverId);
        /*    this._truckSettingService.getTruckToEdit(fleetId)
                .subscribe(
                truck => {
                        console.log("truck to edit: ", truck.json());
                        if(truck.status == 200){
                            this.displayEditForm.emit({truckId: fleetId, truckDetail:truck.json()});
                        }else{
                            this.broadcastErrorCode = truck.status;
                            this.showError = true;
                                if(this.showError = true){
                                    window.scrollTo(0,0)
                                }
                        }
                    }
                )
                */
    };
    DriverListComponent.prototype.onClickViewDriverList = function () {
        this.driverListView = true;
        this.driverEditView = false;
        this.closeHidden = false;
    };
    DriverListComponent = __decorate([
        core_1.Component({
            selector: 'driver-list',
            templateUrl: 'app/dashboard/features/drivers/driverList/driverListTemplate.html',
        }), 
        __metadata('design:paramtypes', [driverService_1.DriverService, forms_1.FormBuilder, core_1.ElementRef])
    ], DriverListComponent);
    return DriverListComponent;
}());
exports.DriverListComponent = DriverListComponent;
