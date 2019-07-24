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
var trailerSettingsService_1 = require('../trailerSettingsService');
var TrailerSettingsListComponent = (function () {
    function TrailerSettingsListComponent(_trailerSettingService) {
        this._trailerSettingService = _trailerSettingService;
        this.isDeleteClicked = false;
        this.displayEditForm = new core_1.EventEmitter();
        this.showError = false;
        this.companyId = localStorage.getItem("token_2");
    }
    TrailerSettingsListComponent.prototype.ngOnInit = function () {
        this.getTrailers();
    };
    TrailerSettingsListComponent.prototype.ngOnChanges = function () {
    };
    TrailerSettingsListComponent.prototype.getTrailers = function () {
        var _this = this;
        this._trailerSettingService.getTrailers(this.companyId)
            .subscribe(function (response) {
            _this.trailers = response.json();
            console.log(" trailers:  ", _this.trailers);
            if (response.status == 200) {
                _this.showError = false;
            }
            else {
                _this.broadcastErrorCode = response.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error != null) {
                _this.broadcastErrorCode = error;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Options request Error : ", error.status);
        });
    };
    TrailerSettingsListComponent.prototype.onClickEditTrailer = function (trailerId) {
        var _this = this;
        console.log(" trailer ID sent to edit:  ", trailerId);
        // this.displayEditForm.emit({trailerId: trailerId, trailersList: this.trailers});
        this._trailerSettingService.getTrailerToEdit(trailerId)
            .subscribe(function (trailer) {
            console.log("trailer to edit: ", trailer.json());
            if (trailer.status == 200) {
                _this.displayEditForm.emit({ trailerId: trailerId, trailerDetail: trailer.json() });
            }
            else {
                _this.broadcastErrorCode = trailer.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        });
    };
    TrailerSettingsListComponent.prototype.onClickDelete = function (trailerId) {
        this.isDeleteClicked = true;
        for (var i = 0; i < this.trailers.length; i++) {
            var trailers = this.trailers[i];
            // console.log(" fleet summary ID:  ", summaryData.fleetId)
            if (trailers.fleetId == trailerId) {
                this.deleteTrailerInfo = trailers;
                console.log(" delete trailersDetails is:  ", this.deleteTrailerInfo);
                break;
            }
            else {
                this.deleteTrailerInfo = null;
            }
        }
    };
    TrailerSettingsListComponent.prototype.deleteTrailer = function (trailerId) {
        var _this = this;
        this._trailerSettingService.deleteTrailer(trailerId)
            .subscribe(function (deleteResponse) {
            _this.deleteResponse = deleteResponse;
            if (_this.deleteResponse.status == 200) {
                _this.getTrailers();
            }
            else {
                _this.broadcastErrorCode = _this.deleteResponse.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (error.status != null) {
                _this.broadcastErrorCode = error.status;
                _this.showError = true;
                if (_this.showError = true) {
                    window.scrollTo(0, 0);
                }
            }
            console.log("Options request Error : ", error.status);
        });
        this.isDeleteClicked = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TrailerSettingsListComponent.prototype, "displayEditForm", void 0);
    TrailerSettingsListComponent = __decorate([
        core_1.Component({
            selector: 'trailer-settings-list',
            templateUrl: 'app/dashboard/features/settings/trailerSettings/trailerSettingsList/trailerSettingsListTemplate.html',
        }), 
        __metadata('design:paramtypes', [trailerSettingsService_1.TrailerSettingsService])
    ], TrailerSettingsListComponent);
    return TrailerSettingsListComponent;
}());
exports.TrailerSettingsListComponent = TrailerSettingsListComponent;
