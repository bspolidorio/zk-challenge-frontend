import { Component, OnInit } from '@angular/core';

import {
  ProfessionalsService,
  Professional,
} from '../shared/services/professionals.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
})
export class ProfessionalComponent implements OnInit {
  professional: Professional;
  stars: string[];
  private professionalId = 1;

  constructor(private professionalsService: ProfessionalsService) {}

  ngOnInit(): void {
    this.loadProfessional();
  }

  private loadProfessional(): void {
    this.professionalsService
      .getProfessional(this.professionalId)
      .subscribe(
        (professional) => ((this.professional = professional), this.getStars())
      );
  }

  private getStars(): void {
    this.stars = [];
    for (let i = 0; i < this.professional.stars; i++) {
      const star = '*';
      this.stars.push(star);
    }
  }
}
