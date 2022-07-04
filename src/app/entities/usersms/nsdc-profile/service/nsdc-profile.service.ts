import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getNsdcProfileIdentifier, INsdcProfile } from '../model/nsdc-profile.model';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { createRequestOption } from 'src/app/core/request/request-util';
import { Pagination } from 'src/app/core/request/request.model';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { IAdmiralUser} from "src/app/entities/rosteringms/admiral-user/model/admiral-user.model";

export type EntityResponseType = HttpResponse<INsdcProfile>;
export type EntityArrayResponseType = HttpResponse<INsdcProfile[]>;
import { isValidDate } from 'src/app/core/util/operators';
// import dayjs from 'dayjs/esm';
//import * as dayjs from 'dayjs';

@Injectable({ providedIn: 'root' })
export class NsdcProfileService {
  // private resourceUrl = this.applicationConfigService.getEndpointFor('api/admin/nsdc-profiles', 'usersms');
  private resourceUrl = environment.serverUrl + 'usersms/api/admin/nsdc-profiles-adapter';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(nsdcProfile: INsdcProfile): Observable<INsdcProfile> {
    return this.http.post<INsdcProfile>(this.resourceUrl, nsdcProfile);
  }

/*
  update(nsdcProfile: INsdcProfile): Observable<EntityResponseType> {
    return this.http.put<EntityResponseType>(this.resourceUrl, nsdcProfile);
    // return this.http.put<EntityResponseType>(`${this.resourceUrl}/${nsdcProfile.id}`, nsdcProfile);
  }
*/

  update(nsdcProfile: INsdcProfile): Observable<EntityResponseType> {
    const copy = this.convert(nsdcProfile);
    return this.http.put<INsdcProfile>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    // return this.http.put<INsdcProfile>(`${this.resourceUrl}/${copy.id}`, copy, { observe: 'response' })
    //   .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  partialUpdate(nsdcProfile: INsdcProfile): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nsdcProfile);
    return this.http
      .patch<INsdcProfile>(`${this.resourceUrl}/${getNsdcProfileIdentifier(nsdcProfile) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(nsdcProfile: string): Observable<INsdcProfile> {
    return this.http.get<INsdcProfile>(`${this.resourceUrl}/${nsdcProfile}`);
  }

  findAllByAdmiralUserId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<INsdcProfile[]>(`${this.resourceUrl}/admiral-user/${id}`, { observe: 'response' });
  }

  findByAdmiralUserToReportsTo(id: string): Observable<EntityResponseType> {
    return this.http.get<IAdmiralUser>(`${this.resourceUrl}/findByAdmiralUserToReportsTo/${id}`, { observe: 'response' });
  }

  query(req?: Pagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INsdcProfile[]>(`${environment.serverUrl}usersms/api/admin/nsdc-profiles-adapter`, { params: options, observe: 'response' });
  }

  delete(nsdcProfile: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${nsdcProfile}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/services/usersms/api/authorities');
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: INsdcProfile = this.convertItemFromServer(res.body);
    return res.clone({body});
  }

  private convertArrayResponse(res: HttpResponse<INsdcProfile[]>): HttpResponse<INsdcProfile[]> {
    const jsonResponse: INsdcProfile[] = res.body;
    const body: INsdcProfile[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({body});
  }

  /**
   * 
   * Dayjs library issue:
   * 
   */
  protected convertDateFromClient(nsdcProfile: INsdcProfile): INsdcProfile {
    return Object.assign({}, nsdcProfile, {
      accessExpires: nsdcProfile.accessExpires?.getDate()? nsdcProfile.accessExpires.toJSON() : undefined
    });
  }

  /**
   * Convert a returned JSON object to INsdcProfile.
   */
  private convertItemFromServer(nsdcProfile: INsdcProfile): INsdcProfile {
    const copy: INsdcProfile = Object.assign({}, nsdcProfile);
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    /*if (res.body) {
      res.body.accessExpires = res.body.accessExpires ? dayjs(res.body.accessExpires).toDate() : undefined;
    }*/
    return res;
  }

  /**
   * Convert a INsdcProfile to a JSON which can be sent to the server.
   */
  private convert(nsdcProfile: INsdcProfile): INsdcProfile {
    const copy: INsdcProfile = Object.assign({}, nsdcProfile);
    return copy;
  }

}
