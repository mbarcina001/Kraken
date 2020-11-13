import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainerComponent } from './core/container/login-container/login-container.component';
import { LOGIN_ROUTE, USERS_ROUTE, HOME_ROUTE } from './core/app.constants';
import { UserContainerComponent } from './features/user/container/user-container.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeContainerComponent } from './features/home/containers/home-container.component';

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
    path: HOME_ROUTE,
    component: HomeContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: USERS_ROUTE,
    component: UserContainerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
