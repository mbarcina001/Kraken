import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { UserComponent } from './features/user/user.component';
import { CoreModule } from './core/core.module';
import { UserContainerComponent } from './features/user/container/user-container/user-container.component';
import { UserService } from './features/service/user-service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
