import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { AccountService } from 'src/app/auth/service/account.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Account } from '../../auth/model/account.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  // user: Promise<KeycloakProfile> | undefined;
  //userAccount ?: IUser | null;
  array = ['INNOVATION', 'EXCELLENCE', 'COOPERATION', 'EMPOWERMENT', 'RESPECT', 'REGULATIONS', 'ETHICS', 'SUSTAINABILITY'];

  /**
   * Undocumented
   */
  account: Account | null = null;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService, 
  ) { }

  ngOnInit() {
/*
    this.authService.getUserIdentity().subscribe( user => {
      this.userAccount = user;
    })

*/
    // this.authService.loadUserProfile().then((data)=>{
    //   console.log("then data: "+data.username)
    // }).catch((data)=>{
    //   console.log("catch data: "+data)
    // });

    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
    console.log("Selected lang",languageKey)
  }

}
