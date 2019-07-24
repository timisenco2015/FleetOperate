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
var DriverMapComponent = (function () {
    function DriverMapComponent() {
        this.appId = 'BFqkMiSS8Dm01YE4LW5k';
        this.appCode = 'JxvRX7RSa5Lx1G61fD1m2Q';
    }
    DriverMapComponent.prototype.ngOnInit = function () {
    };
    DriverMapComponent.prototype.ngOnChanges = function () {
        console.log("driverData in driver map..", this.driverData);
        this.callHereMap();
    };
    // call Here map
    DriverMapComponent.prototype.callHereMap = function () {
        var platform = new H.service.Platform({
            'app_id': this.appId,
            'app_code': this.appCode
        });
        // Obtain the default map types from the platform object:
        var defaultLayers = platform.createDefaultLayers();
        var truckCurrentLocation = { lat: this.driverData.driverLocationInfo.latitude,
            lng: this.driverData.driverLocationInfo.longitude };
        // Instantiate (and display) a map object:
        var map = new H.Map(document.getElementById('map'), defaultLayers.normal.map, {
            zoom: 8,
            center: truckCurrentLocation
        });
        //Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        // Create a marker icon from an image URL:
        var icon = new H.map.Icon('external/images/truck-map2.png');
        // Create a marker using the previously instantiated icon:
        var marker = new H.map.Marker(truckCurrentLocation, { icon: icon });
        // Add the marker to the map:
        map.addObject(marker);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DriverMapComponent.prototype, "driverData", void 0);
    DriverMapComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'driverMap',
            templateUrl: 'app/dashboard/features/drivers/driverMap/driverMapTemplate.html',
            styleUrls: ['app/dashboard/features/drivers/driverMap/driverMapStyle.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DriverMapComponent);
    return DriverMapComponent;
}());
exports.DriverMapComponent = DriverMapComponent;
