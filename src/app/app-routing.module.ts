import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) ,
    canActivate: [AuthGuard],
  },
  { 
    path: 'welcome', 
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) ,
    canActivate: [AuthGuard],
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then(m => m.ResultModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ADMIN"]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
