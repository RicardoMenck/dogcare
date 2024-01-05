import { TestBed } from '@angular/core/testing';

import { GuardRestritoService } from './guard-restrito.service';

describe('GuardRestritoService', () => {
  let service: GuardRestritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardRestritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
