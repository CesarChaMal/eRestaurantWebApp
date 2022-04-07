import { TestBed } from '@angular/core/testing';

import { RestaurantUserService } from './restaurant-user.service';

describe('RestaurantUserService', () => {
  let service: RestaurantUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
