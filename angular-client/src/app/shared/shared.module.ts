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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatMomentModule, NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS, NgxMatDateAdapter, NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { DatePipe } from './pipes/date.pipe';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const MY_FORMATS: NgxMatDateFormats = {
    parse: {
      dateInput: 'DD/MM/YYYY HH:mm',
    },
    display: {
      dateInput: 'DD/MM/YYYY HH:mm',
      monthYearLabel: 'LL',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MM YYYY'
    }
  };

@NgModule({
    declarations: [
        SpinnerComponent,
        DatePipe,
        ModalConfirmComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        // Components
        SpinnerComponent,

        // Pipes
        DatePipe,

        // Angular Material
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,

        // Datetime picker
        NgxMatMomentModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
    ],
    providers: [
        { provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
        { provide: NGX_MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
    ]
})

export class SharedModule { }
