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
var TrailerMapComponent = (function () {
    // render something from service or outside this component
    function TrailerMapComponent() {
    }
    // render something initially 
    TrailerMapComponent.prototype.ngOnInit = function () {
        //this.callGoogleMap();
    };
    // render something on constant changes
    TrailerMapComponent.prototype.ngOnChanges = function () {
        console.log("selectedTrailerID..", this.selectedTrailerID);
        //this.callGoogleMap();
    };
    // call google map and display current location and truck route
    TrailerMapComponent.prototype.callGoogleMap = function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var truckCurrentLocation = { lat: 49.8998,
            lng: -97.1375 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: truckCurrentLocation
        });
        var truckCurrentLocationMarker = new google.maps.Marker({
            position: truckCurrentLocation,
            map: map,
            title: "I'm here !!",
            icon: 'external/images/truck-map2.png'
        });
        directionsDisplay.setMap(map);
        // this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TrailerMapComponent.prototype, "selectedTrailerID", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TrailerMapComponent.prototype, "trailerList", void 0);
    TrailerMapComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'trailer-map',
            templateUrl: 'app/dashboard/features/trailers/trailerMap/trailerMapTemplate.html',
            styleUrls: ['app/dashboard/features/trailers/trailerMap/trailerMapStyle.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TrailerMapComponent);
    return TrailerMapComponent;
}());
exports.TrailerMapComponent = TrailerMapComponent;
