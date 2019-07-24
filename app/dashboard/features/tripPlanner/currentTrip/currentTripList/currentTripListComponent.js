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
var tripPlannerService_1 = require('../../tripPlannerService');
var CurrentTripListComponent = (function () {
    function CurrentTripListComponent(_tripPlannerService) {
        this._tripPlannerService = _tripPlannerService;
        this.currentTrips = [];
        this.showSummary = false;
        this.displayEditTrip = new core_1.EventEmitter();
    }
    CurrentTripListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._tripPlannerService.getCurrentTrips()
            .subscribe(function (currentTrip) {
            _this.currentTrips = currentTrip.json();
            console.log("currentTrips are:  ", _this.currentTrips);
        }, function (error) { return _this.errorMessage = error; });
    };
    CurrentTripListComponent.prototype.ngOnChanges = function () {
    };
    CurrentTripListComponent.prototype.onSelect = function (currentTrip) {
        for (var i = 0; i < this.currentTrips.length; i++) {
            var summaryData = this.currentTrips[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.tripId == currentTrip.tripId) {
                this.currentTripSummary = summaryData;
                console.log("current trip summary is:  ", this.currentTripSummary);
                break;
            }
        }
        this.showSummary = true;
    };
    CurrentTripListComponent.prototype.editTrip = function (tripId) {
        this.displayEditTrip.emit({ tripId: tripId, tripList: this.currentTrips });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CurrentTripListComponent.prototype, "displayEditTrip", void 0);
    CurrentTripListComponent = __decorate([
        core_1.Component({
            selector: 'current-trip-list',
            templateUrl: 'app/dashboard/features/tripPlanner/currentTrip/currentTripList/currentTripListTemplate.html'
        }), 
        __metadata('design:paramtypes', [tripPlannerService_1.TripPlannerService])
    ], CurrentTripListComponent);
    return CurrentTripListComponent;
}());
exports.CurrentTripListComponent = CurrentTripListComponent;
