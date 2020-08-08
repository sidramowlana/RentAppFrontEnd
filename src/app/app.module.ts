import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './views/header/header.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/tokenStorage.service';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { UserService } from './services/user.service';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { VehicleComponent } from './views/vehicle/vehicle.component';
import { VehiclesComponent } from './views/vehicle/vehicles/vehicles.component';
import { TypesComponent } from './views/vehicle/types/types.component';
import { VehicleTypeService } from './services/vehicleType.service';
import { HomeComponent } from './views/home/home.component';
import { AuthGuardService } from './services/authgaurd.service';
import { EquipmentsComponent } from './views/vehicle/equipments/equipments.component';
import { TableComponent } from './views/vehicle/types/table/table.component';
import { EquipmentFormComponent } from './views/vehicle/equipments/equipment-form/equipment-form.component';
import { EquipmentListComponent } from './views/vehicle/equipments/equipment-list/equipment-list.component';
import { EquipmentItemComponent } from './views/vehicle/equipments/equipment-list/equipment-item/equipment-item.component';
import { EquipmentService } from './services/equipment.service';
import { EquipmentDetailComponent } from './views/vehicle/equipments/equipment-detail/equipment-detail.component';
import { StartEmptyComponent } from './views/vehicle/equipments/start-empty/start-empty.component';
import { CustomerRentComponent } from './views/customer-rent/customer-rent.component';
import { VehicleFormComponent } from './views/vehicle/vehicles/vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleListComponent } from './views/vehicle/vehicles/vehicle-list/vehicle-list.component';
import { VehicleItemComponent } from './views/vehicle/vehicles/vehicle-list/vehicle-item/vehicle-item.component';
import { VehicleDetailsComponent } from './views/vehicle/vehicles/vehicle-details/vehicle-details.component';
import { ResetPasswordComponent } from './views/profile/reset-password/reset-password.component';
import { CustVehicleDetailsComponent } from './views/home/cust-vehicle-details/cust-vehicle-details.component';
import { FilterVehiclePipe } from './pipes/filterVehicle.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RentService } from './services/rent.service';
import { ViewAllRentComponent } from './views/view-all-rent/view-all-rent.component';
import { BlackListService } from './services/blackList.service';
import { ViewAllBlacklistedComponent } from './views/view-all-blacklisted/view-all-blacklisted.component';
import { CustEquipmentDetailsComponent } from './views/home/cust-equipment-details/cust-equipment-details.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { FilterEquipmentPipe } from './pipes/filterEquipment.pipe';
import { AuthInterceptorProviders, AuthInterceptor } from './helper/authInterceptorProviders';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CompetitorsPriceComponent } from './admin-home/competitors-price/competitors-price.component';
import { Webscraping } from './services/webscraping.service';
import { FraudLicenseComponent } from './admin-home/fraud-license/fraud-license.component';
import { InsurerService } from './services/insurer.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    EditProfileComponent,
    VehicleComponent,
    VehiclesComponent,
    TypesComponent,
    HomeComponent,
    TableComponent,
    EquipmentsComponent,
    EquipmentFormComponent,
    EquipmentListComponent,
    EquipmentItemComponent,
    EquipmentDetailComponent,
    StartEmptyComponent,
    CustomerRentComponent,
    VehicleFormComponent,
    VehicleListComponent,
    VehicleItemComponent,
    VehicleDetailsComponent,
    ResetPasswordComponent,
    CustVehicleDetailsComponent,
    FilterVehiclePipe,
    FilterEquipmentPipe,
    ViewAllRentComponent,
    ViewAllBlacklistedComponent,
    CustEquipmentDetailsComponent,
    ContactUsComponent,
    AdminHomeComponent,
    CompetitorsPriceComponent,
    FraudLicenseComponent,
  ],

  imports: [
    NgSelectModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [AuthenticationService,AuthInterceptorProviders,
    TokenStorageService,
    UserService,
    VehicleTypeService,
    AuthGuardService,
    EquipmentService,
    VehicleService,
    RentService,
    BlackListService,Webscraping,InsurerService,
  {
    provide:HTTP_INTERCEPTORS, 
    useClass:AuthInterceptor, 
    multi:true
  },{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
