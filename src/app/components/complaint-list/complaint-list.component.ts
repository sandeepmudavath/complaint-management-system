import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { 
  Complaint, 
  ComplaintStatus, 
  ComplaintCategory, 
  ComplaintPriority,
  STATUS_OPTIONS,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS 
} from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
  complaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];
  loading = true;

  // Filters
  searchTerm = '';
  selectedStatus: ComplaintStatus | '' = '';
  selectedCategory: ComplaintCategory | '' = '';
  selectedPriority: ComplaintPriority | '' = '';

  // Options for filters
  statusOptions = STATUS_OPTIONS;
  categoryOptions = CATEGORY_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private complaintService: ComplaintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.loading = true;
    this.complaintService.getComplaints().subscribe(complaints => {
      this.complaints = complaints;
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters(): void {
    let filtered = [...this.complaints];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.customerName.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(c => c.status === this.selectedStatus);
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(c => c.category === this.selectedCategory);
    }

    if (this.selectedPriority) {
      filtered = filtered.filter(c => c.priority === this.selectedPriority);
    }

    this.filteredComplaints = filtered;
    this.totalPages = Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedComplaints(): Complaint[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredComplaints.slice(start, start + this.itemsPerPage);
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedCategory = '';
    this.selectedPriority = '';
    this.applyFilters();
  }

  viewComplaint(id: string): void {
    this.router.navigate(['/complaints', id]);
  }

  editComplaint(event: Event, id: string): void {
    event.stopPropagation();
    this.router.navigate(['/complaints/edit', id]);
  }

  deleteComplaint(event: Event, id: string): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(id).subscribe(success => {
        if (success) {
          this.loadComplaints();
        }
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
