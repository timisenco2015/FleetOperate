import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
//import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { routing, appRoutingProviders }  from './app.routes';
import 'rxjs/Rx';  // Load all features such as map, etc for observables

import { AppComponent }  from './app.component';{}
import {LoginComponent} from './login/loginComponent';
import {FleetService} from './dashboard/features/fleet/fleetList/fleetListService';
import {LoginService} from './login/loginService';
//import {LoggedInRouterOutlet} from './login/loggedInRouterOutlet';
import {FleetOperateComponent} from './fleetOperate/fleetOperateComponent';
import {DriverService} from './dashboard/features/drivers/driverService';
import {DriverSummaryService} from './dashboard/features/drivers/driverSummary/driverSummaryService';
import {TrailerService} from './dashboard/features/trailers/trailerList/trailerListService';
import {TrailerSummaryService} from './dashboard/features/trailers/trailerSummary/trailerSummaryService';
import {DriverGeneralService} from './dashboard/features/drivers/driverGeneral/driverGeneralService';
import {DriverLogService} from './dashboard/features/drivers/driverLog/driverLogService';
import {DocumentService} from './dashboard/features/documents/documentList/documentListService';
import {DocumentManagementService} from './dashboard/features/documents/documentManagement/documentManagementService';
import {TruckSettingsService} from './dashboard/features/settings/truckSettings/truckSettingsService'; 
import {TrailerSettingsService} from './dashboard/features/settings/trailerSettings/trailerSettingsService';
import {DriverSettingsService} from './dashboard/features/settings/driverSettings/driverSettingsService';
import {TripPlannerService} from './dashboard/features/tripPlanner/tripPlannerService';
import {AppService} from './app.service';
import {FleetOperateService} from './fleetOperate/fleetOperateService';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NonsubscribedServiceComponent} from './nonsubscribedServiceHandler/nonsubscribedServiceComponent';
import {ErrorHandlingComponent} from './errorHandling/errorHandlingComponent';
import {FleetListComponent} from './dashboard/features/fleet/fleetList/fleetListComponent';
import {FleetGeneralComponent} from './dashboard/features/fleet/fleetGeneral/fleetGeneralComponent';
import {FleetDriverInfoComponent} from './dashboard/features/fleet/fleetDriverInfo/fleetDriverInfoComponent';
import {FleetDocumentsComponent} from './dashboard/features/fleet/fleetDocuments/fleetDocumentsComponent';
import {FleetDiagnosticsComponent} from './dashboard/features/fleet/fleetDiagnostics/fleetDiagnosticsComponent';
import {DriverGeneralComponent} from './dashboard/features/drivers/driverGeneral/driverGeneralComponent';
import {DriverListComponent} from './dashboard/features/drivers/driverList/driverListComponent';
import {DriverHomeComponent} from './dashboard/features/drivers/driverHome/driverHomeComponent';

