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
var router_deprecated_1 = require('@angular/router-deprecated');
var loginService_1 = require('./loginService');
var errorHandlingComponent_1 = require('../errorHandling/errorHandlingComponent');
var LoginComponent = (function () {
    // constructor to initiate any imported service or angular service.
    function LoginComponent(loginService, router, fb) {
        this.loginService = loginService;
        this.router = router;
        this.showError = false;
        this.form = fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            clientid: ['', forms_1.Validators.required]
        });
    }
    // on click of login button, the email n password are taken to backend server via 
    // loginService and on success of login, the page is routed to dashboard page
    /* onSubmit(email, password) {
       this.loginService.login(email, password).subscribe((result) => {
         if (result) {
           this.router.navigate(['Dashboard']);
           
         }
         console.log(result);
       });
     }*/
    // temporary submit method to navigate to dashboard page
    LoginComponent.prototype.onSubmit = function (value) {
        console.log('credentials: ', value.username);
        if (value.username === 'admin' && value.password === 'admin' && value.clientid === '123') {
            this.router.navigate(['FleetOperate']);
        }
        else {
            console.log('wrong credentials');
            this.router.navigate(['Login']);
        }
    };
    // error message
    LoginComponent.prototype.error = function (status) {
        if (status == 200) {
            this.showError = false;
        }
        else {
            this.broadcastLoginError = status;
            this.showError = true;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/login/loginTemplate.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, errorHandlingComponent_1.ErrorHandlingComponent]
        }), 
        __metadata('design:paramtypes', [loginService_1.LoginService, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, forms_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map