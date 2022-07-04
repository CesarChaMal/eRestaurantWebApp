import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'src/app/core/util/operators';
import { DATE_FORMAT } from 'src/app/config/input.constants';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { createRequestOption } from 'src/app/core/request/request-util';
import { IPersonalInfos, getPersonalInfosIdentifier } from '../model/personal-infos.model';

export type EntityResponseType = HttpResponse<IPersonalInfos>;
export type EntityArrayResponseType = HttpResponse<IPersonalInfos[]>;

@Injectable({ providedIn: 'root' })
export class PersonalInfosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/personal-infos', 'usersms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(personalInfos: IPersonalInfos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalInfos);
    return this.http
      .post<IPersonalInfos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(personalInfos: IPersonalInfos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalInfos);
    return this.http
      .put<IPersonalInfos>(`${this.resourceUrl}/${getPersonalInfosIdentifier(personalInfos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(personalInfos: IPersonalInfos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalInfos);
    return this.http
      .patch<IPersonalInfos>(`${this.resourceUrl}/${getPersonalInfosIdentifier(personalInfos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPersonalInfos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPersonalInfos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPersonalInfosToCollectionIfMissing(
    personalInfosCollection: IPersonalInfos[],
    ...personalInfosToCheck: (IPersonalInfos | null | undefined)[]
  ): IPersonalInfos[] {
    const personalInfos: IPersonalInfos[] = personalInfosToCheck.filter(isPresent);
    if (personalInfos.length > 0) {
      const personalInfosCollectionIdentifiers = personalInfosCollection.map(
        personalInfosItem => getPersonalInfosIdentifier(personalInfosItem)!
      );
      const personalInfosToAdd = personalInfos.filter(personalInfosItem => {
        const personalInfosIdentifier = getPersonalInfosIdentifier(personalInfosItem);
        if (personalInfosIdentifier == null || personalInfosCollectionIdentifiers.includes(personalInfosIdentifier)) {
          return false;
        }
        personalInfosCollectionIdentifiers.push(personalInfosIdentifier);
        return true;
      });
      return [...personalInfosToAdd, ...personalInfosCollection];
    }
    return personalInfosCollection;
  }

  protected convertDateFromClient(personalInfos: IPersonalInfos): IPersonalInfos {
    return Object.assign({}, personalInfos, {
      dateOfBirth: personalInfos.dateOfBirth?.isValid() ? personalInfos.dateOfBirth.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfBirth = res.body.dateOfBirth ? dayjs(res.body.dateOfBirth) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((personalInfos: IPersonalInfos) => {
        personalInfos.dateOfBirth = personalInfos.dateOfBirth ? dayjs(personalInfos.dateOfBirth) : undefined;
      });
    }
    return res;
  }
}
