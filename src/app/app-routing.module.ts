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
import { RentComponent } from './views/rent/rent.component';
import { EquipmentsComponent } from './views/vehicle/equipments/equipments.component';
import { EquipmentFormComponent } from './views/vehicle/equipments/equipment-form/equipment-form.component';
import { EquipmentDetailComponent } from './views/vehicle/equipments/equipment-detail/equipment-detail.component';
import { StartEmptyComponent } from './views/vehicle/equipments/start-empty/start-empty.component';

const appRoutes: Routes =
    [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'forgotPassword', component: ForgotPasswordComponent },
        {
            path: 'vehicle', component: VehicleComponent,
            children: [
                { path: 'vehicles', component: VehiclesComponent },
                { path: 'types', component: TypesComponent },
                {
                    path: 'equipments', component: EquipmentsComponent,
                    children: [
                        { path: 'new', component: EquipmentFormComponent },
                        { path: ':id', component: EquipmentDetailComponent },
                        { path: ':id/edit', component: EquipmentFormComponent },
                        { path: '', component: StartEmptyComponent }
                    ]
                }
            ]
        },
        {
            path: 'profile', component: ProfileComponent, children: [
                { path: 'editProfile', component: EditProfileComponent }
            ]
        },
        { path: 'rent', component: RentComponent },
        { path: '**', redirectTo: '/login' }
    ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}