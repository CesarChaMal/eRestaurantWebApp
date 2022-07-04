import { Gender } from '../../../enumerations/gender.model';

export interface IPersonalInfos {
  id?: number;
  gender?: Gender | null;
  numberPhone?: string | null;
  dateOfBirth?: Date;
}

export class PersonalInfos implements IPersonalInfos {
  constructor(
    public id?: number,
    public gender?: Gender | null,
    public numberPhone?: string | null,
    public dateOfBirth?: Date
  ) {}
}

export function getPersonalInfosIdentifier(personalInfos: IPersonalInfos): number | undefined {
  return personalInfos.id;
}
