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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule  
  ],
  providers: [AuthenticationService,TokenStorageService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
