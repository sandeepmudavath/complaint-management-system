import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value: number | string = 0;
  @Input() icon = 'analytics';
  @Input() trend?: number;
  @Input() trendLabel?: string;
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'primary';
}
