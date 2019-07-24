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
var tripPlannerService_1 = require('../../tripPlannerService');
var fleetListService_1 = require('../../../fleet/fleetList/fleetListService');
var trailerListService_1 = require('../../../trailers/trailerList/trailerListService');
var driverListService_1 = require('../../../drivers/driverList/driverListService');
var EditCurrentTripComponent = (function () {
    function EditCurrentTripComponent(_formBuilder, tripPlannerService, _fleetService, _trailerService, _driverService) {
        this._formBuilder = _formBuilder;
        this.tripPlannerService = tripPlannerService;
        this._fleetService = _fleetService;
        this._trailerService = _trailerService;
        this._driverService = _driverService;
        this.initialTruckNameValueDisplay = true;
        this.trailersDetails = [];
        this.driversDetails = [];
        this.editConsignment = false;
        this.showUploadDoc = false;
        this.createTripDetailsForm();
        this.consignmentEditFormInitiation();
    }
    EditCurrentTripComponent.prototype.createTripDetailsForm = function () {
        this.editTripForm = this._formBuilder.group({
            //companyId: this._formBuilder.control(6),
            startDate: this._formBuilder.control(null),
            endDate: this._formBuilder.control(null),
            source: this._formBuilder.control(null),
            destination: this._formBuilder.control(null),
            truckId: this._formBuilder.control(null),
            trailersDetails: new forms_1.FormArray([]),
            driversDetails: new forms_1.FormArray([])
        });
    };
    EditCurrentTripComponent.prototype.ngOnInit = function () {
        this.loadConsignmentInfoToEdit();
    };
    EditCurrentTripComponent.prototype.ngOnChanges = function () {
    };
    EditCurrentTripComponent.prototype.loadConsignmentInfoToEdit = function () {
        console.log(" selectedTripID:  ", this.selectedTripID);
        console.log(" tripList:  ", this.tripList);
        for (var i = 0; i < this.tripList.length; i++) {
            var editData = this.tripList[i];
            console.log(" fleet summary ID:  ", editData.tripId);
            if (editData.tripId == this.selectedTripID) {
                this.tripDetails = editData;
                this.tripId = this.tripDetails.tripId;
                // iterate trailer Ids and display the values initially for editing
                for (var i = 0; i < this.tripDetails.trailersDetails.length; i++) {
                    var trailersInfo = this.tripDetails.trailersDetails[i];
                    console.log("trailersInfo is:  ", trailersInfo);
                    this.editTripForm.controls['trailersDetails'].push(this._formBuilder.group({
                        trailerId: this._formBuilder.control(trailersInfo.trailerID)
                    }));
                }
                // iterate driver Ids and display the values initially for editing
                for (var i = 0; i < this.tripDetails.driversDetails.length; i++) {
                    var driversInfo = this.tripDetails.driversDetails[i];
                    this.editTripForm.controls['driversDetails'].push(this._formBuilder.group({
                        driverId: this._formBuilder.control(driversInfo.driverID)
                    }));
                }
                console.log("tripDetails is:  ", this.tripDetails);
                break;
            }
            else {
                this.tripDetails = null;
            }
        }
    };
    EditCurrentTripComponent.prototype.addTruck = function () {
        var _this = this;
        this._fleetService.getFleets()
            .subscribe(function (fleets) {
            _this.trucks = fleets;
        }, function (error) { return _this.errorMessage = error; });
    };
    // onSelectingTruck
    EditCurrentTripComponent.prototype.onSelectingTruck = function (truckId) {
        return truckId;
    };
    // sendTruckData to truck details table
    EditCurrentTripComponent.prototype.sendTruckData = function (truckId) {
        this.initialTruckNameValueDisplay = false;
        console.log(" fleet ID 111:  ", truckId);
        this.truckID = truckId;
        console.log(" fleet ID 222:  ", this.truckID);
    };
    EditCurrentTripComponent.prototype.addTrailer = function () {
        var _this = this;
        this._trailerService.getTrailer()
            .subscribe(function (trailer) {
            _this.trailers = trailer;
            console.log('trailers are:..', _this.trailers);
        }, function (error) { return _this.errorMessage = error; });
    };
    EditCurrentTripComponent.prototype.onSelectingTrailer = function (trailerId) {
        return trailerId;
    };
    EditCurrentTripComponent.prototype.sendTrailerData = function (trailerId) {
        console.log('selected trailer ID are:..', trailerId);
        this.editTripForm.controls['trailersDetails'].push(this._formBuilder.group({
            trailerId: this._formBuilder.control(trailerId)
        }));
    };
    EditCurrentTripComponent.prototype.removeTrailer = function (trailerId) {
        var deleteTrailer = this.editTripForm.controls['trailersDetails'].controls;
        for (var i = 0; i < deleteTrailer.length; i++) {
            console.log("each consignment", trailerId);
            if (deleteTrailer[i] == trailerId) {
                console.log("consignment to remove", deleteTrailer[i]);
                deleteTrailer.splice(i, 1);
                this.editTripForm.controls['trailersDetails'].updateValueAndValidity();
                break;
            }
        }
    };
    EditCurrentTripComponent.prototype.addDriver = function () {
        var _this = this;
        this._driverService.getDrivers()
            .subscribe(function (driver) {
            _this.drivers = driver;
        }, function (error) { return _this.errorMessage = error; });
    };
    EditCurrentTripComponent.prototype.onSelectingDriver = function (driverId) {
        return driverId;
    };
    EditCurrentTripComponent.prototype.sendDriverData = function (driverId) {
        this.editTripForm.controls['driversDetails'].push(this._formBuilder.group({
            driverId: this._formBuilder.control(driverId)
        }));
    };
    EditCurrentTripComponent.prototype.removeDriver = function (driverId) {
        var deleteDriver = this.editTripForm.controls['driversDetails'].controls;
        for (var i = 0; i < deleteDriver.length; i++) {
            console.log("each consignment", driverId);
            if (deleteDriver[i] == driverId) {
                console.log("consignment to remove", deleteDriver[i]);
                deleteDriver.splice(i, 1);
                this.editTripForm.controls['driversDetails'].updateValueAndValidity();
                break;
            }
        }
    };
    EditCurrentTripComponent.prototype.onClickTripSave = function (editedTripDetails) {
        console.log("editedTripDetails:.. ", editedTripDetails);
    };
    EditCurrentTripComponent.prototype.consignmentEditFormInitiation = function () {
        this.consignmentEditForm = this._formBuilder.group({
            tripId: this._formBuilder.control(this.tripId),
            consignmentId: this._formBuilder.control(null),
            consignmentType: this._formBuilder.control(null),
            source: this._formBuilder.control(null),
            destination: this._formBuilder.control(null),
            pickUpDate: this._formBuilder.control(null),
            deliveryDate: this._formBuilder.control(null),
            fileName: this._formBuilder.control(null),
        });
    };
    EditCurrentTripComponent.prototype.onClickEditConsignment = function (consignmentID, consignment) {
        this.editConsignment = true;
        console.log("onClickEditConsignment:..: consignmentID ", consignmentID);
        console.log("onClickEditConsignment:..: consignment ", consignment);
        this.consignmentDetails = consignment;
        console.log("consignmentDetails:.. ", this.consignmentDetails);
        /* for(var i = 0; i < consignment.length; i++) {
 
             if(consignment[i] == consignmentID) {
                 this.consignmentDetails = consignment[i];
                 console.log("consignmentDetails:.. ", this.consignmentDetails)
                 break;
             }else{
                 this.consignmentDetails = null;
             }
         }*/
    };
    EditCurrentTripComponent.prototype.onClickEditedConsignmentSaveButton = function (editedConsignmentDetails) {
        console.log("editedConsignmentDetails:.. ", this.consignmentEditForm.value);
    };
    EditCurrentTripComponent.prototype.onClickConsignmentEditCancel = function () {
        this.editConsignment = false;
        //this.ngOnInit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditCurrentTripComponent.prototype, "selectedTripID", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EditCurrentTripComponent.prototype, "tripList", void 0);
    EditCurrentTripComponent = __decorate([
        core_1.Component({
            selector: 'edit-current-trip',
            templateUrl: 'app/dashboard/features/tripPlanner/currentTrip/editCurrentTrip/editCurrentTripTemplate.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, tripPlannerService_1.TripPlannerService, fleetListService_1.FleetService, trailerListService_1.TrailerService, driverListService_1.DriverService])
    ], EditCurrentTripComponent);
    return EditCurrentTripComponent;
}());
exports.EditCurrentTripComponent = EditCurrentTripComponent;
