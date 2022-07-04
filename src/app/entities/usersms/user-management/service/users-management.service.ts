
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../model/user-management.model';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { createRequestOption } from 'src/app/core/request/request-util';
import { Pagination } from 'src/app/core/request/request.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersManagementService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/users', 'configurationms');
  // private resourceUrl = this.applicationConfigService.getEndpointFor('api/users', 'usersms');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user);
  }

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  }

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    // return this.http.get<IUser[]>(`${environment.serverUrl}usersms/api/users`, { params: options, observe: 'response' });
    return this.http.get<IUser[]>(`${environment.serverUrl}configurationms/api/users`, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    // return this.http.get<string[]>('http://localhost:8080/services/usersms/api/authorities');
    return this.http.get<string[]>('http://localhost:8080/services/configurationms/api/authorities');
  }
}
