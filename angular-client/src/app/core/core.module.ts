import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { LoginContainerComponent } from './container/login-container/login-container.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        LoginContainerComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ]
})

export class CoreModule { }