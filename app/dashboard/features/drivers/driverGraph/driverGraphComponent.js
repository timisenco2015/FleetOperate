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
var DriverGraphComponent = (function () {
    function DriverGraphComponent() {
        this.eventStartTime = [];
        this.eventStartDate = [];
        this.eventStopTime = [];
        this.eventStopDate = [];
        this.eventStartStopTime = [];
    }
    DriverGraphComponent.prototype.ngOnChanges = function () {
        this.eventArray = ["Driving", "On_Duty", "Sleeper_Berth", "Off_Duty"];
        this.getEventStartStopTimeArray();
        this.mapEventNamesToLogEvent();
        this.loadGraph();
    };
    DriverGraphComponent.prototype.ngOnInit = function () {
    };
    DriverGraphComponent.prototype.loadGraph = function () {
        var _this = this;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(function () { return _this.drawChart(); });
    };
    DriverGraphComponent.prototype.drawChart = function () {
        var i;
        var chartdata = new google.visualization.DataTable();
        chartdata.addColumn('datetime', 'Time');
        chartdata.addColumn('number', 'Log Events');
        var j = 0;
        var t = 0;
        // defining the total lenght of the rows in graph
        var length = (this.eventStartDate.length + this.eventStopDate.length);
        // initiate graph rows
        chartdata.addRows(length + 4);
        //------------- set the initial graph x and y axis event values START (The below setup is default)----------------------
        //extract year, month and day from eventStartDate
        var splittedInitialDate = this.eventStartDate[0].split("-");
        var year = parseInt(splittedInitialDate[0]);
        var month = parseInt(splittedInitialDate[1]);
        var day = parseInt(splittedInitialDate[2]);
        // extract hour, minutes, seconds from eventStartDate
        var splittedInitialTime = this.eventStartTime[t].split(":");
        var hour = parseInt(splittedInitialTime[0]);
        var minutes = parseInt(splittedInitialTime[1]);
        var seconds = parseInt(splittedInitialTime[2]);
        // set the initial date time in x axis of graph
        chartdata.setCell(0, 0, new Date(year, month, day, 0, 0, 0));
        // set the initial event in y axis of graph (the third value zero below represents the event assigned 
        // in graph options ticks "0")
        chartdata.setCell(0, 1, 0);
        //----------- set end values for first initiated event values ------------------------
        chartdata.setCell(1, 0, new Date(year, month, day, hour, minutes, seconds));
        chartdata.setCell(1, 1, 0);
        //----------- set end values for first initiated event values ------------------------
        //------------- set the initial graph x and y axis event values END-----------------------------------------------------
        // Now we set the log events and time looping through the log data -----------------------------
        // loop start from second row as first two rows are set initially which is above
        for (i = 2; i < length; i = (i + 2)) {
            // split the start date and time for all the events in the log list
            var splittedStartDate = this.eventStartDate[t].split("-");
            var startYear = parseInt(splittedStartDate[0]);
            var startMonth = parseInt(splittedStartDate[1]);
            var startDay = parseInt(splittedStartDate[2]);
            var splittedStartTime = this.eventStartTime[t].split(":");
            var startHour = parseInt(splittedStartTime[0]);
            var startMinutes = parseInt(splittedStartTime[1]);
            var startSeconds = parseInt(splittedStartTime[2]);
            // set the start event and corresponding time on x and y axis
            chartdata.setCell(i, 0, new Date(startYear, startMonth, startDay, startHour, startMinutes, startSeconds));
            chartdata.setCell(i, 1, this.mapsEventNamesToLogEvents[t]);
            // split the stop date and time for all the events in the log list
            var splittedStopDate = this.eventStopDate[t].split("-");
            var stopYear = parseInt(splittedStopDate[0]);
            var stopMonth = parseInt(splittedStopDate[1]);
            var stopDay = parseInt(splittedStopDate[2]);
            var splittedStopTime = this.eventStopTime[t].split(":");
            var stopHour = parseInt(splittedStopTime[0]);
            var stopMinutes = parseInt(splittedStopTime[1]);
            var stopSeconds = parseInt(splittedStopTime[2]);
            // set the stop event and corresponding time on x and y axis 
            j = i + 1;
            chartdata.setCell(j, 0, new Date(stopYear, stopMonth, stopDay, stopHour, stopMinutes, stopSeconds));
            chartdata.setCell(j, 1, this.mapsEventNamesToLogEvents[t]);
            t++;
        }
        //------------- set the end of graph x and y axis event values START (The below setup is default)----------------------
        // pick the eventEndTimestamp of very last event and map the 24th hour in graph
        var splittedEndDate = this.eventStopDate[t - 1].split("-");
        var endYear = parseInt(splittedEndDate[0]);
        var endMonth = parseInt(splittedEndDate[1]);
        var endDay = parseInt(splittedEndDate[2]);
        var splittedEndTime = this.eventStopTime[t - 1].split(":");
        var endHour = parseInt(splittedEndTime[0]);
        var endMinutes = parseInt(splittedEndTime[1]);
        var endSeconds = parseInt(splittedEndTime[2]);
        // 
        var n = j + 1;
        chartdata.setCell(n, 0, new Date(endYear, endMonth, endDay, endHour, endMinutes, endSeconds));
        chartdata.setCell(n, 1, this.mapsEventNamesToLogEvents[t]);
        chartdata.setCell(n + 1, 0, new Date(endYear, endMonth, endDay, 24, 0, 0));
        chartdata.setCell(n + 1, 1, this.mapsEventNamesToLogEvents[t]);
        //------------- set the end of graph x and y axis event values END--------------------------------------------------------
        var options = {
            title: 'Driver Log',
            //curveType: 'function',
            legend: { position: 'right' },
            width: 1600,
            height: 360,
            hAxis: {
                format: 'HH:mm:ss',
                gridlines: { count: 8 },
                min: 0,
                max: 24,
                viewWindow: {},
            },
            vAxis: {
                gridlines: {
                    color: 'none',
                    count: 5
                },
                minValue: 0,
                ticks: [{ v: 0, f: "" }, { v: 10, f: "Driving" }, { v: 20, f: "On_Duty" }, { v: 30, f: "Off_Duty" }, { v: 40, f: "Sleeper_Berth" }, { v: 50, f: "" }],
            }
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(chartdata, options);
    };
    DriverGraphComponent.prototype.getEventStartStopTimeArray = function () {
        var i;
        var splitEventStart;
        var length = this.driverEachDayEventStart.length;
        var splited;
        for (i = 0; i < length; i++) {
            splited = this.driverEachDayEventStart[i].split(" ");
            this.eventStartDate[i] = splited[0];
            this.eventStartTime[i] = splited[1];
            /* if (this.driverEachDayEventStop[i]==null && (i+1)!=length)
              {
                
                 this.eventStopDate[i] = splited[0];
                 splited =this.driverEachDayEventStart[i+1].split(" ");
                 
                this.eventStopTime[i] =  splited[1];
              }
              else if (this.driverEachDayEventStop[0]==null && (i)==length)
             {
                  this.eventStopDate[i] = splited[0];
                this.eventStopTime[i]= "24:00:00";
             }
              else
              {*/
            splited = this.driverEachDayEventStop[i].split(" ");
            this.eventStopDate[i] = splited[0];
            this.eventStopTime[i] = splited[1];
        }
        console.log("testing event start time" + this.driverEachDayEventStart);
        console.log("testing event stop time" + this.driverEachDayEventStop);
    };
    DriverGraphComponent.prototype.mapEventNamesToLogEvent = function () {
        this.mapsEventNamesToLogEvents = [];
        var i = 0;
        var length = this.driverEachDayEventNames.length;
        for (i = 0; i < length; i++) {
            if (this.driverEachDayEventNames[i] == "Driving") {
                this.mapsEventNamesToLogEvents[i] = 10;
            }
            else if (this.driverEachDayEventNames[i] == "On_Duty") {
                this.mapsEventNamesToLogEvents[i] = 20;
            }
            else if (this.driverEachDayEventNames[i] == "Off_Duty") {
                this.mapsEventNamesToLogEvents[i] = 30;
            }
            else if (this.driverEachDayEventNames[i] == "Sleeper_Berth") {
                this.mapsEventNamesToLogEvents[i] = 40;
            }
        }
    };
    // events
    DriverGraphComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DriverGraphComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DriverGraphComponent.prototype, "driverEachDayEventNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DriverGraphComponent.prototype, "driverEachDayEventStop", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DriverGraphComponent.prototype, "driverEachDayEventStart", void 0);
    DriverGraphComponent = __decorate([
        core_1.Component({
            selector: 'driver-graph',
            templateUrl: 'app/dashboard/features/drivers/driverGraph/driverGraphTemplate.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DriverGraphComponent);
    return DriverGraphComponent;
}());
exports.DriverGraphComponent = DriverGraphComponent;
