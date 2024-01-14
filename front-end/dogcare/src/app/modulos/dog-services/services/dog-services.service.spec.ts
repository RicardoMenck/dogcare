import { TestBed } from '@angular/core/testing';

import { DogServicesService } from './dog-services.service';

describe('DogServicesService', () => {
  let service: DogServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
