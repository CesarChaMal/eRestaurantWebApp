import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService, private http: HttpClient,) { }


  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance()
        .idTokenParsed;
      return userDetails;
    } catch (error) {
      console.error("Exception <Keycloak>: ",error)
      return undefined;
    }
  }
  
  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public login(): void {
    this.keycloakService.login();
  }

  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }
  //TODO: error can't connect to the keycloak admin cli using the admin token.
  /**
   * what: find a user account details using the UUID
   * why:  to change the informations and the state of the user account (enable it, disable it...)
   * how:  using the e-restaurant ui
   * 
   * @param id 
   * @returns 
   */
  public findUser(id: string): Observable<any> {
    this.keycloakService.getToken()
    .then((data)=>{
      console.log("data=",data);
    }).catch((err)=>{
      console.log("error=",err);
    })
    const url = "http://localhost:9080/auth/admin/realms/jhipster/users/"+id;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.keycloakService.getToken}`
    })
    return this.http.get(url, { headers: headers })
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
/** 
  getUserIdentity(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:8080/services/erestaurantusers/api/account');
  }
  **/
}
