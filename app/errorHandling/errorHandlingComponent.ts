import {Component, OnInit, OnChanges, Input} from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: 'app/errorHandling/errorHandlingTemplate.html'
})

export class ErrorHandlingComponent implements OnInit, OnChanges {

    private errorMessage: string;
    @Input()  loginErrorCode: number;
    @Input()  errorCode: number;

    ngOnInit() {
        if(this.loginErrorCode != null){
            this.loginErrors(this.loginErrorCode);
        }else if(this.errorCode != null){
            this.dashboardError(this.errorCode);
        }
  
    }

    ngOnChanges(){
        if(this.loginErrorCode != null){
            this.loginErrors(this.loginErrorCode);
        }else if(this.errorCode != null){
            this.dashboardError(this.errorCode);
        }
    }

    loginErrors(errorCode){
        //console.log("login error executed..", errorCode)
        if (errorCode == 401 && 403) {
            this.errorMessage = "Username and Password does not match, please enter valid Username and Password and try again."
        }
        // remove this else section later, used only for development
        else{
            this.errorMessage = "Username and Password does not match, please enter valid Username and Password and try again.."
        }
    }

    dashboardError(errorCode){
        //console.log("dashboardError executed..", errorCode)
        window.scrollTo(0, 0);
        if (errorCode == 401 && 403 && 503 && 504 && 408) {
            this.errorMessage = "Session timeout, please login again.";
        }else{
            this.errorMessage = "Connection error, please try after some time."
        }
    }
}