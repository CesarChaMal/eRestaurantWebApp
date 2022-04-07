import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/service/auth.service';
import { AccountService } from 'src/app/auth/service/account.service';
import { StateStorageService } from 'src/app/auth/state-storage.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private stateStorageService: StateStorageService,
    private router: Router,
    private accountService: AccountService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && !err.url.includes('api/account') && this.accountService.isAuthenticated()) {
            console.log("Authentication interception")
            this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
            this.authService.login();
          }
        },
      })
    );
  }
}
