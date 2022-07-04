import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'src/app/core/util/operators';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { createRequestOption } from 'src/app/core/request/request-util';
import { IApplicationRole, getApplicationRoleIdentifier } from '../model/application-role.model';

export type EntityResponseType = HttpResponse<IApplicationRole>;
export type EntityArrayResponseType = HttpResponse<IApplicationRole[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationRoleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/application-roles', 'configurationms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(applicationRole: IApplicationRole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationRole);
    return this.http
      .post<IApplicationRole>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(applicationRole: IApplicationRole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationRole);
    return this.http
      .put<IApplicationRole>(`${this.resourceUrl}/${getApplicationRoleIdentifier(applicationRole) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(applicationRole: IApplicationRole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationRole);
    return this.http
      .patch<IApplicationRole>(`${this.resourceUrl}/${getApplicationRoleIdentifier(applicationRole) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApplicationRole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApplicationRole[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApplicationRoleToCollectionIfMissing(
    applicationRoleCollection: IApplicationRole[],
    ...applicationRolesToCheck: (IApplicationRole | null | undefined)[]
  ): IApplicationRole[] {
    const applicationRoles: IApplicationRole[] = applicationRolesToCheck.filter(isPresent);
    if (applicationRoles.length > 0) {
      const applicationRoleCollectionIdentifiers = applicationRoleCollection.map(
        applicationRoleItem => getApplicationRoleIdentifier(applicationRoleItem)!
      );
      const applicationRolesToAdd = applicationRoles.filter(applicationRoleItem => {
        const applicationRoleIdentifier = getApplicationRoleIdentifier(applicationRoleItem);
        if (applicationRoleIdentifier == null || applicationRoleCollectionIdentifiers.includes(applicationRoleIdentifier)) {
          return false;
        }
        applicationRoleCollectionIdentifiers.push(applicationRoleIdentifier);
        return true;
      });
      return [...applicationRolesToAdd, ...applicationRoleCollection];
    }
    return applicationRoleCollection;
  }

  protected convertDateFromClient(applicationRole: IApplicationRole): IApplicationRole {
    return Object.assign({}, applicationRole, {
      creationDate: applicationRole.creationDate?.isValid() ? applicationRole.creationDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? dayjs(res.body.creationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((applicationRole: IApplicationRole) => {
        applicationRole.creationDate = applicationRole.creationDate ? dayjs(applicationRole.creationDate) : undefined;
      });
    }
    return res;
  }
}
