import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { VerbNotAllowedComponent } from './verb-not-allowed/verb-not-allowed.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ResultRoutingModule
  ]
})
export class ResultModule { }
