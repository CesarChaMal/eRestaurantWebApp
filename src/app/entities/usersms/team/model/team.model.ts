import { IAdmiralUser } from "../../../rosteringms/admiral-user/model/admiral-user.model";

export interface ITeam {
  id?: number;
  name?: string;
  description?: string | null;
  level?: number;
  imageContentType?: string | null;
  image?: string | null;
  email?: string | null;
  color?: string | null;
  networkDrive?: string | null;
  privacy?: boolean | null;
  leader?: IAdmiralUser | null;
  members?: IAdmiralUser[] | null;
  supervisor?: IAdmiralUser | null;
}

export class Team implements ITeam {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public level?: number,
    public imageContentType?: string | null,
    public image?: string | null,
    public email?: string | null,
    public color?: string | null,
    public networkDrive?: string | null,
    public privacy?: boolean | null,
    public leader?: IAdmiralUser | null,
    public members?: IAdmiralUser[] | null,
    public supervisor?: IAdmiralUser | null
  ) {
    this.privacy = this.privacy ?? false;
  }
}

export function getTeamIdentifier(team: ITeam): number | undefined {
  return team.id;
}
