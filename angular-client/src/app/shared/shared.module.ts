import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


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
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatInputModule,
        MatSelectModule
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ]
})

export class SharedModule { }
