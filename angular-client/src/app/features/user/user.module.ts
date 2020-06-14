import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './container/user-container.component';
import { UserComponent } from './components/user.component';

@NgModule({
    declarations: [
        UserContainerComponent,
        UserComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: []
})

export class UserModule { }
