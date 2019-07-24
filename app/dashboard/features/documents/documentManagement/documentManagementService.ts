import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

declare const AWS: any;

@Injectable()
export class DocumentManagementService {

    private url1 = 'http://fleetoperate.s3.amazonaws.com';
    private urlPost = 'http://localhost:8082/fleetops/document/upload';

    progress: any;
    progressObserver: any;
    serverResponse: any;

    constructor(private _http: Http) {
       /* this.progress = Observable.create(observer => {
            this.progressObserver = observer
        }).share();*/
    }

    username: any = "user"
    password: any = "0adc8109-d16f-4832-a4e6-a57b12525ec0"

     postDocument(documentDetails: any, file: File[]){
        return Observable.create(observer =>{
            let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
            console.log("Inside service the documents are:..", file)
            console.log("Inside service documentDetails are:..", documentDetails)
            for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i] );
      }
            let data = JSON.stringify(documentDetails);
            console.log("Inside service data are:..", data)
            formData.append("document",data);
           formData.append('Content-Type','multipart/form-data');
           formData.append('Authorization', 'Basic '+window.btoa(this.username+':'+this.password));
            formData.append('Content-Type','application/json');
            formData.append('Accept', 'application/json');
            xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.serverResponse = xhr.response;
                    observer.next(this.serverResponse);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

       /* xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);

            this.progressObserver.next(this.progress);
        };*/

        xhr.open('POST', this.urlPost, true);
        xhr.send(formData);
        })
    }

    private handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || "Server error");
    }

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

    postDocToS3(file){
         console.log("postDocToS3 executed");
        // AWS.config.accessKeyId = 'AKIAJICTTRMRIVP6RZ2A';

      //  AWS.config.secretAccessKey = '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';
      AWS.config.update({ accessKeyId: 'AKIAIN6RGF7ORLQSZTBA', secretAccessKey: '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' });
        AWS.config.region = 'us-east-1';

         var S3 = new AWS.S3();
        console.log("S3 executed");
        var params = {Bucket: 'angular2docuploadtest1', Key: 'fileFromAngularApp', Body: file};

        S3.upload(params, function(error, data){
            console.log("S3 upload executed");
            if (error){   
          console.log("Error:..",error)     

            }else{
                console.log("Successfully uploaded.. "+ data +" ..to myBucket/myKey");
            }
        })
    
    }
}