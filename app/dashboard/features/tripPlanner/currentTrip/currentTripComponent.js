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
var CurrentTripComponent = (function () {
    function CurrentTripComponent() {
    }
    CurrentTripComponent.prototype.ngOnInit = function () {
        this.displayCurrentTripList();
    };
    CurrentTripComponent.prototype.ngOnChanges = function () {
        this.displayCurrentTripList();
    };
    CurrentTripComponent.prototype.displayCurrentTripList = function () {
        this.showCurrentTripList = true;
        this.showCurrentTripEdit = false;
        this.showAddConsignmentForCurrentTrip = false;
    };
    CurrentTripComponent.prototype.onDisplayEditTrip = function ($event) {
        this.showCurrentTripList = false;
        this.showCurrentTripEdit = true;
        this.showAddConsignmentForCurrentTrip = false;
        this.broadcastTripID = $event.tripId;
        this.sendTripList = $event.tripList;
    };
    CurrentTripComponent.prototype.displayAddConsignmnet = function () {
        this.showCurrentTripList = false;
        this.showCurrentTripEdit = false;
        this.showAddConsignmentForCurrentTrip = true;
    };
    CurrentTripComponent = __decorate([
        core_1.Component({
            selector: 'current-trip',
            templateUrl: 'app/dashboard/features/tripPlanner/currentTrip/currentTripTemplate.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CurrentTripComponent);
    return CurrentTripComponent;
}());
exports.CurrentTripComponent = CurrentTripComponent;
