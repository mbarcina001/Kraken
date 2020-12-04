import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './containers/home-container.component';
import { HomeComponent } from './components/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetingTableComponent } from './components/meeting-table/meeting-table.component';
import { UserService } from 'src/app/store/services/user.service';
import { MeetingEditionModalComponent } from './components/meeting-edition-modal/meeting-edition-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingService } from 'src/app/store/services/meeting.service';

@NgModule({
    declarations: [
        HomeContainerComponent,
        HomeComponent,
        MeetingTableComponent,
        MeetingEditionModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        MeetingService,
        UserService
    ],
    exports: []
})

export class HomeModule { }
