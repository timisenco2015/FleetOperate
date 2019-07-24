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
var FleetSummaryComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function FleetSummaryComponent() {
    }
    // render something initially 
    FleetSummaryComponent.prototype.ngOnInit = function () {
        //this.callGoogleMap();
    };
    // render truck summary on constant changes
    FleetSummaryComponent.prototype.ngOnChanges = function () {
        console.log(this.selectedTruckID);
        console.log("list recevied...", this.truckList);
        for (var i = 0; i < this.truckList.length; i++) {
            var summaryData = this.truckList[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (summaryData.fleetId == this.selectedTruckID.fleetId) {
                this.fleetSummary = summaryData;
                console.log("fleet summary is:  ", this.fleetSummary);
                /*this.lat = this.fleetSummary.location.lat;
                this.lng = this.fleetSummary.location.lng;*/
                break;
            }
            else {
                this.fleetSummary = null;
            }
        }
        this.callGoogleMap();
    };
    // call google map and display current location and truck route
    FleetSummaryComponent.prototype.callGoogleMap = function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var truckCurrentLocation = { lat: this.fleetSummary.currentLocation.latitude,
            lng: this.fleetSummary.currentLocation.longitude };
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
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    // calculate and display truck route
    FleetSummaryComponent.prototype.calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
        var waypts = [];
        var locationsArray = this.fleetSummary.waypoints;
        console.log("waypoints:  ", locationsArray);
        for (var i = 0; i < locationsArray.length; i++) {
            console.log("locationsArray is:  ", locationsArray[i]);
            var waypoint = locationsArray[i];
            console.log("waypoint is:  ", waypoint.latitude);
            waypts.push({
                location: new google.maps.LatLng(waypoint.latitude, waypoint.longitude),
                stopover: true
            });
        }
        directionsService.route({
            origin: { lat: this.fleetSummary.origin.latitude,
                lng: this.fleetSummary.origin.longitude },
            destination: { lat: this.fleetSummary.destination.latitude,
                lng: this.fleetSummary.destination.longitude },
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FleetSummaryComponent.prototype, "selectedTruckID", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FleetSummaryComponent.prototype, "truckList", void 0);
    FleetSummaryComponent = __decorate([
        core_1.Component({
            // moduleId: module.id,
            selector: 'fleetSummary',
            templateUrl: 'app/dashboard/features/fleet/fleetSummary/fleetSummaryTemplate.html',
            styleUrls: ['app/dashboard/features/fleet/fleetSummary/mapStyle.css']
        }), 
        __metadata('design:paramtypes', [])
    ], FleetSummaryComponent);
    return FleetSummaryComponent;
}());
exports.FleetSummaryComponent = FleetSummaryComponent;
//# sourceMappingURL=fleetSummaryComponent.js.map