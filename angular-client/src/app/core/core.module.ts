import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './container/login-container/login-container.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        LoginContainerComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    providers: [],
    exports: [
        AppRoutingModule
    ]
})

export class CoreModule { }