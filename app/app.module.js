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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
//import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
var app_routes_1 = require('./app.routes');
require('rxjs/Rx'); // Load all features such as map, etc for observables
var app_component_1 = require('./app.component');
{ }
var loginComponent_1 = require('./login/loginComponent');
var fleetListService_1 = require('./dashboard/features/fleet/fleetList/fleetListService');
var loginService_1 = require('./login/loginService');
//import {LoggedInRouterOutlet} from './login/loggedInRouterOutlet';
var fleetOperateComponent_1 = require('./fleetOperate/fleetOperateComponent');
var driverService_1 = require('./dashboard/features/drivers/driverService');
var driverSummaryService_1 = require('./dashboard/features/drivers/driverSummary/driverSummaryService');
var trailerListService_1 = require('./dashboard/features/trailers/trailerList/trailerListService');
var trailerSummaryService_1 = require('./dashboard/features/trailers/trailerSummary/trailerSummaryService');
var driverGeneralService_1 = require('./dashboard/features/drivers/driverGeneral/driverGeneralService');
var driverLogService_1 = require('./dashboard/features/drivers/driverLog/driverLogService');
var documentListService_1 = require('./dashboard/features/documents/documentList/documentListService');
var documentManagementService_1 = require('./dashboard/features/documents/documentManagement/documentManagementService');
var truckSettingsService_1 = require('./dashboard/features/settings/truckSettings/truckSettingsService');
var trailerSettingsService_1 = require('./dashboard/features/settings/trailerSettings/trailerSettingsService');
var driverSettingsService_1 = require('./dashboard/features/settings/driverSettings/driverSettingsService');
var tripPlannerService_1 = require('./dashboard/features/tripPlanner/tripPlannerService');
var app_service_1 = require('./app.service');
var fleetOperateService_1 = require('./fleetOperate/fleetOperateService');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var nonsubscribedServiceComponent_1 = require('./nonsubscribedServiceHandler/nonsubscribedServiceComponent');
var errorHandlingComponent_1 = require('./errorHandling/errorHandlingComponent');
var fleetListComponent_1 = require('./dashboard/features/fleet/fleetList/fleetListComponent');
var fleetGeneralComponent_1 = require('./dashboard/features/fleet/fleetGeneral/fleetGeneralComponent');
var fleetDriverInfoComponent_1 = require('./dashboard/features/fleet/fleetDriverInfo/fleetDriverInfoComponent');
var fleetDocumentsComponent_1 = require('./dashboard/features/fleet/fleetDocuments/fleetDocumentsComponent');
var fleetDiagnosticsComponent_1 = require('./dashboard/features/fleet/fleetDiagnostics/fleetDiagnosticsComponent');
var driverGeneralComponent_1 = require('./dashboard/features/drivers/driverGeneral/driverGeneralComponent');
var driverListComponent_1 = require('./dashboard/features/drivers/driverList/driverListComponent');
var driverHomeComponent_1 = require('./dashboard/features/drivers/driverHome/driverHomeComponent');
var driverLogComponent_1 = require('./dashboard/features/drivers/driverLog/driverLogComponent');
var driverSummaryComponent_1 = require('./dashboard/features/drivers/driverSummary/driverSummaryComponent');
var trailerListComponent_1 = require('./dashboard/features/trailers/trailerList/trailerListComponent');
var trailerMapComponent_1 = require('./dashboard/features/trailers/trailerMap/trailerMapComponent');
var trailerSummaryComponent_1 = require('./dashboard/features/trailers/trailerSummary/trailerSummaryComponent');
var documentDetailsComponent_1 = require('./dashboard/features/documents/documentDetails/documentDetailsComponent');
var documentListComponent_1 = require('./dashboard/features/documents/documentList/documentListComponent');
var documentManagementComponent_1 = require('./dashboard/features/documents/documentManagement/documentManagementComponent');
var planTripComponent_1 = require('./dashboard/features/tripPlanner/planTrip/planTripComponent');
var currentTripComponent_1 = require('./dashboard/features/tripPlanner/currentTrip/currentTripComponent');
var currentTripListComponent_1 = require('./dashboard/features/tripPlanner/currentTrip/currentTripList/currentTripListComponent');
var editCurrentTripComponent_1 = require('./dashboard/features/tripPlanner/currentTrip/editCurrentTrip/editCurrentTripComponent');
var completedTripComponent_1 = require('./dashboard/features/tripPlanner/completedTrip/completedTripComponent');
var driverSettingsComponent_1 = require('./dashboard/features/settings/driverSettings/driverSettingsComponent');
var driverSettingsSearchBarComponent_1 = require('./dashboard/features/settings/driverSettings/driverSettingsSearchBar/driverSettingsSearchBarComponent');
var driverSettingsListComponent_1 = require('./dashboard/features/settings/driverSettings/driverSettingsList/driverSettingsListComponent');
var driverSettingsEditComponent_1 = require('./dashboard/features/settings/driverSettings/driverSettingsEdit/driverSettingsEditComponent');
var driverSettingsAddComponent_1 = require('./dashboard/features/settings/driverSettings/driverSettingsAdd/driverSettingsAddComponent');
var trailerSettingsComponent_1 = require('./dashboard/features/settings/trailerSettings/trailerSettingsComponent');
var trailerSettingsSearchBarComponent_1 = require('./dashboard/features/settings/trailerSettings/trailerSettingsSearchBar/trailerSettingsSearchBarComponent');
var trailerSettingsListComponent_1 = require('./dashboard/features/settings/trailerSettings/trailerSettingsList/trailerSettingsListComponent');
var trailerSettingsEditComponent_1 = require('./dashboard/features/settings/trailerSettings/trailerSettingsEdit/trailerSettingsEditComponent');
var trailerSettingsAddComponent_1 = require('./dashboard/features/settings/trailerSettings/trailerSettingsAdd/trailerSettingsAddComponent');
var truckSettingsComponent_1 = require('./dashboard/features/settings/truckSettings/truckSettingsComponent');
var truckSettingsSearchBarComponent_1 = require('./dashboard/features/settings/truckSettings/truckSettingsSearchBar/truckSettingsSearchBarComponent');
var truckSettingsListComponent_1 = require('./dashboard/features/settings/truckSettings/truckSettingsList/truckSettingsListComponent');
var truckSettingsEditComponent_1 = require('./dashboard/features/settings/truckSettings/truckSettingsEdit/truckSettingsEditComponent');
var truckSettingsAddComponent_1 = require('./dashboard/features/settings/truckSettings/truckSettingsAdd/truckSettingsAddComponent');
var controlCenterComponent_1 = require('./dashboard/features/controlCenter/controlCenterComponent');
var fleetListFilter_1 = require('./dashboard/features/fleet/fleetList/fleetListFilter');
var fleetStatusFilter_1 = require('./dashboard/features/fleet/fleetList/fleetStatusFilter');
var fleetMapComponent_1 = require('./dashboard/features/fleet/fleetMap/fleetMapComponent');
var loginAuthManager_1 = require('./login/loginAuthManager');
var loginAuthenticationMessageComponent_1 = require('./login/loginAuthenticationMessageComponent');
var controlCenterService_1 = require('./dashboard/features/controlCenter/controlCenterService');
var createAccountComponent_1 = require("./createAccount/createAccountComponent");
var createAccountService_1 = require("./createAccount/createAccountService");
var userSignUpService_1 = require("./userSignUp/userSignUpService");
var userSignUpComponent_1 = require("./userSignUp/userSignUpComponent");
var forgotPasswordComponent_1 = require("./forgotPassword/forgotPasswordComponent");
var forgotPasswordService_1 = require("./forgotPassword/forgotPasswordService");
var confirmDriverComponent_1 = require("./dashboard/features/settings/driverSettings/driverSettingsConfirmDriver/confirmDriverComponent");
var userFirstTimeLogInService_1 = require("./userFirstTimeLogIn/userFirstTimeLogInService");
var userFirstTimeLogInComponent_1 = require("./userFirstTimeLogIn/userFirstTimeLogInComponent");
var driverMapComponent_1 = require("./dashboard/features/drivers/driverMap/driverMapComponent");
var driverAddComponent_1 = require("./dashboard/features/drivers/driverAdd/driverAddComponent");
var driverEditComponent_1 = require("./dashboard/features/drivers/driverEdit/driverEditComponent");
var driverGraphComponent_1 = require("./dashboard/features/drivers/driverGraph/driverGraphComponent");
var companyComponent_1 = require("./dashboard/features/company/companyComponent");
var createCompanyAdminOrdersComponent_1 = require("./createAccount/createCompanyAdminOrders/createCompanyAdminOrdersComponent");
var billingComponent_1 = require("./createAccount/billing/billingComponent");
var adminProfileComponent_1 = require("./createAccount/adminProfile/adminProfileComponent");
var adminEmailVerficationComponent_1 = require("./createAccount/adminEmailVerification/adminEmailVerficationComponent");
var subscriptionComponent_1 = require("./createAccount/subscription/subscriptionComponent");
var companyProfileComponent_1 = require("./createAccount/companyProfile/companyProfileComponent");
var shippingComponent_1 = require("./createAccount/shipping/shippingComponent");
var paymentComponent_1 = require("./createAccount/payment/paymentComponent");
var paymentConfirmationComponent_1 = require("./createAccount/paymentConfirmation/paymentConfirmationComponent");
var completeCompanyAccountComponent_1 = require("./completeCompanyAccount/completeCompanyAccountComponent");
var companyService_1 = require("./dashboard/features/company/companyService");
var companyInfoComponent_1 = require("./dashboard/features/company/companyInfo/companyInfoComponent");
var adminUserComponent_1 = require("./dashboard/features/company/adminUsers/adminUserComponent");
var billingPaymentComponent_1 = require("./dashboard/features/company/billingPayment/billingPaymentComponent");
var temporaryMessageComponent_1 = require("./temporaryMessage/temporaryMessageComponent");
var subscriptionService_1 = require("./createAccount/subscription/subscriptionService");
var paymentService_1 = require("./createAccount/payment/paymentService");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, http_1.JsonpModule, app_routes_1.routing],
            declarations: [app_component_1.AppComponent, loginComponent_1.LoginComponent, driverHomeComponent_1.DriverHomeComponent, fleetOperateComponent_1.FleetOperateComponent, dashboard_component_1.DashboardComponent, nonsubscribedServiceComponent_1.NonsubscribedServiceComponent,
                errorHandlingComponent_1.ErrorHandlingComponent, driverAddComponent_1.DriverAddComponent, driverEditComponent_1.DriverEditComponent, fleetListComponent_1.FleetListComponent, fleetGeneralComponent_1.FleetGeneralComponent, fleetDriverInfoComponent_1.FleetDriverInfoComponent,
                fleetDocumentsComponent_1.FleetDocumentsComponent, fleetDiagnosticsComponent_1.FleetDiagnosticsComponent, driverGeneralComponent_1.DriverGeneralComponent, driverListComponent_1.DriverListComponent,
                driverLogComponent_1.DriverLogComponent, driverSummaryComponent_1.DriverSummaryComponent, trailerListComponent_1.TrailerListComponent, trailerMapComponent_1.TrailerMapComponent, trailerSummaryComponent_1.TrailerSummaryComponent,
                documentDetailsComponent_1.DocumentDetailsComponent, documentListComponent_1.DocumentListComponent, documentManagementComponent_1.DocumentManagementComponent, planTripComponent_1.PlanTripComponent, currentTripComponent_1.CurrentTripComponent,
                currentTripListComponent_1.CurrentTripListComponent, fleetListFilter_1.FleetFilterPipe, fleetStatusFilter_1.StatusFilterPipe, fleetMapComponent_1.FleetMapComponent, loginAuthenticationMessageComponent_1.LoginAuthenticationMessageComponent,
                editCurrentTripComponent_1.EditCurrentTripComponent, completedTripComponent_1.CompleteTripComponent, driverSettingsComponent_1.DriverSettingsComponent, driverSettingsSearchBarComponent_1.DriverSettingsSearchBarComponent,
                driverSettingsSearchBarComponent_1.DriverSettingsSearchBarComponent, driverSettingsListComponent_1.DriverSettingsListComponent, driverSettingsEditComponent_1.DriverSettingsEditComponent, driverSettingsAddComponent_1.DriverSettingsAddComponent,
                trailerSettingsComponent_1.TrailerSettingsComponent, trailerSettingsSearchBarComponent_1.TrailerSettingsSearchBarComponent, trailerSettingsListComponent_1.TrailerSettingsListComponent, trailerSettingsEditComponent_1.TrailerSettingsEditComponent,
                trailerSettingsAddComponent_1.TrailerSettingsAddComponent, truckSettingsComponent_1.TruckSettingsComponent, truckSettingsSearchBarComponent_1.TruckSettingsSearchBarComponent, truckSettingsListComponent_1.TruckSettingsListComponent,
                truckSettingsEditComponent_1.TruckSettingsEditComponent, truckSettingsAddComponent_1.TruckSettingsAddComponent, controlCenterComponent_1.ControlCenterComponent, createAccountComponent_1.CreateAccountComponent,
                userSignUpComponent_1.UserSignUpComponent, userFirstTimeLogInComponent_1.UserFirstTimeLogInComponent, forgotPasswordComponent_1.ForgotPasswordComponent, confirmDriverComponent_1.ConfirmDriverComponent, driverMapComponent_1.DriverMapComponent,
                driverGraphComponent_1.DriverGraphComponent, companyComponent_1.CompanyComponent, createCompanyAdminOrdersComponent_1.CreateCompanyAdminOrdersComponent, billingComponent_1.BillingComponent,
                adminProfileComponent_1.AdminProfileComponent, adminEmailVerficationComponent_1.AdminEmailVerificationComponent, subscriptionComponent_1.SubscriptionComponent, companyProfileComponent_1.CompanyProfileComponent,
                shippingComponent_1.ShippingComponent, paymentComponent_1.PaymentComponent, paymentConfirmationComponent_1.PaymentConfirmationComponent, completeCompanyAccountComponent_1.CompleteCompanyAccountComponent,
                companyInfoComponent_1.CompanyInfoComponent, adminUserComponent_1.AdminUserComponent, billingPaymentComponent_1.BillingPaymentComponent, temporaryMessageComponent_1.TemporaryMessageComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [app_routes_1.appRoutingProviders, fleetListService_1.FleetService, loginService_1.LoginService, loginAuthManager_1.LoginAuthManager,
                driverService_1.DriverService, driverSummaryService_1.DriverSummaryService, trailerListService_1.TrailerService, trailerSummaryService_1.TrailerSummaryService,
                driverGeneralService_1.DriverGeneralService, driverLogService_1.DriverLogService, documentListService_1.DocumentService, controlCenterService_1.ControlCenterService,
                documentManagementService_1.DocumentManagementService, truckSettingsService_1.TruckSettingsService, trailerSettingsService_1.TrailerSettingsService,
                driverSettingsService_1.DriverSettingsService, tripPlannerService_1.TripPlannerService, app_service_1.AppService, fleetOperateService_1.FleetOperateService, createAccountService_1.CreateAccountService,
                userSignUpService_1.UserSignUpService, userFirstTimeLogInService_1.UserFirstTimeLogInService, forgotPasswordService_1.ForgotPasswordService,
                companyService_1.CompanyService, subscriptionService_1.SubscriptionService, paymentService_1.PaymentService,
                { provide: http_1.XSRFStrategy, useValue: new http_1.CookieXSRFStrategy('X-CSRF-Token', 'headers') }]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
