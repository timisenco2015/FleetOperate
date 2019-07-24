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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var DocumentService = (function () {
    function DocumentService(_http) {
        this._http = _http;
        this.url1 = 'http://localhost:8080/DocumentService/rest/documentManagement';
        this.url2 = 'http://localhost:8080/DocumentService/rest/documentManagement/add';
    }
    DocumentService.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    DocumentService.prototype.getDocuments = function () {
        return this._http.get(this.url1)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DocumentService.prototype.sendDocuments = function (documents) {
        console.log("Inside service:..", documents);
        var body = JSON.stringify({ documents: documents });
        console.log("Inside service json file:..", body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.url2, body, options)
            .do(function (data) { return console.log("Data received: " + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    DocumentService.prototype.updateDocument = function (document, documentId) {
        console.log("Inside service updateDocument:..", document);
        console.log("Inside service updateDocument ID is:..", documentId);
        var body = JSON.stringify({ document: document });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(this.url1 + "/" + documentId, body, options)
            .catch(this.handleError);
    };
    DocumentService.prototype.deleteDocuments = function (documentId) {
        return this._http.delete(this.url1 + "/" + documentId)
            .catch(this.handleError);
    };
    DocumentService.prototype.handleError = function (error) {
        console.error("error:..", error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    DocumentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
