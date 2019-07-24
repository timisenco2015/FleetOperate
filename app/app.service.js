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
var AppService = (function () {
    function AppService() {
        //private hostName: string = "http://localhost:8083/"
        //private hostName: string = "http://AppTest-FleetOpsAPI.us-east-1.elasticbeanstalk.com/"
        this.hostName = "http://QA-Test-JFS-PlatformService.us-east-1.elasticbeanstalk.com/";
        // Login URL
        this.loginUrl = this.hostName + "fleetops/login";
        // Fleet URL
        this.fleetUrl = this.hostName + "fleetops/truck";
        // Trailer URL
        this.trailerUrl = this.hostName + "fleetops/trailer";
        // Driver URL
        this.driverUrl = this.hostName + "fleetops/driver";
        // TripPlanner URL
        this.tripPlannerUrl = this.hostName + "fleetops/tripPlanner";
        // Control Center URL
        this.controlCenterUrl = this.hostName + "fleetops/controlCenter";
        // Company URL
        this.companyUrl = this.hostName + "fleetops/";
        // List of Features
        this.listOfFeaturesUrl = this.hostName + "fleetops/listOfFeatures";
        // Confirm User (Get app client info from DB)
        this.appClientInfo = this.hostName + "fleetops/appClientInfo";
    }
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
