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
//import {FleetListComponent} from '../dashboard/features/fleet/fleetList/fleetListComponent';
var common_1 = require('@angular/common');
var fleetOperateService_1 = require('./fleetOperateService');
var router_1 = require('@angular/router');
var FleetOperateComponent = (function () {
    function FleetOperateComponent(fleetOperateService, activatedRoute, location, router) {
        this.fleetOperateService = fleetOperateService;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.router = router;
    }
    FleetOperateComponent.prototype.ngOnInit = function () {
        this.showHomeActive = false;
        this.showCompanyActive = true;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
        this.showOnDriverViewClicked = false;
        this.showDriverSearch = false;
        this.showDashBoardOptions = true;
    };
    FleetOperateComponent.prototype.ngOnChanges = function () {
    };
    FleetOperateComponent.prototype.highlightDashBoardOptions = function (index) {
        var i;
        $('ul li').each(function (i) {
            if (i == index && index == 1) {
            }
            if (i == index) {
                $(this).css("background-color", "#003171", "width", "100%");
            }
            else {
                $(this).css("background-color", "");
            }
        });
    };
    FleetOperateComponent.prototype.showMobileBarOptions = function () {
        if (this.showDashBoardOptions) {
            this.showDashBoardOptions = false;
        }
        else {
            this.showDashBoardOptions = true;
        }
    };
    FleetOperateComponent.prototype.onClickComapnyView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showHomeActive = false;
        this.showDashBoardOptions = true;
        this.showDriverSearch = false;
        this.showOnDriverViewClicked = false;
        this.showCompanyActive = true;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickHomeView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showHomeActive = true;
        this.showDashBoardOptions = true;
        this.showDriverSearch = false;
        this.showCompanyActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickTruckView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showCompanyActive = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showDriverSearch = false;
        this.showOnDriverViewClicked = false;
        this.showTrucksActive = true;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickTrailerView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showDriverSearch = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showCompanyActive = false;
        this.showOnDriverViewClicked = false;
        this.showTrucksActive = false;
        this.showTrailersActive = true;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickDriverView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showDriverSearch = true;
        this.showCompanyActive = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = true;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickDocumentView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showCompanyActive = false;
        this.showOnDriverViewClicked = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = true;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickAssetUtilizationView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showCompanyActive = false;
        this.showOnDriverViewClicked = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = true;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickDriverDairyView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showCompanyActive = false;
        this.showOnDriverViewClicked = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = true;
        this.showDVIRActive = false;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickDVIRView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showCompanyActive = false;
        this.showOnDriverViewClicked = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = true;
        this.showIFTAActive = false;
    };
    FleetOperateComponent.prototype.onClickIFTAView = function (index) {
        this.highlightDashBoardOptions(index);
        this.showCompanyActive = false;
        this.showOnDriverViewClicked = false;
        this.showDashBoardOptions = true;
        this.showHomeActive = false;
        this.showTrucksActive = false;
        this.showTrailersActive = false;
        this.showDriversActive = false;
        this.showDocumentsActive = false;
        this.showAssetUtilizationActive = false;
        this.showDriverDairyActive = false;
        this.showDVIRActive = false;
        this.showIFTAActive = true;
    };
    FleetOperateComponent = __decorate([
        core_1.Component({
            selector: 'fleetOperate',
            templateUrl: 'app/fleetOperate/fleetOperateTemplate.html'
        }), 
        __metadata('design:paramtypes', [fleetOperateService_1.FleetOperateService, router_1.ActivatedRoute, common_1.Location, router_1.Router])
    ], FleetOperateComponent);
    return FleetOperateComponent;
}());
exports.FleetOperateComponent = FleetOperateComponent;
