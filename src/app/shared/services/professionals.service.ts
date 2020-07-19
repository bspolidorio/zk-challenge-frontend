import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3333/';

export interface Professional {
  id: number;
  name: string;
  image: string;
  specialty: string;
  locale: string;
  stars: number;
  reviews: number;
  price: number;
  time: number;
  description: string;
  availability: Availability[];
}

interface Availability {}

@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  private model = 'professionals';

  constructor(private http: HttpClient) {}

  getProfessional(professionalId): Observable<Professional> {
    return this.http.get<Professional>(this.getUrl(professionalId));
  }

  getAvailability(professionalId, startDate, endDate) {
    console.log(this.getUrlByDate(professionalId, startDate, endDate));
    return this.http.get(this.getUrlByDate(professionalId, startDate, endDate));
  }

  private getUrl(professionalId) {
    return `${BASE_URL}${this.model}/${professionalId}`;
  }

  private getUrlByDate(professionalId, startDate, endDate) {
    return `${BASE_URL}${this.model}/${professionalId}/availability?startDate=${startDate}&endDate=${endDate}`;
  }
}
