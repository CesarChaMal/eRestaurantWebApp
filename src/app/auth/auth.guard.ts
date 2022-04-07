import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(protected override readonly router: Router,protected override readonly keycloakAngular: KeycloakService ){
    super(router, keycloakAngular);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    // Force the user to log in if currently unauthenticated.
    if(!this.authenticated){
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }


    // Get the roles required from the routes.
    const requiredRoles = route.data['roles'];

    //Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    //Allow the user to proceed if all the required roles are present.
    //return requiredRoles.every((role) => this.roles.includes(role));


    // Allow the user to proceed if all the required roles are present.
    if (requiredRoles.every((role) => this.roles.includes(role))) {
      return true;
    } else {
      // redirect to error page if the user doesn't have the nessecairy  role to access
      this.router.navigate(['/result/access-denied']);
      return false;
    }
  }
  
}
