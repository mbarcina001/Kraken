import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { LoginContainerComponent } from './container/login-container/login-container.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from '../store/services/auth.service';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { NoPermissionsComponent } from './components/no-permissions/no-permissions.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        LoginContainerComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        LoginFormComponent,
        RegisterFormComponent,
        NoPermissionsComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    providers: [
        AuthService
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent,
    ]
})

export class CoreModule { }
