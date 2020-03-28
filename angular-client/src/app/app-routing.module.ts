import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainerComponent } from './core/container/login-container/login-container.component';
import { LOGIN_ROUTE, USERS_ROUTE } from './core/app.constants';
import { UserContainerComponent } from './features/user/container/user-container/user-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/' + LOGIN_ROUTE,
    pathMatch: 'full'
  },
  {
    path: LOGIN_ROUTE,
    component: LoginContainerComponent
  },
  {
    path: USERS_ROUTE,
    component: UserContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
