import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalComponent } from './professional.component';
import { ProfessionalsService } from '../shared/services/professionals.service';
import { AvailabilityService } from '../shared/services/availability.service';

const professionalsServiceStub = {
  getProfessional: () => {
    return { subscribe: () => {} };
  },
};
const availabilityServiceStub = {};

describe('ProfessionalComponent', () => {
  let component: ProfessionalComponent;
  let fixture: ComponentFixture<ProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalComponent],
      providers: [
        { provide: ProfessionalsService, useValue: professionalsServiceStub },
        { provide: AvailabilityService, useValue: availabilityServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.numberOfDays).toBe(4);
  });
});
