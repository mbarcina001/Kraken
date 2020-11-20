import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './container/admin-container.component';
import { AdminComponent } from './components/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        AdminContainerComponent,
        AdminComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [],
    exports: []
})

export class AdminModule { }
