import { Component, OnInit } from '@angular/core';

import {
  ProfessionalsService,
  Professional,
} from '../shared/services/professionals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
})
export class ProfessionalComponent implements OnInit {
  professional: Professional;
  stars: string[];
  private professionalId = this.route.snapshot.params['id'];

  constructor(
    private professionalsService: ProfessionalsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProfessional(this.professionalId);
  }

  private loadProfessional(professionalId): void {
    this.professionalsService
      .getProfessional(professionalId)
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
