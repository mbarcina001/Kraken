import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './container/admin-container.component';
import { AdminComponent } from './components/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEditionModalComponent } from './components/user-edition-modal/user-edition-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AdminContainerComponent,
        AdminComponent,
        UserEditionModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: []
})

export class AdminModule { }
