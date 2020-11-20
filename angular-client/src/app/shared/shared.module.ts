import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
    declarations: [
        SpinnerComponent,
        DatePipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        // Components
        SpinnerComponent,

        // Pipes
        DatePipe,

        // Angular Material
        MatTableModule,
        MatExpansionModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
    ]
})

export class SharedModule { }
