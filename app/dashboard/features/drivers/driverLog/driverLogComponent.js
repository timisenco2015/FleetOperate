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
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
var driverLogService_1 = require('./driverLogService');
var DriverLogComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function DriverLogComponent(_driverLogService) {
        this._driverLogService = _driverLogService;
        this.driverEachDayEventNames = [];
        this.driverEachDayEventStart = [];
        this.driverEachDayEventStop = [];
        this.logEventTableData = [];
    }
    ;
    DriverLogComponent.prototype.ngOnInit = function () {
        this.driverLog = false;
        this.showMoreDriverDetails = false;
        this.dateFound = false;
        this.noLogDetails = false;
    };
    DriverLogComponent.prototype.getDriversLog = function () {
        var _this = this;
        this._driverLogService.getDriverLog().subscribe(function (response) {
            _this.driverAllLogs = response.json();
            _this.readDriversLogsFunction(_this.driverAllLogs);
            console.log(" drivers logs:  ", _this.driverAllLogs);
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
    DriverLogComponent.prototype.readDriversLogsFunction = function (data) {
        var i;
        var j;
        var convertedDate;
        var splittedDate;
        this.driverLogKeys = Object.keys((data[0]['driverLogs']));
        if (this.driverAllLogs != null) {
            for (i = 0; i < this.driverLogKeys.length; i++) {
                //the three lines below will convert the date or list of dates recieved from driver list template to 
                // this format YYYY-MM-DD
                var dateString = new Date(this.userChoosenDate).toString();
                dateString = dateString.split(' ').slice(0, 4).join(' ');
                convertedDate = moment(dateString).format('YYYY-MM-DD');
                //this line will split date recieved from the service file in other to comapre the date with
                // the conver date above
                splittedDate = this.driverLogKeys[i].split("T");
                if (convertedDate == splittedDate[0]) {
                    this.getDriverDailyLogs(data[0]['driverLogs'][this.driverLogKeys[i]]);
                    this.driverLog = true;
                    this.dateFound = true;
                    this.displayGrapgh = true;
                    this.noLogDetails = false;
                }
            }
            if (!this.dateFound) {
                this.driverLog = false;
                this.displayGrapgh = false;
                this.logEventTableData = [];
                this.noLogDetails = true;
            }
        }
    };
    DriverLogComponent.prototype.onClickRODS = function () {
    };
    DriverLogComponent.prototype.onClickYesterday = function () {
        this.dateFound = false;
        var currentDate = new Date();
        var yesterdayDate = new Date();
        yesterdayDate.setDate(currentDate.getDate() - 1);
        this.userChoosenDate = yesterdayDate;
        this.getDriversLog();
    };
    DriverLogComponent.prototype.onClickToday = function () {
        this.activeToday = true;
        this.dateFound = false;
        var currentDate = new Date();
        this.userChoosenDate = currentDate;
        this.getDriversLog();
    };
    DriverLogComponent.prototype.getDriverDailyLogs = function (data) {
        var i;
        var length = data.length;
        var localConvertedEventStartTime;
        var localConvertedEventStopTime;
        var location;
        var odometer;
        var note;
        var eventName;
        this.driverDailyLogs = data;
        this.logEventTableData = [];
        for (i = 0; i < this.driverDailyLogs.length; i++) {
            eventName = this.driverDailyLogs[i]['logEvent'];
            location = this.driverDailyLogs[i]['location'];
            odometer = this.driverDailyLogs[i]['fleetOdometerReading'];
            note = this.driverDailyLogs[i]['notes'];
            this.driverEachDayEventNames[i] = eventName;
            localConvertedEventStartTime = moment.utc(this.driverDailyLogs[i]['eventTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
            this.driverEachDayEventStart[i] = localConvertedEventStartTime;
            if ((this.driverDailyLogs[i]['eventEndTimestamp'] == null) && (i + 1) != length) {
                localConvertedEventStopTime = moment.utc(this.driverDailyLogs[i + 1]['eventTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
                this.driverEachDayEventStop[i] = localConvertedEventStopTime;
            }
            else if ((this.driverDailyLogs[i]['eventEndTimestamp'] == null) && (i + 1) == length) {
                localConvertedEventStopTime = moment.utc(this.driverDailyLogs[0]['eventTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
                this.driverEachDayEventStop[i] = localConvertedEventStopTime;
            }
            else {
                localConvertedEventStopTime = moment.utc(this.driverDailyLogs[i]['eventEndTimestamp']).zone("-05:00").format('YYYY-MM-DD HH:mm:ss');
                this.driverEachDayEventStop[i] = localConvertedEventStopTime;
            }
            this.getlogEventTableData(localConvertedEventStartTime, localConvertedEventStopTime, location, odometer, note, eventName);
        }
    };
    DriverLogComponent.prototype.getlogEventTableData = function (eventStartTime, eventStopTime, location, odometer, note, eventName) {
        var duration;
        var calTimeDifference;
        var splitedStartTime = eventStartTime.split(" ")[1];
        var splitedStop = eventStopTime.split(" ")[1];
        calTimeDifference = new Date(eventStopTime).getTime() - new Date(eventStartTime).getTime();
        duration = this.convertMillSecondsToTimeString(calTimeDifference);
        this.logEventTableData.push({ "eventTimestamp": splitedStartTime, "location": location, "fleetOdometerReading": odometer, "logEvent": eventName, "duration": duration, "notes": note });
    };
    DriverLogComponent.prototype.convertMillSecondsToTimeString = function (duration) {
        var oneSecond = 1000;
        var oneMinute = oneSecond * 60;
        var oneHour = oneMinute * 60;
        var seconds = Math.floor((duration % oneMinute) / oneSecond);
        var minutes = Math.floor((duration % oneHour) / oneMinute);
        var hours = Math.floor(duration / oneHour);
        var timeString = '';
        if (hours !== 0) {
            timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
        }
        if (minutes !== 0) {
            timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
        }
        if (seconds !== 0 || duration < 1000) {
            timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
        }
        return timeString;
    };
    // render driverLog on constant changes
    DriverLogComponent.prototype.ngOnChanges = function () {
        console.log("driverData in driver rods...", this.driverData);
        /*for (var i = 0; i < this.driverList.length; i++) {

            var logData = this.driverList[i];

            if (logData.driverId == this.selectedDriverID.driverId) {

                this.driverLog = logData;
                // console.log(this.fleetSummary);
                break;

            } else {
                this.driverLog = null;
            }
        }*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DriverLogComponent.prototype, "driverData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DriverLogComponent.prototype, "sendDriverData", void 0);
    DriverLogComponent = __decorate([
        core_1.Component({
            selector: 'driver-log',
            templateUrl: 'app/dashboard/features/drivers/driverLog/driverLogTemplate.html',
        }), 
        __metadata('design:paramtypes', [driverLogService_1.DriverLogService])
    ], DriverLogComponent);
    return DriverLogComponent;
}());
exports.DriverLogComponent = DriverLogComponent;
