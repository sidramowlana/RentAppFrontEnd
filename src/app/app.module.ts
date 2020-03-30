import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { CustVehicleListComponent } from './views/home/cust-vehicle-list/cust-vehicle-list.component';
import { CustVehicleDetailsComponent } from './views/home/cust-vehicle-details/cust-vehicle-details.component';
import { CustomerComponent } from './customer/customer.component';
import { FilterPipe } from './pipes/filter.pipe';


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
    CustVehicleListComponent,
    CustVehicleDetailsComponent,
    CustomerComponent,
    FilterPipe 
  ],

  imports: [
    NgSelectModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
    ],
  providers: [AuthenticationService,
    TokenStorageService,
    UserService,
    VehicleTypeService,
    AuthGuardService,
    EquipmentService,
    VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
