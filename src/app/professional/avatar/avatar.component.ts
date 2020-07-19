import { Component, Input } from '@angular/core';
import { Professional } from 'src/app/shared/services/professionals.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() professional: Professional;
  @Input() stars: string[];
}
