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
var FleetFilterPipe = (function () {
    function FleetFilterPipe() {
    }
    /*transform(trucks: any[], args: any[]): any[] {
        console.log(args)
       let filter: any = args[0] ? args[0].toLocaleLowerCase() : null;
       
        return filter ? trucks.filter((truck: any) =>
        truck.fleetId.toLocaleLowerCase().indexOf(filter) !== -1): trucks;
    }*/
    FleetFilterPipe.prototype.transform = function (trucks, args) {
        // filter items array, items which match and return true will be kept, false will be filtered out
        if (!args) {
            return trucks;
        }
        else if (args) {
            // let filter = args ? args.toLocaleLowerCase() : null;
            return trucks.filter(function (truck) { return truck.fleetId.toLowerCase().indexOf(args) !== -1; });
        }
    };
    FleetFilterPipe = __decorate([
        core_1.Pipe({
            name: 'truckFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], FleetFilterPipe);
    return FleetFilterPipe;
}());
exports.FleetFilterPipe = FleetFilterPipe;
