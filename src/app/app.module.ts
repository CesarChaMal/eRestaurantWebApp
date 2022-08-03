import { LOCALE_ID, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import locale from '@angular/common/locales/en';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {AuthModule} from './auth/auth.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NgZorroAntdModule} from './ng-zorro-antd.module';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {AccessDeniedComponent} from './result/access-denied/access-denied.component';
import {UsersManagementComponent} from './admin/users-management/list/users-management.component';
import {UserManagementDetailComponent} from './admin/users-management/detail/user-management-detail.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { InternalServerErrorComponent } from './result/internal-server-error/internal-server-error.component';
import { VerbNotAllowedComponent } from './result/verb-not-allowed/verb-not-allowed.component';
import { httpInterceptorProviders } from './core/interceptor';
import { SharedModule } from './shared/shared.module';
import { TranslationModule } from './shared/language/translation.module';
import { TranslateDirective } from '@ngx-translate/core';
import {NotFoundComponent} from "./result/not-found/not-found.component";
import {BadRequestComponent} from "./result/bad-request/bad-request.component";
import {UserManagementUpdateComponent} from "./admin/users-management/update/user-management-update.component";
import { HelpAndResourcesModule } from './pages/help-and-resources/help-and-resources.module';
import { HelpAndResourcesMenuComponent } from './pages/help-and-resources/help-and-resources-menu/help-and-resources-menu.component';
import { HelpCenterComponent } from './pages/help-and-resources/help-center/help-center.component';
import { SupportForumComponent } from './pages/help-and-resources/support-forum/support-forum.component';
import { VideosComponent } from './pages/help-and-resources/videos/videos.component';
import { ReleaseNotesComponent } from './pages/help-and-resources/release-notes/release-notes.component';
import { LegalSummaryComponent } from './pages/help-and-resources/legal-summary/legal-summary.component';
import { SubmitFeedbackComponent } from './pages/help-and-resources/submit-feedback/submit-feedback.component';
import { AskTheCommunityComponent } from './pages/help-and-resources/ask-the-community/ask-the-community.component';
import { ContactSupportComponent } from './pages/help-and-resources/contact-support/contact-support.component';


//registerLocaleData(en);

// const customLanguagePack = {
//   en_US:{
//     Pagination: {
//       items_per_page: "per page"
//     }
//   },
//   fr_FR:{
//     Pagination: {
//       items_per_page: "per page"
//     }
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    BadRequestComponent,
    VerbNotAllowedComponent,
    HelpAndResourcesMenuComponent,
    HelpCenterComponent,
    SupportForumComponent,
    VideosComponent,
    ReleaseNotesComponent,
    LegalSummaryComponent,
    SubmitFeedbackComponent,
    AskTheCommunityComponent,
    ContactSupportComponent,
    UsersManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent
  ],
  imports: [
    AuthModule, //Keycloak auth config
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NgZorroAntdModule,
    NzBreadCrumbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    SharedModule,
    TranslationModule,
    HelpAndResourcesModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: LOCALE_ID, useValue: 'en' }, 
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(locale);
  }
}

