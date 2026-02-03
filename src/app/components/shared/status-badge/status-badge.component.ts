import { Component, Input } from '@angular/core';
import { ComplaintStatus, ComplaintPriority } from '../../../models/complaint.model';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input() status?: ComplaintStatus;
  @Input() priority?: ComplaintPriority;
  @Input() type: 'status' | 'priority' = 'status';

  get displayText(): string {
    if (this.type === 'status' && this.status) {
      const labels: Record<ComplaintStatus, string> = {
        'open': 'Open',
        'in-progress': 'In Progress',
        'pending': 'Pending',
        'resolved': 'Resolved',
        'closed': 'Closed'
      };
      return labels[this.status];
    }
    if (this.type === 'priority' && this.priority) {
      const labels: Record<ComplaintPriority, string> = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'urgent': 'Urgent'
      };
      return labels[this.priority];
    }
    return '';
  }

  get badgeClass(): string {
    if (this.type === 'status' && this.status) {
      return `badge--status-${this.status}`;
    }
    if (this.type === 'priority' && this.priority) {
      return `badge--priority-${this.priority}`;
    }
    return '';
  }
}
