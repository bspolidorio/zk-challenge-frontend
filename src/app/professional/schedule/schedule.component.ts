import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  @Input() today: string;
  @Input() weekDays: string[];
  @Input() firstDay: string;
  @Input() availabilityByDay;
  @Input() userLocalTimezone;
  @Input() userLocale;

  @Output() backed = new EventEmitter();
  @Output() forwarded = new EventEmitter();
  @Output() spot = new EventEmitter();
}
