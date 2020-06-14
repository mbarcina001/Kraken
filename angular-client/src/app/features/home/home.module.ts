import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './containers/home-container.component';
import { HomeComponent } from './components/home.component';

@NgModule({
    declarations: [
        HomeContainerComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: []
})

export class HomeModule { }
