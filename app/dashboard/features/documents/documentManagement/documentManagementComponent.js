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
var forms_1 = require('@angular/forms');
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
var documentListService_1 = require('../documentList/documentListService');
var fleetListService_1 = require('../../fleet/fleetList/fleetListService');
var documentManagementService_1 = require('./documentManagementService');
var DocumentManagementComponent = (function () {
    // constructor to load the page
    function DocumentManagementComponent(_documentService, _fleetService, _formBuilder, _documentManagementService) {
        this._documentService = _documentService;
        this._fleetService = _fleetService;
        this._formBuilder = _formBuilder;
        this._documentManagementService = _documentManagementService;
        this.selectedTruckId = [];
        this.showForm = true;
        this.refreshDocumentList = new core_1.EventEmitter();
        this.createDocumentForm();
    }
    DocumentManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  load list of trucks
        this._fleetService.getFleets()
            .subscribe(function (fleets) {
            _this.trucks = fleets.json();
            console.log("total trucks in list:..", _this.trucks);
        }, function (error) { return _this.errorMessage = error; });
    };
    DocumentManagementComponent.prototype.ngOnChanges = function () {
    };
    DocumentManagementComponent.prototype.createDocumentForm = function () {
        this.uploadDocumentForm = this._formBuilder.group({
            'name': [],
            'type': [],
            'documentDate': [],
            'fleetId': [],
            'notes': []
        });
    };
    DocumentManagementComponent.prototype.formReset = function () {
        this.uploadDocumentForm.reset();
    };
    // 
    DocumentManagementComponent.prototype.onClickUploadDocument = function (event) {
        console.log("new files ...", event.target.files);
        // this.fileList = null;
        this.fileName = [];
        console.log("clicked");
        this.fileList = event.target.files;
        console.log("files: ", this.fileList);
        for (var i = 0; i < this.fileList.length; i++) {
            var file = this.fileList[i];
            console.log("files are: ", file);
            this.fileName = file.name;
            this.file = file;
        }
        console.log("file name: ", this.fileName);
    };
    // on Click Select Truck button
    DocumentManagementComponent.prototype.selectTruck = function (index) {
        console.log("selectTruck called...fleetId2 is ", index);
        this.documentIndex = index;
    };
    // onClickTruckCheckbox
    DocumentManagementComponent.prototype.onClickTruckCheckbox = function (truckId) {
        return truckId;
    };
    // after selecting truck id on click OK
    DocumentManagementComponent.prototype.sendTruckId = function (truckId) {
        console.log("truck id:..2..", truckId);
        this.fleetId = truckId;
        this.selectedTruckId[this.documentIndex] = truckId;
        console.log("selectedTruckId is ... ", this.selectedTruckId);
    };
    // send document and relate form details to server on click SEND
    DocumentManagementComponent.prototype.sendDocumentsToTruck = function () {
        // console.log("documents:..", documents)
        if (this.uploadDocumentForm.value.fleetId == null &&
            this.fileList == null) {
            console.log("pls upload document and select fleet Id");
        }
        else {
            console.log("documents info:..", this.uploadDocumentForm.value);
            console.log("files:..", this.fileList);
            // below method is temporarily cancelled
            /* this._documentManagementService.postDocument(this.uploadDocumentForm.value, this.fileList)
                 .subscribe(
                    response  => {
                             console.log("documents:.. sent");
                             console.log("response:.. ", response);
                             if (response != null) {*/
            /* this.showForm = false;
                setTimeout(() => {
                    this.fileName = [];
                    this.fleetId = [];
                    this.createDocumentForm();
                    
                },0.5);
                this.showForm = true;*/
            /* this.fleetId = [];
             this.formReset();
     }
         }
     );*/
            /* this._documentManagementService.progress
         .subscribe(
         data => {
             console.log('progress = ' + data + '%');
             
         })*/
            //this.refreshDocumentList.emit('refresh document list');
            /*this._documentManagementService.postDocToS3(this.fileList)
                .subscribe(
                    response => {
                        console.log("AWS response:.. ", response);
                    }
                )*/
            this._documentManagementService.postDocToS3(this.file);
        }
        /* this.showForm = false;
          setTimeout(() => {
      this.createDocumentForm();
        this.showForm = true;
      });*/
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DocumentManagementComponent.prototype, "refreshDocumentList", void 0);
    DocumentManagementComponent = __decorate([
        core_1.Component({
            selector: 'documentManagement',
            templateUrl: 'app/dashboard/features/documents/documentManagement/documentManagementTemplate.html',
        }), 
        __metadata('design:paramtypes', [documentListService_1.DocumentService, fleetListService_1.FleetService, forms_1.FormBuilder, documentManagementService_1.DocumentManagementService])
    ], DocumentManagementComponent);
    return DocumentManagementComponent;
}());
exports.DocumentManagementComponent = DocumentManagementComponent;
