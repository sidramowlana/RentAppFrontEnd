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
import { RentComponent } from './views/rent/rent.component';
import { EquipmentsComponent } from './views/vehicle/equipments/equipments.component';
import { TableComponent } from './views/vehicle/types/table/table.component';
import { EquipmentFormComponent } from './views/vehicle/equipments/equipment-form/equipment-form.component';
import { EquipmentListComponent } from './views/vehicle/equipments/equipment-list/equipment-list.component';
import { EquipmentItemComponent } from './views/vehicle/equipments/equipment-list/equipment-item/equipment-item.component';
import { EquipmentService } from './services/equipment.service';
import { EquipmentDetailComponent } from './views/vehicle/equipments/equipment-detail/equipment-detail.component';
import { StartEmptyComponent } from './views/vehicle/equipments/start-empty/start-empty.component';

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
    RentComponent,
    TableComponent,
    EquipmentsComponent,
    EquipmentFormComponent,
    EquipmentListComponent,
    EquipmentItemComponent,
    EquipmentDetailComponent,
    StartEmptyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule  
  ],
  providers: [AuthenticationService,TokenStorageService,UserService,VehicleTypeService,AuthGuardService,EquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
