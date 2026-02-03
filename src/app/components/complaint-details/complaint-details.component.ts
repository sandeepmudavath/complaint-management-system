import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint, ComplaintStatus, STATUS_OPTIONS } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.scss']
})
export class ComplaintDetailsComponent implements OnInit {
  complaint: Complaint | null = null;
  loading = true;
  statusOptions = STATUS_OPTIONS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadComplaint(id);
    }
  }

  loadComplaint(id: string): void {
    this.loading = true;
    this.complaintService.getComplaintById(id).subscribe(complaint => {
      this.complaint = complaint || null;
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

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'product': 'Product Issue',
      'service': 'Service Quality',
      'billing': 'Billing Problem',
      'delivery': 'Delivery Issue',
      'technical': 'Technical Support',
      'other': 'Other'
    };
    return labels[category] || category;
  }

  updateStatus(newStatus: ComplaintStatus): void {
    if (!this.complaint) return;
    
    const updates: Partial<Complaint> = { status: newStatus };
    if (newStatus === 'resolved' || newStatus === 'closed') {
      updates.resolvedAt = new Date();
    }
    
    this.complaintService.updateComplaint(this.complaint.id, updates).subscribe(updated => {
      if (updated) {
        this.complaint = updated;
      }
    });
  }

  editComplaint(): void {
    if (this.complaint) {
      this.router.navigate(['/complaints/edit', this.complaint.id]);
    }
  }

  deleteComplaint(): void {
    if (!this.complaint) return;
    
    if (confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
      this.complaintService.deleteComplaint(this.complaint.id).subscribe(success => {
        if (success) {
          this.router.navigate(['/complaints']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/complaints']);
  }
}
