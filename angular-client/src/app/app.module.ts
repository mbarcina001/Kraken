import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TokenInterceptor } from './core/interceptors/token-interceptor';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { HomeModule } from './features/home/home.module';
import { AdminModule } from './features/admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Effects
import { AuthEffects } from './store/effects/auth.effects';
import { MeetingEffects } from './store/effects/meeting.effects';
import { UserEffects } from './store/effects/user.effects';

// Reducers
import { authReducer } from './store/reducers/auth.reducer';
import { meetingReducer } from './store/reducers/meeting.reducer';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AdminModule,
    EffectsModule.forRoot([
      AuthEffects,
      MeetingEffects,
      UserEffects,
    ]),
    StoreModule.forRoot({
      auth: authReducer,
      meeting: meetingReducer,
      user: userReducer,
    }),
    ToastrModule.forRoot({
      enableHtml: true
  }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
