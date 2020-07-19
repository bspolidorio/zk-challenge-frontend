import { TestBed } from '@angular/core/testing';

import { ProfessionalsService } from './professionals.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProfessionalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
