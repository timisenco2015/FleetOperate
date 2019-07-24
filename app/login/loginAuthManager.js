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
var router_1 = require('@angular/router');
var loginService_1 = require('./loginService');
//import {LoginAuthenticationMessageComponent} from'./loginAuthenticationMessageComponent';
var LoginAuthManager = (function () {
    //alreadyLoggedMsg = new Observable();
    //loginMsg = new Observable();
    function LoginAuthManager(router, loginService) {
        this.router = router;
        this.loginService = loginService;
    }
    LoginAuthManager.prototype.canActivate = function (activatedRoute, state) {
        if (activatedRoute.url[0].path == 'login') {
            if (window.localStorage.getItem('token_1') && sessionStorage.getItem('token_1')) {
                //console.log('already logged in..');
                window.alert('You are already logged in !');
                // this.loginAuthMsg.displayAlreadyLoggedMsg();
                //this.alreadyLoggedMsg.map(this.displayMsg)
                this.router.navigate(['fleetoperate']);
                // this.loginService.navigateToFleetoperatePage();
                return false;
            }
            else
                return true;
        }
        /* if(activatedRoute.url[0].path == 'fleetoperate'){
             if(window.localStorage.getItem('auth_token')){
                 console.log('already logged in..',activatedRoute );
                 //this.router.navigate(['fleetoperate/10'])
                 return true;
             }else
                 return false;
             
         }*/
        if (window.localStorage.getItem('token_1') && sessionStorage.getItem('token_1'))
            // console.log('')
            return true;
        // console.log('please login')
        //this.loginAuthMsg.displayLoginMsg();
        //this.loginMsg.map(this.displayMsg)
        this.router.navigate(['login']);
        window.alert('Please Login to use the service !');
        return false;
    };
    LoginAuthManager.prototype.displayMsg = function () {
        return "displayMsg";
    };
    LoginAuthManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, loginService_1.LoginService])
    ], LoginAuthManager);
    return LoginAuthManager;
}());
exports.LoginAuthManager = LoginAuthManager;
