"use strict";
var router_1 = require('@angular/router');
var loginComponent_1 = require('./login/loginComponent');
var fleetOperateComponent_1 = require('./fleetOperate/fleetOperateComponent');
var loginAuthManager_1 = require('./login/loginAuthManager');
var createAccountComponent_1 = require("./createAccount/createAccountComponent");
var forgotPasswordComponent_1 = require("./forgotPassword/forgotPasswordComponent");
var userFirstTimeLogInComponent_1 = require("./userFirstTimeLogIn/userFirstTimeLogInComponent");
var appRoutes = [
    { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [loginAuthManager_1.LoginAuthManager] },
    { path: 'login', component: loginComponent_1.LoginComponent, canActivate: [loginAuthManager_1.LoginAuthManager] },
    { path: 'fleetoperate', component: fleetOperateComponent_1.FleetOperateComponent, canActivate: [loginAuthManager_1.LoginAuthManager] },
    { path: 'createAccount', component: createAccountComponent_1.CreateAccountComponent },
    //{ path: 'userSignUp', component: UserSignUpComponent },
    { path: 'userFirstTimeLogIn', component: userFirstTimeLogInComponent_1.UserFirstTimeLogInComponent },
    { path: 'forgotPassword', component: forgotPasswordComponent_1.ForgotPasswordComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
