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
var NonsubscribedServiceComponent = (function () {
    function NonsubscribedServiceComponent() {
    }
    NonsubscribedServiceComponent.prototype.ngOnInit = function () {
        this.displayMessage();
    };
    NonsubscribedServiceComponent.prototype.ngOnChanges = function () {
    };
    NonsubscribedServiceComponent.prototype.displayMessage = function () {
        this.message = "Sorry, this feature is currently not subscribed in your service package. " + '\n' +
            "Please contact customer service for more details.";
    };
    NonsubscribedServiceComponent = __decorate([
        core_1.Component({
            selector: 'service-unavailable',
            templateUrl: 'app/nonsubscribedServiceHandler/nonsubscribedServiceTemplate.html'
        }), 
        __metadata('design:paramtypes', [])
    ], NonsubscribedServiceComponent);
    return NonsubscribedServiceComponent;
}());
exports.NonsubscribedServiceComponent = NonsubscribedServiceComponent;
