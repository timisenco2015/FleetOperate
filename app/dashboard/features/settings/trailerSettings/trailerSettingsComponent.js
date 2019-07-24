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
var TrailerSettingsComponent = (function () {
    function TrailerSettingsComponent() {
        this.trailerListDisplay = true;
    }
    TrailerSettingsComponent.prototype.ngOnInit = function () {
    };
    TrailerSettingsComponent.prototype.ngOnChanges = function () {
    };
    TrailerSettingsComponent.prototype.onClickTrailerList = function () {
        this.trailerListDisplay = true;
        this.trailerAddDisplay = false;
        this.trailerEditDisplay = false;
    };
    TrailerSettingsComponent.prototype.onClickAddTrailer = function () {
        this.trailerListDisplay = false;
        this.trailerAddDisplay = true;
        this.trailerEditDisplay = false;
    };
    TrailerSettingsComponent.prototype.onDisplayEditForm = function ($event) {
        this.trailerListDisplay = false;
        this.trailerAddDisplay = false;
        this.trailerEditDisplay = true;
        this.broadcastTrailerID = $event.trailerId;
        this.sendTrailerToEdit = $event.trailerDetail;
    };
    TrailerSettingsComponent.prototype.onDisplayTrailerList = function () {
        this.onClickTrailerList();
    };
    TrailerSettingsComponent.prototype.onClickSearchTrailer = function () {
        this.trailerSearchBarDisplay = !this.trailerSearchBarDisplay;
    };
    TrailerSettingsComponent = __decorate([
        core_1.Component({
            selector: 'trailer-settings',
            templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsTemplate.html',
        }), 
        __metadata('design:paramtypes', [])
    ], TrailerSettingsComponent);
    return TrailerSettingsComponent;
}());
exports.TrailerSettingsComponent = TrailerSettingsComponent;
