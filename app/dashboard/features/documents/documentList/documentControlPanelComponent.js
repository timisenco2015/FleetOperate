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
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var documentDetailsComponent_1 = require('../documentDetails/documentDetailsComponent');
var documentManagementComponent_1 = require('../documentManagement/documentManagementComponent');
var documentControlPanelService_1 = require('./documentControlPanelService');
var DocumentControlPanelComponent = (function () {
    // constructor to loop the products in product service file and disply in html
    function DocumentControlPanelComponent(_documentService) {
        this._documentService = _documentService;
        this.showDetails = false;
        this.showManagenment = true;
        this.officeUploadedDocuments = [];
        this.truckUploadedDocuments = [];
        this.editMode = [];
        this.documentID = [];
        this.TruckID = [];
    }
    // initiation of ngOnInit to bind the service or any external data to template on start
    DocumentControlPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        // list documents when page initially loads
        this._documentService.getDocuments()
            .subscribe(function (document) {
            _this.documents = document;
            console.log("all docs..", _this.documents);
            for (var i = 0; i < _this.documents.length; i++) {
                var documents = _this.documents[i];
                //  console.log("looped docs..",documents)
                if (documents.source == "Office") {
                    console.log("Office docs..", documents);
                    _this.officeUploadedDocuments.push(documents);
                }
                else if (documents.source == "Truck") {
                    console.log("Truck docs..", documents);
                    _this.truckUploadedDocuments.push(documents);
                }
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    // on update of info changes to implement
    DocumentControlPanelComponent.prototype.ngOnChanges = function () {
    };
    // on click of each document in the document list
    DocumentControlPanelComponent.prototype.onSelect = function (document) {
        this.showDetails = true;
    };
    // on click edit in the document list
    DocumentControlPanelComponent.prototype.edit = function (document, i) {
        this.editedIndex = i;
        // this.editMode[document.documentId] = true;
        this.documentation = {
            type: '',
            source: '',
            date: '',
            tripId: '',
            notes: ''
        };
    };
    // on click save in the document list
    DocumentControlPanelComponent.prototype.save = function (document, value, documentId) {
        var _this = this;
        console.log("document is..", value + "documentId is..", documentId);
        this._documentService.updateDocument(value, documentId)
            .subscribe(function (documentResponse) {
            _this.updateResponse = documentResponse;
            console.log("delete response:...", _this.updateResponse);
        }, function (error) { return _this.errorMessage = error; });
        this.editMode[document.documentId] = false;
        this.editedIndex = null;
    };
    // on click delete in the document list
    DocumentControlPanelComponent.prototype.delete = function (documentId) {
        var _this = this;
        console.log(documentId);
        this._documentService.deleteDocuments(documentId)
            .subscribe(function (document) {
            _this.deleteResponse = document;
            console.log("delete response:...", _this.deleteResponse);
            if (_this.deleteResponse.ok == true) {
                _this.onRefreshDocumentList();
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    // refresh or get document list from server
    DocumentControlPanelComponent.prototype.onRefreshDocumentList = function () {
        var _this = this;
        console.log("on refresh document list trigerred");
        this._documentService.getDocuments()
            .subscribe(function (document) {
            _this.documents = document;
            console.log(_this.documents);
        }, function (error) { return _this.errorMessage = error; });
        console.log("on refresh document complete");
    };
    // document ID of when clicked checkbox
    DocumentControlPanelComponent.prototype.selectedDocumentCheckbox = function (documentID) {
        console.log("then document id..is..", documentID);
        this.documentID.push(documentID);
        console.log("then document id..selectedCheckbox..", this.documentID);
    };
    // send checked document ID's to server for sending relevent document to truck
    DocumentControlPanelComponent.prototype.onClickDocumentCheckbox = function (selectedDocument) {
        console.log("check box event:..", selectedDocument);
    };
    // Truck ID of when clicked checkbox
    DocumentControlPanelComponent.prototype.selectedTruckCheckbox = function (TruckID) {
        console.log("then TruckID..is..", TruckID);
        this.TruckID.push(TruckID);
        console.log("then TruckID..selectedCheckbox..", this.TruckID);
    };
    // send checked Truck ID's to server for sending relevent document to truck
    DocumentControlPanelComponent.prototype.onClickTruckCheckbox = function (selectedTruck) {
        console.log("check box event:..", selectedTruck);
        this.selectedTruck = selectedTruck;
    };
    // on click sendDocumentToTruck button
    DocumentControlPanelComponent.prototype.sendDocumentToTruck = function () {
        if (this.selectedTruck != null) {
            console.log("send document id & TruckID..to server..", this.TruckID + " && " + this.documentID);
        }
        this.editMode = [];
    };
    DocumentControlPanelComponent = __decorate([
        core_1.Component({
            selector: 'document-controlPanel',
            templateUrl: 'app/dashboard/features/documents/documentControlPanel/documentControlPanelTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, common_1.NgClass, documentDetailsComponent_1.DocumentDetailsComponent, documentManagementComponent_1.DocumentManagementComponent]
        }), 
        __metadata('design:paramtypes', [documentControlPanelService_1.DocumentService])
    ], DocumentControlPanelComponent);
    return DocumentControlPanelComponent;
}());
exports.DocumentControlPanelComponent = DocumentControlPanelComponent;
//# sourceMappingURL=documentControlPanelComponent.js.map