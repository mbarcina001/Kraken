import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { LoginContainerComponent } from './container/login-container/login-container.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        LoginContainerComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [
        AppRoutingModule
    ]
})

export class CoreModule { }