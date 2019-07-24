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
var controlCenterService_1 = require('./controlCenterService');
var ControlCenterComponent = (function () {
    function ControlCenterComponent(controlCenterService) {
        this.controlCenterService = controlCenterService;
        this.fleetData = [];
        this.activeTrucks = '';
        this.inActiceTrucks = '';
        this.activeDrivers = '';
        this.inActiveDrivers = '';
    }
    ControlCenterComponent.prototype.ngOnInit = function () {
        //  this.callService();
        this.getFleetLocations();
        this.loadGraph1();
        this.loadGraph2();
        this.loadGraph3();
    };
    ControlCenterComponent.prototype.ngOnChanges = function () {
    };
    //this function is to load and display the first pie chart. 
    ControlCenterComponent.prototype.loadGraph1 = function () {
        var _this = this;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(function () { return _this.drawChart1(); });
    };
    ControlCenterComponent.prototype.loadGraph2 = function () {
        var _this = this;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(function () { return _this.drawChart2(); });
    };
    ControlCenterComponent.prototype.loadGraph3 = function () {
        var _this = this;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(function () { return _this.drawChart3(); });
    };
    // draws the first pie chart
    ControlCenterComponent.prototype.drawChart1 = function () {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['active', this.activeTrucks],
            ['inactive', this.inActiceTrucks],
        ]);
        var options = {
            title: 'Active Truck'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
        chart.draw(data, options);
    };
    // draws the second pie chart
    ControlCenterComponent.prototype.drawChart2 = function () {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['active', this.activeDrivers],
            ['inactive', this.inActiveDrivers],
        ]);
        var options = {
            title: 'Engaged Drivers'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart2'));
        chart.draw(data, options);
    };
    // draws the third pie chart
    ControlCenterComponent.prototype.drawChart3 = function () {
        var active = 100;
        var inacive = 0;
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['active', active],
            ['inactive', inacive],
        ]);
        var options = {
            title: 'HOS Compliance'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart3'));
        chart.draw(data, options);
    };
    ControlCenterComponent.prototype.doNothing = function () {
        return null;
    };
    //initial the map and display it
    ControlCenterComponent.prototype.initialMap = function (data) {
        var platform = new H.service.Platform({
            'app_id': 'y8nC884sK3w8RFcNpNDX',
            'app_code': 'J-b2rgvJNUJ2LI00m5Q45w'
        });
        var length = data.length;
        var defaultLayers = platform.createDefaultLayers();
        var map = new H.Map(document.getElementById('map'), defaultLayers.normal.map, {
            zoom: 4,
            center: { lat: data[length / 2]['latitude'], lng: data[length / 2]['longitude'] }
        });
        //-------------------------------------------------------------------------------------------
        //----------------- set the map to display fleet style ------------------------------
        //-------------------------------------------------------------------------------------------
        var mapTileService = platform.getMapTileService({ 'type': 'base' });
        var fleetStyleLayer = mapTileService.createTileLayer('maptile', 'normal.day', 256, 'png8', { 'style': 'fleet' });
        map.setBaseLayer(fleetStyleLayer);
        //--------------------------------------------------------
        //-----------------------------Map Event -------------
        //--------------------------------------------------------
        var mapEvents = new H.mapevents.MapEvents(map);
        map.addEventListener('tap', function (evt) {
        });
        var behavior = new H.mapevents.Behavior(mapEvents);
        var ui = H.ui.UI.createDefault(map, defaultLayers);
        var svgMarkup;
        //='<svg style="enable-background:new 0 0 28 28;" version="1.1" viewBox="0 0 78 78" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Padding__x26__Artboard"/><g id="Icons"><g><path d="M24.00024,11.96826c-3.94531,0-7.15479,3.20947-7.15479,7.1543    c0,0.14941,0.00488,0.29785,0.01416,0.44727c0.03662,0.59473,0.14697,1.18018,0.32764,1.73926    c0.19092,0.59424,0.44629,1.12891,0.76025,1.58936l5.25537,7.87402c0.17822,0.2666,0.47607,0.42578,0.79639,0.42578    c0.3208,0,0.61816-0.15918,0.83398-0.48242l5.26855-7.88916c0.04883-0.07471,0.09619-0.14941,0.1416-0.22656    c0.26758-0.45166,0.48486-0.96924,0.64502-1.53857c0.17627-0.62646,0.26611-1.27881,0.26611-1.93896    C31.15454,15.17773,27.94507,11.96826,24.00024,11.96826z M20.93774,20.05127c-0.10693-1.68848,1.18018-3.14941,2.86865-3.25586    c1.69385-0.11035,3.14893,1.18018,3.25635,2.86865c0.10693,1.68848-1.18018,3.14941-2.86914,3.25635    c-0.06543,0.00439-0.13086,0.00635-0.19531,0.00635C22.3938,22.92676,21.04028,21.6748,20.93774,20.05127z M24.87427,13.68896    c1.52393,0.06348,2.93213,0.86768,3.7666,2.1499c0.10547,0.16211,0.05957,0.37891-0.10254,0.48438    c-0.05908,0.03809-0.125,0.05664-0.19043,0.05664c-0.11475,0-0.22656-0.05615-0.29395-0.15918    c-0.71094-1.09326-1.91064-1.77832-3.20898-1.83252c-0.19336-0.00781-0.34326-0.1709-0.33496-0.36426    C24.51782,13.83105,24.67017,13.6709,24.87427,13.68896z M29.05054,18.94385c-0.00537,0-0.01025,0-0.01514-0.00049    c-0.19287-0.00781-0.34326-0.1709-0.33496-0.36426c0.01807-0.43115-0.03271-0.8584-0.1499-1.26953    c-0.05322-0.18604,0.0542-0.37939,0.24023-0.43262c0.18457-0.05371,0.37939,0.0542,0.43262,0.24023    c0.13818,0.4834,0.19775,0.98535,0.17627,1.49121C29.39185,18.79639,29.23706,18.94385,29.05054,18.94385z" style="fill:#303030;"/><path d="M24.00024,33.4458c-1.58154,0-3.28369,0.40479-3.28369,1.29297s1.70215,1.29297,3.28369,1.29297    s3.28369-0.40479,3.28369-1.29297S25.58179,33.4458,24.00024,33.4458z" style="fill:#303030;"/></g></g></svg>';;
        //---------------------------------------------------------------------------------------------------------
        // -------------------------------------------- set each geolocation on the map ----------------------
        //------------------------------------------------------------------------------------------------------------
        var dataPoints = [];
        var i;
        var group = new H.map.Group();
        map.addObject(group);
        for (i = 0; i < data.length; i++) {
            if (data[i]['status'] == "STOPPED") {
                svgMarkup = '<svg style="enable-background:new 0 0 28 28;" version="1.1" viewBox="0 0 78 78" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Padding__x26__Artboard"/><g id="Icons"><g><path d="M24.00024,11.96826c-3.94531,0-7.15479,3.20947-7.15479,7.1543    c0,0.14941,0.00488,0.29785,0.01416,0.44727c0.03662,0.59473,0.14697,1.18018,0.32764,1.73926    c0.19092,0.59424,0.44629,1.12891,0.76025,1.58936l5.25537,7.87402c0.17822,0.2666,0.47607,0.42578,0.79639,0.42578    c0.3208,0,0.61816-0.15918,0.83398-0.48242l5.26855-7.88916c0.04883-0.07471,0.09619-0.14941,0.1416-0.22656    c0.26758-0.45166,0.48486-0.96924,0.64502-1.53857c0.17627-0.62646,0.26611-1.27881,0.26611-1.93896    C31.15454,15.17773,27.94507,11.96826,24.00024,11.96826z M20.93774,20.05127c-0.10693-1.68848,1.18018-3.14941,2.86865-3.25586    c1.69385-0.11035,3.14893,1.18018,3.25635,2.86865c0.10693,1.68848-1.18018,3.14941-2.86914,3.25635    c-0.06543,0.00439-0.13086,0.00635-0.19531,0.00635C22.3938,22.92676,21.04028,21.6748,20.93774,20.05127z M24.87427,13.68896    c1.52393,0.06348,2.93213,0.86768,3.7666,2.1499c0.10547,0.16211,0.05957,0.37891-0.10254,0.48438    c-0.05908,0.03809-0.125,0.05664-0.19043,0.05664c-0.11475,0-0.22656-0.05615-0.29395-0.15918    c-0.71094-1.09326-1.91064-1.77832-3.20898-1.83252c-0.19336-0.00781-0.34326-0.1709-0.33496-0.36426    C24.51782,13.83105,24.67017,13.6709,24.87427,13.68896z M29.05054,18.94385c-0.00537,0-0.01025,0-0.01514-0.00049    c-0.19287-0.00781-0.34326-0.1709-0.33496-0.36426c0.01807-0.43115-0.03271-0.8584-0.1499-1.26953    c-0.05322-0.18604,0.0542-0.37939,0.24023-0.43262c0.18457-0.05371,0.37939,0.0542,0.43262,0.24023    c0.13818,0.4834,0.19775,0.98535,0.17627,1.49121C29.39185,18.79639,29.23706,18.94385,29.05054,18.94385z" style="fill:#FF0000;"/><path d="M24.00024,33.4458c-1.58154,0-3.28369,0.40479-3.28369,1.29297s1.70215,1.29297,3.28369,1.29297    s3.28369-0.40479,3.28369-1.29297S25.58179,33.4458,24.00024,33.4458z" style="fill:#303030;"/></g></g></svg>';
                var icon = new H.map.Icon(svgMarkup), coords = { lat: data[i]['latitude'], lng: data[i]['longitude'] }, marker = new H.map.Marker(coords, { icon: icon });
                marker.addEventListener('tap', function (evt) {
                    var jsonFile = JSON.stringify(evt.target.getPosition());
                    var json = JSON.parse(jsonFile);
                    alert(jsonFile);
                }, false);
            }
            else if (data[i]['status'] == "DRIVING") {
                svgMarkup = '<svg style="enable-background:new 0 0 28 28;" version="1.1" viewBox="0 0 78 78" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Padding__x26__Artboard"/><g id="Icons"><g><path d="M24.00024,11.96826c-3.94531,0-7.15479,3.20947-7.15479,7.1543    c0,0.14941,0.00488,0.29785,0.01416,0.44727c0.03662,0.59473,0.14697,1.18018,0.32764,1.73926    c0.19092,0.59424,0.44629,1.12891,0.76025,1.58936l5.25537,7.87402c0.17822,0.2666,0.47607,0.42578,0.79639,0.42578    c0.3208,0,0.61816-0.15918,0.83398-0.48242l5.26855-7.88916c0.04883-0.07471,0.09619-0.14941,0.1416-0.22656    c0.26758-0.45166,0.48486-0.96924,0.64502-1.53857c0.17627-0.62646,0.26611-1.27881,0.26611-1.93896    C31.15454,15.17773,27.94507,11.96826,24.00024,11.96826z M20.93774,20.05127c-0.10693-1.68848,1.18018-3.14941,2.86865-3.25586    c1.69385-0.11035,3.14893,1.18018,3.25635,2.86865c0.10693,1.68848-1.18018,3.14941-2.86914,3.25635    c-0.06543,0.00439-0.13086,0.00635-0.19531,0.00635C22.3938,22.92676,21.04028,21.6748,20.93774,20.05127z M24.87427,13.68896    c1.52393,0.06348,2.93213,0.86768,3.7666,2.1499c0.10547,0.16211,0.05957,0.37891-0.10254,0.48438    c-0.05908,0.03809-0.125,0.05664-0.19043,0.05664c-0.11475,0-0.22656-0.05615-0.29395-0.15918    c-0.71094-1.09326-1.91064-1.77832-3.20898-1.83252c-0.19336-0.00781-0.34326-0.1709-0.33496-0.36426    C24.51782,13.83105,24.67017,13.6709,24.87427,13.68896z M29.05054,18.94385c-0.00537,0-0.01025,0-0.01514-0.00049    c-0.19287-0.00781-0.34326-0.1709-0.33496-0.36426c0.01807-0.43115-0.03271-0.8584-0.1499-1.26953    c-0.05322-0.18604,0.0542-0.37939,0.24023-0.43262c0.18457-0.05371,0.37939,0.0542,0.43262,0.24023    c0.13818,0.4834,0.19775,0.98535,0.17627,1.49121C29.39185,18.79639,29.23706,18.94385,29.05054,18.94385z" style="fill:#006400;"/><path d="M24.00024,33.4458c-1.58154,0-3.28369,0.40479-3.28369,1.29297s1.70215,1.29297,3.28369,1.29297    s3.28369-0.40479,3.28369-1.29297S25.58179,33.4458,24.00024,33.4458z" style="fill:#303030;"/></g></g></svg>';
                var icon = new H.map.Icon(svgMarkup), coords = { lat: data[i]['latitude'], lng: data[i]['longitude'] }, marker = new H.map.Marker(coords, { icon: icon });
                marker.addEventListener('tap', function (evt) {
                    var jsonFile = JSON.stringify(evt.target.getPosition());
                    var json = JSON.parse(jsonFile);
                    alert(jsonFile);
                }, false);
            }
            else if (data[i]['status'] == "WAITING") {
                svgMarkup = '<svg style="enable-background:new 0 0 28 28;" version="1.1" viewBox="0 0 78 78" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Padding__x26__Artboard"/><g id="Icons"><g><path d="M24.00024,11.96826c-3.94531,0-7.15479,3.20947-7.15479,7.1543    c0,0.14941,0.00488,0.29785,0.01416,0.44727c0.03662,0.59473,0.14697,1.18018,0.32764,1.73926    c0.19092,0.59424,0.44629,1.12891,0.76025,1.58936l5.25537,7.87402c0.17822,0.2666,0.47607,0.42578,0.79639,0.42578    c0.3208,0,0.61816-0.15918,0.83398-0.48242l5.26855-7.88916c0.04883-0.07471,0.09619-0.14941,0.1416-0.22656    c0.26758-0.45166,0.48486-0.96924,0.64502-1.53857c0.17627-0.62646,0.26611-1.27881,0.26611-1.93896    C31.15454,15.17773,27.94507,11.96826,24.00024,11.96826z M20.93774,20.05127c-0.10693-1.68848,1.18018-3.14941,2.86865-3.25586    c1.69385-0.11035,3.14893,1.18018,3.25635,2.86865c0.10693,1.68848-1.18018,3.14941-2.86914,3.25635    c-0.06543,0.00439-0.13086,0.00635-0.19531,0.00635C22.3938,22.92676,21.04028,21.6748,20.93774,20.05127z M24.87427,13.68896    c1.52393,0.06348,2.93213,0.86768,3.7666,2.1499c0.10547,0.16211,0.05957,0.37891-0.10254,0.48438    c-0.05908,0.03809-0.125,0.05664-0.19043,0.05664c-0.11475,0-0.22656-0.05615-0.29395-0.15918    c-0.71094-1.09326-1.91064-1.77832-3.20898-1.83252c-0.19336-0.00781-0.34326-0.1709-0.33496-0.36426    C24.51782,13.83105,24.67017,13.6709,24.87427,13.68896z M29.05054,18.94385c-0.00537,0-0.01025,0-0.01514-0.00049    c-0.19287-0.00781-0.34326-0.1709-0.33496-0.36426c0.01807-0.43115-0.03271-0.8584-0.1499-1.26953    c-0.05322-0.18604,0.0542-0.37939,0.24023-0.43262c0.18457-0.05371,0.37939,0.0542,0.43262,0.24023    c0.13818,0.4834,0.19775,0.98535,0.17627,1.49121C29.39185,18.79639,29.23706,18.94385,29.05054,18.94385z" style="fill:#FFFF00;"/><path d="M24.00024,33.4458c-1.58154,0-3.28369,0.40479-3.28369,1.29297s1.70215,1.29297,3.28369,1.29297    s3.28369-0.40479,3.28369-1.29297S25.58179,33.4458,24.00024,33.4458z" style="fill:#303030;"/></g></g></svg>';
                var icon = new H.map.Icon(svgMarkup), coords = { lat: data[i]['latitude'], lng: data[i]['longitude'] }, marker = new H.map.Marker(coords, { icon: icon });
                marker.addEventListener('tap', function (evt) {
                    var jsonFile = JSON.stringify(evt.target.getPosition());
                    var json = JSON.parse(jsonFile);
                    alert(jsonFile);
                }, false);
            }
            group.addObject(marker);
        }
    };
    ControlCenterComponent.prototype.getFleetLocations = function () {
        // console.log('getFleetLocations() executed');
        // let companyId = localStorage.getItem('token_2')
        var _this = this;
        this.controlCenterService.getFleetsLocation()
            .subscribe(function (response) {
            _this.fleetData = response.json();
            console.log('response:..', _this.fleetData);
            _this.activeTrucks = _this.fleetData['activeTrucks'];
            _this.inActiceTrucks = _this.fleetData['inActiceTrucks'];
            _this.activeDrivers = _this.fleetData['activeDrivers'];
            _this.inActiveDrivers = _this.fleetData['inActiveDrivers'];
            _this.initialMap(_this.fleetData['fleetSituation']);
        });
        // console.log('getFleetLocations() completed');
    };
    ControlCenterComponent = __decorate([
        core_1.Component({
            selector: 'control-center',
            templateUrl: 'app/dashboard/features/controlCenter/controlCenterTemplate.html',
            styleUrls: ['app/dashboard/features/controlCenter/controlCenterStyle.css']
        }), 
        __metadata('design:paramtypes', [controlCenterService_1.ControlCenterService])
    ], ControlCenterComponent);
    return ControlCenterComponent;
}());
exports.ControlCenterComponent = ControlCenterComponent;
