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
var tripPlannerService_1 = require('../tripPlannerService');
var CompleteTripComponent = (function () {
    function CompleteTripComponent(_tripPlannerService) {
        this._tripPlannerService = _tripPlannerService;
        this.showSummary = false;
    }
    CompleteTripComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._tripPlannerService.getCompletedTrips()
            .subscribe(function (currentTrip) {
            _this.completeTrips = currentTrip.json();
        }, function (error) { return _this.errorMessage = error; });
    };
    CompleteTripComponent.prototype.ngOnChanges = function () {
    };
    CompleteTripComponent.prototype.onSelect = function (currentTrip) {
        for (var i = 0; i < this.completeTrips.length; i++) {
            var summaryData = this.completeTrips[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.tripId == currentTrip.tripId) {
                this.completeTripSummary = summaryData;
                console.log("completeTripSummary is:  ", this.completeTripSummary);
                break;
            }
        }
        this.showSummary = true;
    };
    CompleteTripComponent = __decorate([
        core_1.Component({
            selector: 'complete-trip',
            templateUrl: 'app/dashboard/features/tripPlanner/completedTrip/completedTripTemplate.html'
        }), 
        __metadata('design:paramtypes', [tripPlannerService_1.TripPlannerService])
    ], CompleteTripComponent);
    return CompleteTripComponent;
}());
exports.CompleteTripComponent = CompleteTripComponent;
