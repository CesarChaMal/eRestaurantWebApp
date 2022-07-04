import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    NgxSmoothDnDModule,
    TranslateDirective
  ],
})
export class SharedModule {}
