
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { VehicleComponent } from './views/vehicle/vehicle.component';
import { TypesComponent } from './views/vehicle/types/types.component';
import { VehiclesComponent } from './views/vehicle/vehicles/vehicles.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuardService } from './services/authgaurd.service';
import { EquipmentsComponent } from './views/vehicle/equipments/equipments.component';
import { EquipmentFormComponent } from './views/vehicle/equipments/equipment-form/equipment-form.component';
import { EquipmentDetailComponent } from './views/vehicle/equipments/equipment-detail/equipment-detail.component';
import { StartEmptyComponent } from './views/vehicle/equipments/start-empty/start-empty.component';
import { CustomerRentComponent } from './views/customer-rent/customer-rent.component';
import { VehicleFormComponent } from './views/vehicle/vehicles/vehicle-form/vehicle-form.component';
import { VehicleDetailsComponent } from './views/vehicle/vehicles/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './views/vehicle/vehicles/vehicle-list/vehicle-list.component';
import { ResetPasswordComponent } from './views/profile/reset-password/reset-password.component';
import { CustVehicleDetailsComponent } from './views/home/cust-vehicle-details/cust-vehicle-details.component';
import { ViewAllRentComponent } from './views/view-all-rent/view-all-rent.component';
import { ViewAllBlacklistedComponent } from './views/view-all-blacklisted/view-all-blacklisted.component';
import { CustEquipmentDetailsComponent } from './views/home/cust-equipment-details/cust-equipment-details.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CompetitorsPriceComponent } from './admin-home/competitors-price/competitors-price.component';
import { FraudLicenseComponent } from './admin-home/fraud-license/fraud-license.component';

const appRoutes: Routes =
    [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        {
            path: 'home', component: HomeComponent,
            children: [
                { path: '', component: VehicleListComponent },
                { path: ':id', component: CustVehicleDetailsComponent },
                { path: ':id/equipment/:id', component: CustEquipmentDetailsComponent }

            ]
        },
        {path:"adminHome",component:AdminHomeComponent,canActivate: [AuthGuardService],children:[
            {path:'',component:CompetitorsPriceComponent},
            {path:"competitve-price",component:CompetitorsPriceComponent},
            {path:"fraud-license",component:FraudLicenseComponent}
        ]},

        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'forgotPassword', component: ForgotPasswordComponent },
        { path: 'viewAllRent', component: ViewAllRentComponent, canActivate: [AuthGuardService] },
        { path: 'blackListUserRents', component: ViewAllBlacklistedComponent },
        { path: 'contactUs', component: ContactUsComponent },
        { path: 'vehicle', redirectTo: 'vehicle/vehicles', pathMatch: 'full' },

        {
            path: 'vehicle', component: VehiclesComponent, canActivate: [AuthGuardService], children:
                [
                    {
                        path: 'vehicles', component: VehicleComponent, children:
                            [
                                { path: 'new', component: VehicleComponent },
                                { path: '', component: VehicleListComponent },
                                { path: ':id', component: VehicleDetailsComponent },
                                { path: ':id/editVehicle', component: VehicleDetailsComponent },
                            ]
                    },
                    { path: 'types', component: TypesComponent },
                    {
                        path: 'equipments', component: EquipmentsComponent, children:
                            [
                                { path: 'newEquipment', component: EquipmentFormComponent },
                                { path: ':id', component: EquipmentDetailComponent },
                                { path: ':id/editEquipment', component: EquipmentFormComponent },
                                { path: '', component: StartEmptyComponent }
                            ]
                    }
                ]
        },

        {
            path: 'profile/:id', component: ProfileComponent, children: [
                { path: 'edit', component: EditProfileComponent },
                { path: 'reset-password', component: ResetPasswordComponent }
            ]
        },
        {path:'reset-password',component:ResetPasswordComponent},
        {path:'reset-password/:token',component:ResetPasswordComponent},
        { path: 'rent', component: CustomerRentComponent },
        { path: '**', redirectTo: '/' },
       
    ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}