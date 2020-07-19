import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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
  today = moment().format('YYYY-MM-DD');
  firstDay = this.today;
  weekDays: string[];
  availabilityByDay = null;
  userLocale = null;
  userLocalTimezone = null;
  private professionalId = 1;
  private userTimezone = null;
  private numberOfDays = 4;
  private lastDay = moment(this.firstDay).add(3, `days`).format('YYYY-MM-DD');
  private startDate = null;
  private endDate = null;

  constructor(private professionalsService: ProfessionalsService) {}

  ngOnInit(): void {
    this.loadProfessional();
    this.loadAvailability();
    this.getWeekDays(this.firstDay);
  }

  private loadProfessional(): void {
    this.professionalsService
      .getProfessional(this.professionalId)
      .subscribe(
        (professional) => ((this.professional = professional), this.getStars())
      );
  }

  private loadAvailability(): void {
    this.getUserLocalTimezone();
    this.getStartAndEndDays();

    this.professionalsService
      .getAvailability(this.professionalId, this.startDate, this.endDate)
      .subscribe(
        (professional: any) => (
          (this.professional.availability = professional),
          this.groupAvailabilityByDays(),
          this.fillEmptySlotsWithHyphen()
        )
      );
  }

  private groupAvailabilityByDays() {
    const initial = this.weekDays.reduce((acc, item) => {
      return { ...acc, [item]: [] };
    }, {});
    this.availabilityByDay = this.professional.availability.reduce(
      (acc, item: any) => {
        item.start = moment(item.start).toISOString(true);
        item.end = moment(item.end).toISOString(true);

        const date = item.start.split('T')[0];

        acc[date].push(item);
        return acc;
      },
      initial
    );
    this.availabilityByDay = Object.keys(this.availabilityByDay).map((date) => {
      return this.availabilityByDay[date];
    });
  }

  private getWeekDays(firstDay): void {
    this.weekDays = [];
    for (let i = 0; i < this.numberOfDays; i++) {
      this.weekDays.push(moment(firstDay).add(i, 'days').format('YYYY-MM-DD'));
    }
  }

  private getStartAndEndDays(): void {
    this.startDate = moment
      .parseZone(`${this.firstDay}T00:00:00${this.userTimezone}`)
      .utc()
      .toISOString();

    this.endDate = moment
      .parseZone(`${this.lastDay}T23:59:59${this.userTimezone}`)
      .utc()
      .toISOString();
  }

  backWeek(firstDay: string): void {
    this.loadingPage();
    this.firstDay = moment(firstDay).subtract(3, 'days').format('YYYY-MM-DD');
    this.lastDay = moment(this.firstDay).add(3, 'days').format('YYYY-MM-DD');

    this.getWeekDays(this.firstDay);
    this.loadAvailability();
  }

  forwardWeek(firstDay: string): void {
    this.loadingPage();
    this.firstDay = moment(firstDay).add(3, 'days').format('YYYY-MM-DD');
    this.lastDay = moment(this.firstDay).add(3, 'days').format('YYYY-MM-DD');

    this.getWeekDays(this.firstDay);
    this.loadAvailability();
  }

  private getStars(): void {
    this.stars = [];
    for (let i = 0; i < this.professional.stars; i++) {
      const star = '*';
      this.stars.push(star);
    }
  }

  private fillEmptySlotsWithHyphen(): void {
    let maxSlots = this.availabilityByDay.reduce((acc, item) => {
      return acc > item.length ? acc : item.length;
    }, 5);

    for (let i = 0; i <= maxSlots; i++) {
      for (let x = 0; x < this.numberOfDays; x++) {
        if (this.availabilityByDay[x].length <= maxSlots)
          this.availabilityByDay[x].push(' - ');
      }
    }
  }

  private loadingPage(): void {
    this.availabilityByDay = null;
  }

  private getUserLocalTimezone(): void {
    const signal = moment().format('Z').slice(0, 1);
    const number = Number(moment().format('Z').slice(1, 3)).toString();

    this.userLocalTimezone = signal.concat(number);
    this.userTimezone = moment().format('Z');
    this.userLocale = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split('/')[1];
  }

  selectedSpot(event) {
    console.log(event);
  }
}
