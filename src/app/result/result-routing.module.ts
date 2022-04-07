import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerbNotAllowedComponent } from './verb-not-allowed/verb-not-allowed.component';

const routes: Routes = [
  {
    path: 'access-denied', 
    component: AccessDeniedComponent,
  },
  {
    path: '404', 
    component: NotFoundComponent,
  },
  {
    path: '500', 
    component: InternalServerErrorComponent,
  },
  {
    path: '400', 
    component: BadRequestComponent,
  },
  {
    path: '405', 
    component: VerbNotAllowedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
