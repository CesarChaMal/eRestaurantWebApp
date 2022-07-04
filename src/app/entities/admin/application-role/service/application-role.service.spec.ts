import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'src/app/core/config/input.constants';
import { IApplicationRole, ApplicationRole } from '../model/application-role.model';

import { ApplicationRoleService } from './application-role.service';

describe('ApplicationRole Service', () => {
  let service: ApplicationRoleService;
  let httpMock: HttpTestingController;
  let elemDefault: IApplicationRole;
  let expectedResult: IApplicationRole | IApplicationRole[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApplicationRoleService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      description: 'AAAAAAA',
      tag: 'AAAAAAA',
      createdBy: 'AAAAAAA',
      creationDate: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          creationDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ApplicationRole', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          creationDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          creationDate: currentDate,
        },
        returnedFromService
      );

      service.create(new ApplicationRole()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApplicationRole', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          tag: 'BBBBBB',
          createdBy: 'BBBBBB',
          creationDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          creationDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApplicationRole', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          description: 'BBBBBB',
          createdBy: 'BBBBBB',
        },
        new ApplicationRole()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          creationDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApplicationRole', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          tag: 'BBBBBB',
          createdBy: 'BBBBBB',
          creationDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          creationDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ApplicationRole', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addApplicationRoleToCollectionIfMissing', () => {
      it('should add a ApplicationRole to an empty array', () => {
        const applicationRole: IApplicationRole = { id: 123 };
        expectedResult = service.addApplicationRoleToCollectionIfMissing([], applicationRole);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(applicationRole);
      });

      it('should not add a ApplicationRole to an array that contains it', () => {
        const applicationRole: IApplicationRole = { id: 123 };
        const applicationRoleCollection: IApplicationRole[] = [
          {
            ...applicationRole,
          },
          { id: 456 },
        ];
        expectedResult = service.addApplicationRoleToCollectionIfMissing(applicationRoleCollection, applicationRole);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApplicationRole to an array that doesn't contain it", () => {
        const applicationRole: IApplicationRole = { id: 123 };
        const applicationRoleCollection: IApplicationRole[] = [{ id: 456 }];
        expectedResult = service.addApplicationRoleToCollectionIfMissing(applicationRoleCollection, applicationRole);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(applicationRole);
      });

      it('should add only unique ApplicationRole to an array', () => {
        const applicationRoleArray: IApplicationRole[] = [{ id: 123 }, { id: 456 }, { id: 6762 }];
        const applicationRoleCollection: IApplicationRole[] = [{ id: 123 }];
        expectedResult = service.addApplicationRoleToCollectionIfMissing(applicationRoleCollection, ...applicationRoleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const applicationRole: IApplicationRole = { id: 123 };
        const applicationRole2: IApplicationRole = { id: 456 };
        expectedResult = service.addApplicationRoleToCollectionIfMissing([], applicationRole, applicationRole2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(applicationRole);
        expect(expectedResult).toContain(applicationRole2);
      });

      it('should accept null and undefined values', () => {
        const applicationRole: IApplicationRole = { id: 123 };
        expectedResult = service.addApplicationRoleToCollectionIfMissing([], null, applicationRole, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(applicationRole);
      });

      it('should return initial array if no ApplicationRole is added', () => {
        const applicationRoleCollection: IApplicationRole[] = [{ id: 123 }];
        expectedResult = service.addApplicationRoleToCollectionIfMissing(applicationRoleCollection, undefined, null);
        expect(expectedResult).toEqual(applicationRoleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
