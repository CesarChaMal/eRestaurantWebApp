import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/core/request/request-util';
import { environment } from 'src/environments/environment';
import {getRestaurantUserIdentifier, IRestaurantUser} from '../models/restaurant-user.model';
import {isPresent} from "../../../core/util/operators";


export type EntityResponseType = HttpResponse<IRestaurantUser>;
export type EntityArrayResponseType = HttpResponse<IRestaurantUser[]>;

@Injectable({
  providedIn: 'root'
})
export class RestaurantUserService {
  protected resourceUrl = environment.serverUrl+'erestaurantusers/api/restaurant-users';

  constructor(protected http: HttpClient) { }

  /**
   * 
   * @param restaurantUser
   * @returns 
   */
  private getRestaurantUserIdentifier(restaurantUser: IRestaurantUser): number | undefined {
    return parseInt(restaurantUser.id);
  }

  /**
   * 
   * @param restaurantUser
   * @returns 
   */
  create(restaurantUser: IRestaurantUser): Observable<EntityResponseType> {
    return this.http.post<IRestaurantUser>(this.resourceUrl, restaurantUser, { observe: 'response' });
  }

  /**
   * 
   * @param restaurantUser
   * @returns 
   */
  update(restaurantUser: IRestaurantUser): Observable<EntityResponseType> {
    return this.http.put<IRestaurantUser>(`${this.resourceUrl}/${this.getRestaurantUserIdentifier(restaurantUser) as number}`, restaurantUser, {
      observe: 'response',
    });
  }

  /**
   * 
   * @param restaurantUser
   * @returns 
   */
  partialUpdate(restaurantUser: IRestaurantUser): Observable<EntityResponseType> {
    return this.http.patch<IRestaurantUser>(`${this.resourceUrl}/${this.getRestaurantUserIdentifier(restaurantUser) as number}`, restaurantUser, {
      observe: 'response',
    });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRestaurantUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  /**
   * Find restaurantUser using a User id
   */
  findByUserId(id: string): Observable<EntityResponseType> {
    return this.http.get<IRestaurantUser>(`${this.resourceUrl}/user/${id}`, { observe: 'response' });
  }

  /**
   * 
   * @param req 
   * @returns 
   */
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRestaurantUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  /**
   * TODO: delete this methode, to avoid creation of admiral user in client side
   * (creation of admiral user wil be executed only in back end on the creation of the user account to associate the them)
   *
   * @param restaurantUserCollection
   * @param restaurantUsersToCheck
   * @returns
   */
  addRestaurantUserToCollectionIfMissing(
    restaurantUserCollection: IRestaurantUser[],
    ...restaurantUsersToCheck: (IRestaurantUser | null | undefined)[]
  ): IRestaurantUser[] {
    const restaurantUsers: IRestaurantUser[] = restaurantUsersToCheck.filter(isPresent);
    if (restaurantUsers.length > 0) {
      const restaurantUserCollectionIdentifiers = restaurantUserCollection.map(
        restaurantUserItem => getRestaurantUserIdentifier(restaurantUserItem)!
      );
      const restaurantUsersToAdd = restaurantUsers.filter(restaurantUserItem => {
        const restaurantUserIdentifier = getRestaurantUserIdentifier(restaurantUserItem);
        if (restaurantUserIdentifier == null || restaurantUserCollectionIdentifiers.includes(restaurantUserIdentifier)) {
          return false;
        }
        restaurantUserCollectionIdentifiers.push(restaurantUserIdentifier);
        return true;
      });
      return [...restaurantUsersToAdd, ...restaurantUserCollection];
    }
    return restaurantUserCollection;
  }

  private isPresent<T>(t: T | undefined | null | void): t is T {
    return t !== undefined && t !== null;
  }
}
