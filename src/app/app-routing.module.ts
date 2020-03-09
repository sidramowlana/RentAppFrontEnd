import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';

const appRoutes: Routes =
    [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'forgotPassword', component: ForgotPasswordComponent },
        { path: 'profile', component: ProfileComponent, children:[
            {path:'editProfile', component:EditProfileComponent}
        ] },
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