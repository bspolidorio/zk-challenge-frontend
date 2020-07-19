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
}

export interface AvailabilitySlot {
  start: string;
  end: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  private model = 'professionals';

  constructor(private http: HttpClient) {}

  getProfessional(
    professionalId: Professional['id']
  ): Observable<Professional> {
    return this.http.get<Professional>(this.getUrl(professionalId));
  }

  getAvailability(
    professionalId: Professional['id'],
    startDate: string,
    endDate: string
  ): Observable<AvailabilitySlot[]> {
    return this.http.get<AvailabilitySlot[]>(
      this.getUrlByDate(professionalId, startDate, endDate)
    );
  }

  private getUrl(professionalId: Professional['id']) {
    return `${BASE_URL}${this.model}/${professionalId}`;
  }

  private getUrlByDate(
    professionalId: Professional['id'],
    startDate: string,
    endDate: string
  ) {
    return `${BASE_URL}${this.model}/${professionalId}/availability?startDate=${startDate}&endDate=${endDate}`;
  }
}
