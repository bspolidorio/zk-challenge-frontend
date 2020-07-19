import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalComponent } from './professional.component';
import { ProfessionalsService } from '../shared/services/professionals.service';

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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
