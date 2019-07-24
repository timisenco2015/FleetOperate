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
var trailerSummaryService_1 = require('./trailerSummaryService');
var TrailerSummaryComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function TrailerSummaryComponent(_trailerSummaryService) {
        this._trailerSummaryService = _trailerSummaryService;
        console.log();
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    TrailerSummaryComponent.prototype.ngOnChanges = function () {
        for (var i = 0; i < this.trailerList.length; i++) {
            console.log("list: ", this.trailerList.length);
            var summary = this.trailerList[i];
            if (summary.trailerId == this.selectedTrailerID.trailerId) {
                this.trailerSummary = summary;
                // console.log(this.fleetSummary);
                break;
            }
            else {
                this.trailerSummary = null;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TrailerSummaryComponent.prototype, "selectedTrailerID", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TrailerSummaryComponent.prototype, "trailerList", void 0);
    TrailerSummaryComponent = __decorate([
        core_1.Component({
            selector: 'trailer-summary',
            templateUrl: 'app/dashboard/features/trailers/trailerSummary/trailerSummaryTemplate.html'
        }), 
        __metadata('design:paramtypes', [trailerSummaryService_1.TrailerSummaryService])
    ], TrailerSummaryComponent);
    return TrailerSummaryComponent;
}());
exports.TrailerSummaryComponent = TrailerSummaryComponent;