import {DriverLogComponent} from './dashboard/features/drivers/driverLog/driverLogComponent';
import {DriverSummaryComponent} from './dashboard/features/drivers/driverSummary/driverSummaryComponent';
import {TrailerListComponent} from './dashboard/features/trailers/trailerList/trailerListComponent';
import {TrailerMapComponent} from './dashboard/features/trailers/trailerMap/trailerMapComponent';
import {TrailerSummaryComponent} from './dashboard/features/trailers/trailerSummary/trailerSummaryComponent';
import {DocumentDetailsComponent} from './dashboard/features/documents/documentDetails/documentDetailsComponent';
import {DocumentListComponent} from './dashboard/features/documents/documentList/documentListComponent';
import {DocumentManagementComponent} from './dashboard/features/documents/documentManagement/documentManagementComponent';
import {PlanTripComponent} from './dashboard/features/tripPlanner/planTrip/planTripComponent';
import {CurrentTripComponent} from './dashboard/features/tripPlanner/currentTrip/currentTripComponent';
import {CurrentTripListComponent} from './dashboard/features/tripPlanner/currentTrip/currentTripList/currentTripListComponent';
import {EditCurrentTripComponent} from './dashboard/features/tripPlanner/currentTrip/editCurrentTrip/editCurrentTripComponent';
import {CompleteTripComponent} from './dashboard/features/tripPlanner/completedTrip/completedTripComponent';
import {DriverSettingsComponent} from './dashboard/features/settings/driverSettings/driverSettingsComponent';
import {DriverSettingsSearchBarComponent} from './dashboard/features/settings/driverSettings/driverSettingsSearchBar/driverSettingsSearchBarComponent';
import {DriverSettingsListComponent} from './dashboard/features/settings/driverSettings/driverSettingsList/driverSettingsListComponent';
import {DriverSettingsEditComponent} from './dashboard/features/settings/driverSettings/driverSettingsEdit/driverSettingsEditComponent';
import {DriverSettingsAddComponent} from './dashboard/features/settings/driverSettings/driverSettingsAdd/driverSettingsAddComponent';
import {TrailerSettingsComponent} from './dashboard/features/settings/trailerSettings/trailerSettingsComponent';
import {TrailerSettingsSearchBarComponent} from './dashboard/features/settings/trailerSettings/trailerSettingsSearchBar/trailerSettingsSearchBarComponent';
import {TrailerSettingsListComponent} from './dashboard/features/settings/trailerSettings/trailerSettingsList/trailerSettingsListComponent';
import {TrailerSettingsEditComponent} from './dashboard/features/settings/trailerSettings/trailerSettingsEdit/trailerSettingsEditComponent';
import {TrailerSettingsAddComponent} from './dashboard/features/settings/trailerSettings/trailerSettingsAdd/trailerSettingsAddComponent';
import {TruckSettingsComponent} from './dashboard/features/settings/truckSettings/truckSettingsComponent';
import {TruckSettingsSearchBarComponent} from './dashboard/features/settings/truckSettings/truckSettingsSearchBar/truckSettingsSearchBarComponent';
import {TruckSettingsListComponent} from './dashboard/features/settings/truckSettings/truckSettingsList/truckSettingsListComponent';
import {TruckSettingsEditComponent} from './dashboard/features/settings/truckSettings/truckSettingsEdit/truckSettingsEditComponent';
import {TruckSettingsAddComponent} from './dashboard/features/settings/truckSettings/truckSettingsAdd/truckSettingsAddComponent';
import {ControlCenterComponent} from './dashboard/features/controlCenter/controlCenterComponent';
import {FleetFilterPipe } from './dashboard/features/fleet/fleetList/fleetListFilter';
import {StatusFilterPipe} from './dashboard/features/fleet/fleetList/fleetStatusFilter';
import {FleetMapComponent} from './dashboard/features/fleet/fleetMap/fleetMapComponent';
import {LoginAuthManager} from './login/loginAuthManager';
import {LoginAuthenticationMessageComponent} from'./login/loginAuthenticationMessageComponent';
import {ControlCenterService} from './dashboard/features/controlCenter/controlCenterService';
import { CreateAccountComponent } from "./createAccount/createAccountComponent";
import { CreateAccountService } from "./createAccount/createAccountService";
import { UserSignUpService } from "./userSignUp/userSignUpService";
import { UserSignUpComponent } from "./userSignUp/userSignUpComponent";
import { ForgotPasswordComponent } from "./forgotPassword/forgotPasswordComponent";
import { ForgotPasswordService } from "./forgotPassword/forgotPasswordService";
import { ConfirmDriverComponent } from "./dashboard/features/settings/driverSettings/driverSettingsConfirmDriver/confirmDriverComponent";
import { UserFirstTimeLogInService } from "./userFirstTimeLogIn/userFirstTimeLogInService";
import { UserFirstTimeLogInComponent } from "./userFirstTimeLogIn/userFirstTimeLogInComponent";
import { DriverMapComponent } from "./dashboard/features/drivers/driverMap/driverMapComponent";
import { DriverAddComponent } from "./dashboard/features/drivers/driverAdd/driverAddComponent";
import { DriverEditComponent } from "./dashboard/features/drivers/driverEdit/driverEditComponent";
import { DriverGraphComponent } from "./dashboard/features/drivers/driverGraph/driverGraphComponent";
import { CompanyComponent } from "./dashboard/features/company/companyComponent";
import { CreateCompanyAdminOrdersComponent } from "./createAccount/createCompanyAdminOrders/createCompanyAdminOrdersComponent";
import { BillingComponent } from "./createAccount/billing/billingComponent";
import { AdminProfileComponent } from "./createAccount/adminProfile/adminProfileComponent";
import { AdminEmailVerificationComponent } from "./createAccount/adminEmailVerification/adminEmailVerficationComponent";
import { SubscriptionComponent } from "./createAccount/subscription/subscriptionComponent";
import { CompanyProfileComponent } from "./createAccount/companyProfile/companyProfileComponent";
import { ShippingComponent } from "./createAccount/shipping/shippingComponent";
import { PaymentComponent } from "./createAccount/payment/paymentComponent";
import { PaymentConfirmationComponent } from "./createAccount/paymentConfirmation/paymentConfirmationComponent";
import { CompleteCompanyAccountComponent } from "./completeCompanyAccount/completeCompanyAccountComponent";
import { CompanyService } from "./dashboard/features/company/companyService";
import { CompanyInfoComponent } from "./dashboard/features/company/companyInfo/companyInfoComponent";
import { AdminUserComponent } from "./dashboard/features/company/adminUsers/adminUserComponent";
import { BillingPaymentComponent } from "./dashboard/features/company/billingPayment/billingPaymentComponent";
import { TemporaryMessageComponent } from "./temporaryMessage/temporaryMessageComponent";
import { SubscriptionService } from "./createAccount/subscription/subscriptionService";
import { PaymentService } from "./createAccount/payment/paymentService";

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, routing],
  declarations: [ AppComponent, LoginComponent,DriverHomeComponent, FleetOperateComponent, DashboardComponent, NonsubscribedServiceComponent,
                 ErrorHandlingComponent,DriverAddComponent,DriverEditComponent, FleetListComponent, FleetGeneralComponent, FleetDriverInfoComponent,
                 FleetDocumentsComponent, FleetDiagnosticsComponent, DriverGeneralComponent, DriverListComponent,
                 DriverLogComponent, DriverSummaryComponent, TrailerListComponent, TrailerMapComponent, TrailerSummaryComponent,
                 DocumentDetailsComponent, DocumentListComponent, DocumentManagementComponent, PlanTripComponent, CurrentTripComponent,
                 CurrentTripListComponent, FleetFilterPipe, StatusFilterPipe, FleetMapComponent, LoginAuthenticationMessageComponent,
                 EditCurrentTripComponent, CompleteTripComponent, DriverSettingsComponent, DriverSettingsSearchBarComponent,
                 DriverSettingsSearchBarComponent, DriverSettingsListComponent, DriverSettingsEditComponent, DriverSettingsAddComponent,
                 TrailerSettingsComponent, TrailerSettingsSearchBarComponent, TrailerSettingsListComponent, TrailerSettingsEditComponent,
                 TrailerSettingsAddComponent, TruckSettingsComponent, TruckSettingsSearchBarComponent, TruckSettingsListComponent,
                 TruckSettingsEditComponent, TruckSettingsAddComponent, ControlCenterComponent, CreateAccountComponent,
                 UserSignUpComponent, UserFirstTimeLogInComponent, ForgotPasswordComponent, ConfirmDriverComponent, DriverMapComponent,
                 DriverGraphComponent, CompanyComponent, CreateCompanyAdminOrdersComponent, BillingComponent,
                 AdminProfileComponent, AdminEmailVerificationComponent, SubscriptionComponent, CompanyProfileComponent,
                 ShippingComponent, PaymentComponent, PaymentConfirmationComponent, CompleteCompanyAccountComponent,
                 CompanyInfoComponent, AdminUserComponent, BillingPaymentComponent,TemporaryMessageComponent],
  bootstrap:    [ AppComponent  ],
  providers:    [ appRoutingProviders, FleetService, LoginService, LoginAuthManager, 
                DriverService, DriverSummaryService, TrailerService, TrailerSummaryService,
                DriverGeneralService, DriverLogService, DocumentService, ControlCenterService,
                DocumentManagementService, TruckSettingsService, TrailerSettingsService, 
                DriverSettingsService, TripPlannerService, AppService, FleetOperateService, CreateAccountService,
                UserSignUpService, UserFirstTimeLogInService, ForgotPasswordService,
                CompanyService, SubscriptionService, PaymentService,
                { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('X-CSRF-Token', 'headers')}]
})

export class AppModule { }