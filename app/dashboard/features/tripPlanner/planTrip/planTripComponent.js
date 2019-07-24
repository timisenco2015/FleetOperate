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
var fleetListService_1 = require('../../fleet/fleetList/fleetListService');
var trailerListService_1 = require('../../trailers/trailerList/trailerListService');
//import {DriverService} from '../../drivers/driverList/driverListService';
var driverService_1 = require('../../drivers/driverService');
var tripPlannerService_1 = require('../tripPlannerService');
var PlanTripComponent = (function () {
    function PlanTripComponent(_formBuilder, _fleetService, _trailerService, _driverService, tripPlannerService) {
        this._formBuilder = _formBuilder;
        this._fleetService = _fleetService;
        this._trailerService = _trailerService;
        this._driverService = _driverService;
        this.tripPlannerService = tripPlannerService;
        this.enableTruckModalOkButton = false;
        this.trailersDetails = [];
        this.addTrailers = false;
        this.driversDetails = [];
        this.fileList = [];
        // trailerID: Control[];
        this.showError = false;
        this.showAddConsignment = false;
        this.createTripInfoMessage = false;
        this.disableAddConsignmentButton = false;
        this.disableCreateTripButton = false;
        this.showPlanTrip = true;
        this.companyId = localStorage.getItem("token_2");
        this.planATripForm();
        this.consignmentFormInitiation();
        console.log("plan a trip constructor executed");
    }
    PlanTripComponent.prototype.ngOnInit = function () {
        console.log("planATrip ngOnInit executed");
    };
    PlanTripComponent.prototype.ngOnChanges = function () {
        this.planTripForm;
    };
    PlanTripComponent.prototype.planATripForm = function () {
        this.planTripForm = this._formBuilder.group({
            startDate: this._formBuilder.control(null),
            endDate: this._formBuilder.control(null),
            source: this._formBuilder.control(null),
            destination: this._formBuilder.control(null),
            fleetId: this._formBuilder.control(null),
            trailersDetails: new forms_1.FormArray([]),
            driversDetails: new forms_1.FormArray([])
        });
        console.log("planATripForm executed");
    };
    PlanTripComponent.prototype.addTruck = function () {
        var _this = this;
        console.log("addTruck executed");
        this._fleetService.getFleets()
            .subscribe(function (fleets) {
            _this.trucks = fleets.json();
        }, function (error) { return _this.errorMessage = error; });
    };
    // onSelectingTruck
    PlanTripComponent.prototype.onSelectingTruck = function (truckId, truckNumber) {
        return truckId && truckNumber;
    };
    // sendTruckData to truck details table
    PlanTripComponent.prototype.sendTruckData = function (truckId) {
        this.truckDetails = truckId;
        console.log('truckId:..', this.truckDetails);
    };
    PlanTripComponent.prototype.addTrailer = function () {
        var _this = this;
        this._trailerService.getTrailer()
            .subscribe(function (trailer) {
            _this.trailers = trailer.json();
            console.log('trailers are:..', _this.trailers);
        }, function (error) { return _this.errorMessage = error; });
    };
    PlanTripComponent.prototype.onSelectingTrailer = function (trailerId) {
        return trailerId;
    };
    PlanTripComponent.prototype.sendTrailerData = function (trailerId) {
        console.log('selected trailer ID are:..', trailerId);
        this.addTrailers = true;
        // this.trailersDetails.push( trailerId);
        this.planTripForm.controls['trailersDetails'].push(this._formBuilder.group({
            fleetId: this._formBuilder.control(trailerId)
        }));
    };
    PlanTripComponent.prototype.removeTrailer = function (trailerId) {
        var deleteTrailer = this.planTripForm.controls['trailersDetails'].controls;
        for (var i = 0; i < deleteTrailer.length; i++) {
            console.log("each consignment", trailerId);
            if (deleteTrailer[i] == trailerId) {
                console.log("consignment to remove", deleteTrailer[i]);
                deleteTrailer.splice(i, 1);
                this.planTripForm.controls['trailersDetails'].updateValueAndValidity();
                break;
            }
        }
    };
    PlanTripComponent.prototype.addDriver = function () {
        var _this = this;
        this._driverService.getDrivers(this.companyId)
            .subscribe(function (driver) {
            _this.drivers = driver.json();
            console.log("getDrivers + companyId", _this.companyId);
            console.log("drivers", _this.drivers);
        }, function (error) { return _this.errorMessage = error; });
    };
    PlanTripComponent.prototype.onSelectingDriver = function (driverId) {
        return driverId;
    };
    PlanTripComponent.prototype.sendDriverData = function (driverId) {
        this.addDrivers = true;
        this.planTripForm.controls['driversDetails'].push(this._formBuilder.group({
            driverId: this._formBuilder.control(driverId)
        }));
        //this.driversDetails.push(driverId);
        /* this.driversDetails.forEach((value, index) => {
             this.planTripForm.addControl('driverID' + index, new Control())
         })*/
    };
    PlanTripComponent.prototype.removeDriver = function (driverId) {
        var deleteDriver = this.planTripForm.controls['driversDetails'].controls;
        for (var i = 0; i < deleteDriver.length; i++) {
            console.log("each consignment", driverId);
            if (deleteDriver[i] == driverId) {
                console.log("consignment to remove", deleteDriver[i]);
                deleteDriver.splice(i, 1);
                this.planTripForm.controls['driversDetails'].updateValueAndValidity();
                break;
            }
        }
        /*var index = this.driversDetails.indexOf(driverId);
        this.driversDetails.splice(index, 1)*/
    };
    PlanTripComponent.prototype.consignmentFormInitiation = function () {
        this.consignmentForm = this._formBuilder.group({
            tripId: this._formBuilder.control(null),
            consignmentId: this._formBuilder.control(null),
            consignmentType: this._formBuilder.control(null),
            source: this._formBuilder.control(null),
            destination: this._formBuilder.control(null),
            pickUpDate: this._formBuilder.control(null),
            deliveryDate: this._formBuilder.control(null),
            fileName: this._formBuilder.control(null),
        });
    };
    PlanTripComponent.prototype.consignmentFormReset = function () {
        this.consignmentForm.reset();
    };
    PlanTripComponent.prototype.onClickAddConsignment = function () {
        if (this.tripId != null) {
            this.showAddConsignment = true;
            this.createTripInfoMessage = false;
            this.disableAddConsignmentButton = true;
        }
        else {
            this.createTripInfoMessage = true;
            this.showAddConsignment = false;
            this.disableAddConsignmentButton = false;
        }
    };
    PlanTripComponent.prototype.onSelectDocument = function (event) {
        this.fileList = event.target.files;
        console.log("file: ", this.fileList);
        for (var i = 0; i < this.fileList.length; i++) {
            var file = this.fileList[i];
            console.log("files are: ", file);
            this.fileName = file.name;
        }
    };
    PlanTripComponent.prototype.onClickPlanTripSaveButton = function (planTripFormData) {
        var _this = this;
        console.log("planTripFormData is:..", this.planTripForm.value);
        var body = JSON.stringify({ planTripFormData: planTripFormData });
        console.log("JSON planTripFormData is:..", body);
        this.tripPlannerService.createTrip(planTripFormData)
            .subscribe(function (trip) {
            var response = trip;
            console.log("response:..", response);
            if (response.status == 200) {
                _this.tripId = response._body;
                _this.disableCreateTripButton = true;
            }
        }, function (error) {
            _this.errorMessage = error;
            console.log("errorMessage:..", _this.errorMessage);
            if (_this.errorMessage != null) {
                _this.broadcastPlanTripError = _this.errorMessage.status;
                _this.showError = true;
            }
            else {
                _this.showError = false;
            }
        });
        console.log("sent trip");
        /*this.tripPlannerService.createTrip(this.planTripForm.value)
                .subscribe(
                   ()  => {
                            console.log("documents:.. sent");
                    }
                );

                this.tripPlannerService.progress
            .subscribe(
            data => {
                console.log('progress = ' + data + '%');
            })*/
        //this.planATripForm();
    };
    PlanTripComponent.prototype.onClickAddConsignmentSaveButton = function (consignmentFormData) {
        var _this = this;
        console.log("consignmentFormData is:..", consignmentFormData);
        this.tripPlannerService.addConsignment(consignmentFormData, this.fileList)
            .subscribe(function (response) {
            console.log("consignment:.. sent", response);
            console.log("server response in compoenet:..", _this.tripPlannerService.addConsignmentResponse);
            if (response != null) {
                /*this.showAddConsignment = false;
                   setTimeout(() => {
                      // this.fileName = [];
                      // this.fleetId = [];
                      // this.consignmentFormInitiation();
                      this.consignmentFormReset();
                       
                   });
                   this.showAddConsignment = true;*/
                _this.consignmentFormReset();
                setTimeout(function () {
                    _this.tripId = response;
                }, 0.5);
                console.log("consignment:..response._body..", _this.tripId);
            }
        });
        /* this.tripPlannerService.progress
     .subscribe(
     data => {
         console.log('progress = ' + data + '%');
         console.log("server response in compoenet:..", this.tripPlannerService.addConsignmentResponse);
         
     })*/
    };
    PlanTripComponent.prototype.onClickSaveTripButton = function () {
        var _this = this;
        this.tripId = null;
        this.startDate = null;
        this.endDate = null;
        this.source = null;
        this.destination = null;
        this.showPlanTrip = false;
        setTimeout(function () {
            _this.planATripForm();
            _this.consignmentFormInitiation();
            _this.showPlanTrip = true;
        });
        this.disableCreateTripButton = false;
        this.onClickAddConsignment();
    };
    PlanTripComponent = __decorate([
        core_1.Component({
            selector: 'plan-trip',
            templateUrl: 'app/dashboard/features/tripPlanner/planTrip/planTripTemplate.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, fleetListService_1.FleetService, trailerListService_1.TrailerService, driverService_1.DriverService, tripPlannerService_1.TripPlannerService])
    ], PlanTripComponent);
    return PlanTripComponent;
}());
exports.PlanTripComponent = PlanTripComponent;
