import dayjs from 'dayjs/esm';
import { ISkillsProfile } from '../../skills-profile/model/skills-profile.model';

export interface IApplicationRole {
  id?: number;
  name?: string;
  description?: string;
  tag?: string | null;
  createdBy?: string | null;
  creationDate?: dayjs.Dayjs | null;
  reportsTo?: IApplicationRole | null;
  profiles?: ISkillsProfile[] | null;
}

export class ApplicationRole implements IApplicationRole {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public tag?: string | null,
    public createdBy?: string | null,
    public creationDate?: dayjs.Dayjs | null,
    public reportsTo?: IApplicationRole | null,
    public profiles?: ISkillsProfile[] | null
  ) {}
}

export function getApplicationRoleIdentifier(applicationRole: IApplicationRole): number | undefined {
  return applicationRole.id;
}
