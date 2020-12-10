import { Injectable } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import { FIELD_ERROR_MESSAGES } from '../app.constants';

@Injectable()
export class FormValidationService {

    getErrorMessage(pControl: AbstractControlDirective | AbstractControl) {
        return Object.keys(pControl.errors)
            .map(field => this.getMessage(field, pControl.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return FIELD_ERROR_MESSAGES[type](params);
    }

}