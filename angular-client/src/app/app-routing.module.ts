import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainerComponent } from './core/container/login-container/login-container.component';
import { LOGIN_ROUTE, ADMIN_ROUTE, HOME_ROUTE, NO_PERMISSIONS_ROUTE, ADMIN_ROLE } from './core/app.constants';
import { AdminContainerComponent } from './features/admin/container/admin-container.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeContainerComponent } from './features/home/containers/home-container.component';
import { NoPermissionsComponent } from './core/components/no-permissions/no-permissions.component';
import { RoleGuard } from './core/guards/role.guard';

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
    path: NO_PERMISSIONS_ROUTE,
    component: NoPermissionsComponent
  },
  {
    path: HOME_ROUTE,
    component: HomeContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ADMIN_ROUTE,
    component: AdminContainerComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ADMIN_ROLE
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard]
})
export class AppRoutingModule { }
