import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUserToken } from 'src/app/store/selectors/auth.selector';
import { first, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<any>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthenticatedUserToken).pipe(
      first(),
      flatMap(token => {
        let request = req;

        if (token) {
          request = req.clone({
            setHeaders: {
              authorization: `Bearer ${ token }`
            }
          });
        }

        return next.handle(request);
      }),
    );
  }

}
