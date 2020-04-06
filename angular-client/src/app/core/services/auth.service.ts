import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login (username: string, pass: string) {
    return of({
      name: 'test',
      token: 'asdf123456'
    })
  }
}
