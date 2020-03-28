import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainerComponent } from './core/container/login-container/login-container.component';
import { LOGIN_ROUTE } from './core/app.constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/' + LOGIN_ROUTE,
    pathMatch: 'full'
  },
  {
    path: LOGIN_ROUTE,
    component: LoginContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
