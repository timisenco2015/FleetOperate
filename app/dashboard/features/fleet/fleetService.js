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
var FleetService = (function () {
    function FleetService() {
    }
    FleetService.prototype.getFleet = function () {
        return [
            {
                "iD": 1,
                // "label": "label-success",
                "status": "Running",
                "baseLocation": "Winnipeg",
                "destination": "WPG",
                "alerts": "Nothing"
            },
            {
                "iD": 2,
                //  "label": "label-warning",
                "status": 'Waiting',
                "baseLocation": "Calgary",
                "destination": 'WPG',
                "alerts": 'Stalled'
            },
            {
                "iD": 3,
                //    "label": "label-danger",
                "status": 'Stopped',
                "baseLocation": "Winnipeg",
                "destination": 'CAL',
                "alerts": 'Nothing'
            },
            {
                "iD": 4,
                //    "label": "label-danger",
                "status": 'Stopped',
                "baseLocation": "Winnipeg",
                "destination": 'TOR',
                "alerts": 'Nothing'
            },
            {
                "iD": 5,
                //   "label": "label-success",
                "status": 'Running',
                "baseLocation": "Winnipeg",
                "destination": 'MON',
                "alerts": 'Nothing'
            },
        ];
    };
    FleetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FleetService);
    return FleetService;
}());
exports.FleetService = FleetService;
//# sourceMappingURL=fleetService.js.map