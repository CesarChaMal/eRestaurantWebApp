import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/core/request/request-util';
import { isPresent } from 'src/app/core/util/operators';
import { environment } from 'src/environments/environment';
import { ITeam } from '../model/team.model';

export type EntityResponseType = HttpResponse<ITeam>;
export type EntityArrayResponseType = HttpResponse<ITeam[]>;

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  protected resourceUrl = environment.serverUrl+'usersms/api/teams';

  constructor(protected http: HttpClient) {}

  getTeamIdentifier(team: ITeam): number | undefined {
    return team.id;
  }

  create(team: ITeam): Observable<EntityResponseType> {
    return this.http.post<ITeam>(this.resourceUrl, team, { observe: 'response' });
  }

  update(team: ITeam): Observable<EntityResponseType> {
    return this.http.put<ITeam>(`${this.resourceUrl}/${this.getTeamIdentifier(team) as number}`, team, { observe: 'response' });
  }

  partialUpdate(team: ITeam): Observable<EntityResponseType> {
    return this.http.patch<ITeam>(`${this.resourceUrl}/${this.getTeamIdentifier(team) as number}`, team, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTeamToCollectionIfMissing(teamCollection: ITeam[], ...teamsToCheck: (ITeam | null | undefined)[]): ITeam[] {
    const teams: ITeam[] = teamsToCheck.filter(isPresent);
    if (teams.length > 0) {
      const teamCollectionIdentifiers = teamCollection.map(teamItem => this.getTeamIdentifier(teamItem)!);
      const teamsToAdd = teams.filter(teamItem => {
        const teamIdentifier = this.getTeamIdentifier(teamItem);
        if (teamIdentifier == null || teamCollectionIdentifiers.includes(teamIdentifier)) {
          return false;
        }
        teamCollectionIdentifiers.push(teamIdentifier);
        return true;
      });
      return [...teamsToAdd, ...teamCollection];
    }
    return teamCollection;
  }
}
