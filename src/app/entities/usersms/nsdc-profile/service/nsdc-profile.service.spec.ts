import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import dayjs from 'dayjs/esm';
import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'src/app/core/config/input.constants';
import { INsdcProfile, NsdcProfile } from '../model/nsdc-profile.model';

import { NsdcProfileService } from './nsdc-profile.service';

describe('NsdcProfile Service', () => {
  let service: NsdcProfileService;
  let httpMock: HttpTestingController;
  let elemDefault: INsdcProfile;
  let expectedResult: INsdcProfile | INsdcProfile[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NsdcProfileService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      description: 'AAAAAAA',
      imageContentType: 'image/png',
      image: 'AAAAAAA',
      visibility: false,
      privacy: false,
      level: 0,
      minUsers: 0,
      maxUsers: 0,
      accessExpires: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          accessExpires: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a NsdcProfile', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          accessExpires: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          accessExpires: currentDate,
        },
        returnedFromService
      );

      service.create(new NsdcProfile()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NsdcProfile', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          image: 'BBBBBB',
          visibility: true,
          privacy: true,
          level: 1,
          minUsers: 1,
          maxUsers: 1,
          accessExpires: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          accessExpires: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NsdcProfile', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          description: 'BBBBBB',
          image: 'BBBBBB',
          level: 1,
          accessExpires: currentDate.format(DATE_TIME_FORMAT),
        },
        new NsdcProfile()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          accessExpires: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NsdcProfile', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          image: 'BBBBBB',
          visibility: true,
          privacy: true,
          level: 1,
          minUsers: 1,
          maxUsers: 1,
          accessExpires: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          accessExpires: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a NsdcProfile', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNsdcProfileToCollectionIfMissing', () => {
      it('should add a NsdcProfile to an empty array', () => {
        const nsdcProfile: INsdcProfile = { id: 123 };
        expectedResult = service.addNsdcProfileToCollectionIfMissing([], nsdcProfile);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nsdcProfile);
      });

      it('should not add a NsdcProfile to an array that contains it', () => {
        const nsdcProfile: INsdcProfile = { id: 123 };
        const nsdcProfileCollection: INsdcProfile[] = [
          {
            ...nsdcProfile,
          },
          { id: 456 },
        ];
        expectedResult = service.addNsdcProfileToCollectionIfMissing(nsdcProfileCollection, nsdcProfile);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NsdcProfile to an array that doesn't contain it", () => {
        const nsdcProfile: INsdcProfile = { id: 123 };
        const nsdcProfileCollection: INsdcProfile[] = [{ id: 456 }];
        expectedResult = service.addNsdcProfileToCollectionIfMissing(nsdcProfileCollection, nsdcProfile);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nsdcProfile);
      });

      it('should add only unique NsdcProfile to an array', () => {
        const nsdcProfileArray: INsdcProfile[] = [{ id: 123 }, { id: 456 }, { id: 23343 }];
        const nsdcProfileCollection: INsdcProfile[] = [{ id: 123 }];
        expectedResult = service.addNsdcProfileToCollectionIfMissing(nsdcProfileCollection, ...nsdcProfileArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nsdcProfile: INsdcProfile = { id: 123 };
        const nsdcProfile2: INsdcProfile = { id: 456 };
        expectedResult = service.addNsdcProfileToCollectionIfMissing([], nsdcProfile, nsdcProfile2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nsdcProfile);
        expect(expectedResult).toContain(nsdcProfile2);
      });

      it('should accept null and undefined values', () => {
        const nsdcProfile: INsdcProfile = { id: 123 };
        expectedResult = service.addNsdcProfileToCollectionIfMissing([], null, nsdcProfile, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nsdcProfile);
      });

      it('should return initial array if no NsdcProfile is added', () => {
        const nsdcProfileCollection: INsdcProfile[] = [{ id: 123 }];
        expectedResult = service.addNsdcProfileToCollectionIfMissing(nsdcProfileCollection, undefined, null);
        expect(expectedResult).toEqual(nsdcProfileCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
