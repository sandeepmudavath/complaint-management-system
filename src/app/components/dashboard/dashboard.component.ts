import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint, ComplaintStats } from '../../models/complaint.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: ComplaintStats = {
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  };
  recentComplaints: Complaint[] = [];
  loading = true;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.complaintService.getStats().subscribe(stats => {
      this.stats = stats;
    });

    this.complaintService.getRecentComplaints(5).subscribe(complaints => {
      this.recentComplaints = complaints;
      this.loading = false;
    });
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'product': 'inventory_2',
      'service': 'support_agent',
      'billing': 'receipt_long',
      'delivery': 'local_shipping',
      'technical': 'build',
      'other': 'more_horiz'
    };
    return icons[category] || 'help';
  }
}
