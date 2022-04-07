import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementDetailComponent } from './detail/user-management-detail.component';
import { UsersManagementComponent } from './list/users-management.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'detail',
    component: UserManagementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { 
  
}
