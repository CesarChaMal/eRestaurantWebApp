import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(protected router: Router, private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 400:
              this.router.navigate(['/result/400']);
              break;
            case 403:
                this.auth.login();
                break;
            case 404:
              //this.router.navigate(['/result/404']);
              break;
            case 405:
              this.router.navigate(['/result/405']);
              break;
            case 500:
              this.router.navigate(['/result/500']);
              break;
            default:
              //this.router.navigate(['/result/404']);
              console.log("request: ", request)
              console.log("next: ",next)
              break;
          }
          // if (!(err.status === 401 && (err.message === '' || err.url?.includes('api/account')))) {
          //   console.log("errror= ",err);
            
          // }
        },
      })
    );
  }
}
