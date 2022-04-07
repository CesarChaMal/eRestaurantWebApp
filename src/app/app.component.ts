import { Component, TemplateRef } from '@angular/core';
import { KeycloakTokenParsed } from 'keycloak-js';
import { AuthService } from './auth/service/auth.service';
import { Account } from './auth/model/account.model';
import { AccountService } from './auth/service/account.service';
import { getNzKeyfromLanguageKey, LANGUAGES } from './shared/language/language.constants';
import { VERSION } from './app.constants';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Undocumented
   */
  isCollapsed = false;
  /**
   * Undocumented
   */
  loggedUser: KeycloakTokenParsed | undefined;
  /**
   * Undocumented
   */
  roles: string[] | null | undefined;
  /**
   * Undocumented
   */
  account: Account | null = null;
  /**
   * 
   */
  avatarText: string = '';

  /**
   * Undocumented
   */
  lang!: string ;

  /**
   * Supported languages constant
   */
  languages = LANGUAGES;

  /**
   * Version of Admiral
   */
  version = '';


  isVisible = false;
  rateValue: number = 0;

  /**
   * 
   * @param authService 
   * @param accountService 
   */
  constructor(
    private authService: AuthService,
    private accountService: AccountService, 
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private i18n: NzI18nService,
    private notification: NzNotificationService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.lang = this.sessionStorageService.retrieve('locale') ?? 'en';

    this.loggedUser = this.authService.getLoggedUser();
    this.roles = this.authService.getRoles();
    this.accountService.identity().subscribe(account => {
      this.account = account;
      this.avatarText = (this.account?.firstName?.slice(0,1)+""+this.account?.lastName?.slice(0,1)).toUpperCase();
      console.log("Account: ",this.account);
    });
    
  }

  logout(): void {
    this.authService.logout();
  }

  manageAccount(): void{
    this.authService.redirectToProfile();
  }

  hasRole(requiredRoles: string[]): boolean{
    return requiredRoles.every(requiredRole => this.roles?.includes(requiredRole));
  }

  changeLanguage(languageKey: string): void{
    this.lang = languageKey;
    console.log(languageKey)
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
    this.i18n.setLocale(getNzKeyfromLanguageKey(languageKey));
  } 

  showModal1(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  rate(template: TemplateRef<{}>): void {
    this.notification.template(template);
    this.isVisible = false;
    this.rateValue=0;
    console.log("Is confirmed ", this.rateValue)
  }
}
