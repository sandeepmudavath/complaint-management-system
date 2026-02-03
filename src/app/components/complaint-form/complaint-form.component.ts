import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { 
  Complaint, 
  CATEGORY_OPTIONS, 
  PRIORITY_OPTIONS, 
  STATUS_OPTIONS 
} from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.scss']
})
export class ComplaintFormComponent implements OnInit {
  complaintForm: FormGroup;
  isEditMode = false;
  complaintId: string | null = null;
  loading = false;
  submitting = false;

  categoryOptions = CATEGORY_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;
  statusOptions = STATUS_OPTIONS;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService
  ) {
    this.complaintForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      category: ['product', Validators.required],
      priority: ['medium', Validators.required],
      status: ['open'],
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: [''],
      assignedTo: [''],
      resolution: ['']
    });
  }

  ngOnInit(): void {
    this.complaintId = this.route.snapshot.paramMap.get('id');
    if (this.complaintId) {
      this.isEditMode = true;
      this.loadComplaint();
    }
  }

  loadComplaint(): void {
    if (!this.complaintId) return;
    
    this.loading = true;
    this.complaintService.getComplaintById(this.complaintId).subscribe(complaint => {
      if (complaint) {
        this.complaintForm.patchValue({
          title: complaint.title,
          description: complaint.description,
          category: complaint.category,
          priority: complaint.priority,
          status: complaint.status,
          customerName: complaint.customerName,
          customerEmail: complaint.customerEmail,
          customerPhone: complaint.customerPhone || '',
          assignedTo: complaint.assignedTo || '',
          resolution: complaint.resolution || ''
        });
      }
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.complaintForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const formData = this.complaintForm.value;

    if (this.isEditMode && this.complaintId) {
      this.complaintService.updateComplaint(this.complaintId, formData).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/complaints', this.complaintId]);
        },
        error: () => {
          this.submitting = false;
        }
      });
    } else {
      this.complaintService.createComplaint(formData).subscribe({
        next: (complaint) => {
          this.submitting = false;
          this.router.navigate(['/complaints', complaint.id]);
        },
        error: () => {
          this.submitting = false;
        }
      });
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.complaintForm.controls).forEach(key => {
      this.complaintForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.complaintForm.get(fieldName);
    if (!field?.touched || !field?.errors) return '';

    if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['minlength']) {
      return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.errors['maxlength']) {
      return `${this.getFieldLabel(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters`;
    }

    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      title: 'Title',
      description: 'Description',
      category: 'Category',
      priority: 'Priority',
      customerName: 'Customer name',
      customerEmail: 'Email'
    };
    return labels[fieldName] || fieldName;
  }

  cancel(): void {
    if (this.isEditMode && this.complaintId) {
      this.router.navigate(['/complaints', this.complaintId]);
    } else {
      this.router.navigate(['/complaints']);
    }
  }
}
