import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-management',
    loadChildren: () => import('./users-management/user-management.module').then(m => m.UserManagementModule),
    data: {
      pageTitle: 'User Management',
      roles: ["ROLE_ADMIN"]
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AdminRoutingModule {}
