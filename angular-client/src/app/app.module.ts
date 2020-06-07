import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { UserComponent } from './features/user/user.component';
import { CoreModule } from './core/core.module';
import { UserContainerComponent } from './features/user/container/user-container/user-container.component';
import { UserService } from './features/service/user-service';
import { TokenInterceptor } from './core/interceptors/token-interceptor';
import { EffectsModule } from '@ngrx/effects';
import { IssueEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    EffectsModule.forRoot([IssueEffects]),
    StoreModule.forRoot({auth: authReducer})
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
