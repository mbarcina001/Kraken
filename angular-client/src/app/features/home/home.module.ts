import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './containers/home-container.component';
import { HomeComponent } from './components/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetingTableComponent } from './components/meeting-table/meeting-table.component';

@NgModule({
    declarations: [
        HomeContainerComponent,
        HomeComponent,
        MeetingTableComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [],
    exports: []
})

export class HomeModule { }
