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
var DocumentManagementService = (function () {
    function DocumentManagementService(_http) {
        this._http = _http;
        this.url1 = 'http://fleetoperate.s3.amazonaws.com';
        this.urlPost = 'http://localhost:8082/fleetops/document/upload';
        this.username = "user";
        this.password = "0adc8109-d16f-4832-a4e6-a57b12525ec0";
        /* this.progress = Observable.create(observer => {
             this.progressObserver = observer
         }).share();*/
    }
    DocumentManagementService.prototype.postDocument = function (documentDetails, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            console.log("Inside service the documents are:..", file);
            console.log("Inside service documentDetails are:..", documentDetails);
            for (var i = 0; i < file.length; i++) {
                formData.append("file", file[i]);
            }
            var data = JSON.stringify(documentDetails);
            console.log("Inside service data are:..", data);
            formData.append("document", data);
            formData.append('Content-Type', 'multipart/form-data');
            formData.append('Authorization', 'Basic ' + window.btoa(_this.username + ':' + _this.password));
            formData.append('Content-Type', 'application/json');
            formData.append('Accept', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        _this.serverResponse = xhr.response;
                        observer.next(_this.serverResponse);
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            /* xhr.upload.onprogress = (event) => {
                 this.progress = Math.round(event.loaded / event.total * 100);
     
                 this.progressObserver.next(this.progress);
             };*/
            xhr.open('POST', _this.urlPost, true);
            xhr.send(formData);
        });
    };
    DocumentManagementService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    /* postDocToS3(file){
 
          return Observable.create(observer =>{
 
         console.log("postDocToS3 executed");
 
        // var awsCredentials = new AWS.config.loadFromPath('./aws.credentials.json');
        // console.log("awsCredentials executed");
 
        AWS.config.accessKeyId = 'AKIAJICTTRMRIVP6RZ2A';
 
         AWS.config.secretAccessKey = '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';
 
         AWS.config.region = 'us-east-1';*/
    /*  var credentials = AWS.config.credentials({
"accessKeyId": "AKIAJICTTRMRIVP6RZ2A",
"secretAccessKey": "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",
"region": "us-east-1"
}); */
    //  console.log("credentials executed");
    /*  var S3 = new AWS.S3({params: {Bucket: 'angular2docuploadtest1'}});
      console.log("S3 executed");
      var params = { Key: 'fileFromAngularApp', Body: file};

      S3.putObject(params, function(error, data){

          if (error){
              observer.error(error);
        console.log("Error:..",error)

          }else{
              observer.next(data);
                  observer.complete();
              console.log("Successfully uploaded.. "+ data +" ..to myBucket/myKey");
          }
      })
    })

  }*/
    DocumentManagementService.prototype.postDocToS3 = function (file) {
        console.log("postDocToS3 executed");
        // AWS.config.accessKeyId = 'AKIAJICTTRMRIVP6RZ2A';
        //  AWS.config.secretAccessKey = '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';
        AWS.config.update({ accessKeyId: 'AKIAIN6RGF7ORLQSZTBA', secretAccessKey: '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' });
        AWS.config.region = 'us-east-1';
        var S3 = new AWS.S3();
        console.log("S3 executed");
        var params = { Bucket: 'angular2docuploadtest1', Key: 'fileFromAngularApp', Body: file };
        S3.upload(params, function (error, data) {
            console.log("S3 upload executed");
            if (error) {
                console.log("Error:..", error);
            }
            else {
                console.log("Successfully uploaded.. " + data + " ..to myBucket/myKey");
            }
        });
    };
    DocumentManagementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocumentManagementService);
    return DocumentManagementService;
}());
exports.DocumentManagementService = DocumentManagementService;
