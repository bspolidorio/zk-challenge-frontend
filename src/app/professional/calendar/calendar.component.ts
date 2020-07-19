import { Component, OnInit } from '@angular/core';
import {
  ProfessionalsService,
  AvailabilitySlot,
} from 'src/app/shared/services/professionals.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

type AvailabilityByDay = AvailabilitySlot[][];
interface AvailabilityHashmap {
  [key: string]: AvailabilitySlot[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  availabilitySlots: AvailabilitySlot[] = [];
  today = moment().format('YYYY-MM-DD');
  firstDay = this.today;
  weekDays: string[];
  availabilityByDay: AvailabilityByDay;
  userLocale: string;
  userLocalTimezone: string;
  private professionalId: number = Number(this.route.snapshot.params['id']);
  private userTimezone: string;
  private numberOfDays = 4;
  private lastDay = moment(this.firstDay).add(3, `days`).format('YYYY-MM-DD');
  private startDate: string;
  private endDate: string;

  constructor(
    private professionalsService: ProfessionalsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAvailability();
    this.getWeekDays(this.firstDay);
  }

  private loadAvailability(): void {
    this.getUserLocalTimezone();
    this.getStartAndEndDateTimes();

    this.professionalsService
      .getAvailability(this.professionalId, this.startDate, this.endDate)
      .subscribe(
        (availabilitySlots) => (
          (this.availabilitySlots = availabilitySlots),
          this.groupAvailabilityByDays(),
          this.fillEmptySlotsWithHyphen()
        )
      );
  }

  private groupAvailabilityByDays() {
    const initial: AvailabilityHashmap = this.weekDays.reduce((acc, item) => {
      return { ...acc, [item]: [] };
    }, {});
    const availability = this.availabilitySlots.reduce((acc, item) => {
      item.start = moment(item.start).toISOString(true);
      item.end = moment(item.end).toISOString(true);

      const date = item.start.split('T')[0];

      acc[date].push(item);
      return acc;
    }, initial);
    this.availabilityByDay = Object.keys(availability).map((date) => {
      return availability[date];
    });
  }

  private getWeekDays(firstDay: string): void {
    this.weekDays = [];
    for (let i = 0; i < this.numberOfDays; i++) {
      this.weekDays.push(moment(firstDay).add(i, 'days').format('YYYY-MM-DD'));
    }
  }

  private getStartAndEndDateTimes(): void {
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

  private fillEmptySlotsWithHyphen(): void {
    let maxSlots = this.availabilityByDay.reduce((acc, item) => {
      return acc > item.length ? acc : item.length;
    }, 5);

    for (let i = 0; i <= maxSlots; i++) {
      for (let x = 0; x < this.numberOfDays; x++) {
        if (this.availabilityByDay[x].length <= maxSlots)
          this.availabilityByDay[x].push({
            start: '',
            end: '',
          });
      }
    }
  }

  private loadingPage(): void {
    this.availabilityByDay = [];
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

  isString(value: any) {
    return typeof value === 'string';
  }

  selectedSpot(value: AvailabilitySlot) {
    console.log(value);
  }
}
