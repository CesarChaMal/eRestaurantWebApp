import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'src/app/core/config/input.constants';
import { Gender } from '../../../enumerations/gender.model';
import { IPersonalInfos, PersonalInfos } from '../model/personal-infos.model';

import { PersonalInfosService } from './personal-infos.service';

describe('PersonalInfos Service', () => {
  let service: PersonalInfosService;
  let httpMock: HttpTestingController;
  let elemDefault: IPersonalInfos;
  let expectedResult: IPersonalInfos | IPersonalInfos[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PersonalInfosService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      gender: Gender.MALE,
      numberPhone: 'AAAAAAA',
      dateOfBirth: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateOfBirth: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a PersonalInfos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateOfBirth: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateOfBirth: currentDate,
        },
        returnedFromService
      );

      service.create(new PersonalInfos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PersonalInfos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          gender: 'BBBBBB',
          numberPhone: 'BBBBBB',
          dateOfBirth: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateOfBirth: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PersonalInfos', () => {
      const patchObject = Object.assign(
        {
          dateOfBirth: currentDate.format(DATE_FORMAT),
        },
        new PersonalInfos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateOfBirth: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PersonalInfos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          gender: 'BBBBBB',
          numberPhone: 'BBBBBB',
          dateOfBirth: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateOfBirth: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a PersonalInfos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPersonalInfosToCollectionIfMissing', () => {
      it('should add a PersonalInfos to an empty array', () => {
        const personalInfos: IPersonalInfos = { id: 123 };
        expectedResult = service.addPersonalInfosToCollectionIfMissing([], personalInfos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(personalInfos);
      });

      it('should not add a PersonalInfos to an array that contains it', () => {
        const personalInfos: IPersonalInfos = { id: 123 };
        const personalInfosCollection: IPersonalInfos[] = [
          {
            ...personalInfos,
          },
          { id: 456 },
        ];
        expectedResult = service.addPersonalInfosToCollectionIfMissing(personalInfosCollection, personalInfos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PersonalInfos to an array that doesn't contain it", () => {
        const personalInfos: IPersonalInfos = { id: 123 };
        const personalInfosCollection: IPersonalInfos[] = [{ id: 456 }];
        expectedResult = service.addPersonalInfosToCollectionIfMissing(personalInfosCollection, personalInfos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(personalInfos);
      });

      it('should add only unique PersonalInfos to an array', () => {
        const personalInfosArray: IPersonalInfos[] = [{ id: 123 }, { id: 456 }, { id: 21659 }];
        const personalInfosCollection: IPersonalInfos[] = [{ id: 123 }];
        expectedResult = service.addPersonalInfosToCollectionIfMissing(personalInfosCollection, ...personalInfosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const personalInfos: IPersonalInfos = { id: 123 };
        const personalInfos2: IPersonalInfos = { id: 456 };
        expectedResult = service.addPersonalInfosToCollectionIfMissing([], personalInfos, personalInfos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(personalInfos);
        expect(expectedResult).toContain(personalInfos2);
      });

      it('should accept null and undefined values', () => {
        const personalInfos: IPersonalInfos = { id: 123 };
        expectedResult = service.addPersonalInfosToCollectionIfMissing([], null, personalInfos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(personalInfos);
      });

      it('should return initial array if no PersonalInfos is added', () => {
        const personalInfosCollection: IPersonalInfos[] = [{ id: 123 }];
        expectedResult = service.addPersonalInfosToCollectionIfMissing(personalInfosCollection, undefined, null);
        expect(expectedResult).toEqual(personalInfosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
