import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { WelcomeRoutingModule } from './welcome-routing.module';


@NgModule({
  imports: [WelcomeRoutingModule, SharedModule],
  declarations: []
})
export class WelcomeModule { }
