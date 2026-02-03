import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  Complaint, 
  ComplaintStats, 
  ComplaintStatus, 
  ComplaintCategory, 
  ComplaintPriority 
} from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private complaints: Complaint[] = [];
  private complaintsSubject = new BehaviorSubject<Complaint[]>([]);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const mockComplaints: Complaint[] = [
      {
        id: 'CMP-001',
        title: 'Product not working as expected',
        description: 'The wireless headphones I purchased last week are not connecting to my phone via Bluetooth. I have tried resetting both devices multiple times but the issue persists.',
        category: 'product',
        priority: 'high',
        status: 'open',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '+1 234-567-8901',
        createdAt: new Date('2026-01-28'),
        updatedAt: new Date('2026-01-28')
      },
      {
        id: 'CMP-002',
        title: 'Incorrect billing amount',
        description: 'I was charged $150 instead of $99 for my monthly subscription. Please review and refund the difference.',
        category: 'billing',
        priority: 'urgent',
        status: 'in-progress',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        assignedTo: 'Mike Wilson',
        createdAt: new Date('2026-01-27'),
        updatedAt: new Date('2026-01-29')
      },
      {
        id: 'CMP-003',
        title: 'Delayed delivery',
        description: 'My order #ORD-45678 was supposed to arrive 5 days ago. Tracking shows it is still in transit. Need urgent resolution.',
        category: 'delivery',
        priority: 'high',
        status: 'pending',
        customerName: 'Michael Brown',
        customerEmail: 'mbrown@email.com',
        customerPhone: '+1 345-678-9012',
        assignedTo: 'Lisa Chen',
        createdAt: new Date('2026-01-25'),
        updatedAt: new Date('2026-01-30')
      },
      {
        id: 'CMP-004',
        title: 'Software installation issue',
        description: 'Unable to install the software on Windows 11. Getting error code 0x80070005. Need technical assistance.',
        category: 'technical',
        priority: 'medium',
        status: 'resolved',
        customerName: 'Emily Davis',
        customerEmail: 'emily.d@email.com',
        assignedTo: 'Tom Harris',
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date('2026-01-26'),
        resolvedAt: new Date('2026-01-26'),
        resolution: 'Provided step-by-step guide to run installer as administrator. Issue resolved successfully.'
      },
      {
        id: 'CMP-005',
        title: 'Poor customer service experience',
        description: 'Called support 3 times and was put on hold for over 30 minutes each time. Very frustrating experience.',
        category: 'service',
        priority: 'medium',
        status: 'closed',
        customerName: 'Robert Wilson',
        customerEmail: 'rwilson@email.com',
        assignedTo: 'Jane Doe',
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-22'),
        resolvedAt: new Date('2026-01-22'),
        resolution: 'Apologized for the inconvenience. Provided direct contact for future issues and offered 20% discount on next purchase.'
      },
      {
        id: 'CMP-006',
        title: 'Missing items in order',
        description: 'Ordered 5 items but only received 3. Order number is #ORD-78901. Missing: Blue T-shirt (L) and Black Jeans (32).',
        category: 'delivery',
        priority: 'high',
        status: 'open',
        customerName: 'Jennifer Martinez',
        customerEmail: 'jmartinez@email.com',
        customerPhone: '+1 456-789-0123',
        createdAt: new Date('2026-01-30'),
        updatedAt: new Date('2026-01-30')
      },
      {
        id: 'CMP-007',
        title: 'Refund not processed',
        description: 'Returned the item 2 weeks ago but have not received the refund yet. Return tracking shows item was delivered.',
        category: 'billing',
        priority: 'high',
        status: 'in-progress',
        customerName: 'David Lee',
        customerEmail: 'david.lee@email.com',
        assignedTo: 'Mike Wilson',
        createdAt: new Date('2026-01-29'),
        updatedAt: new Date('2026-02-01')
      },
      {
        id: 'CMP-008',
        title: 'App crashes frequently',
        description: 'The mobile app crashes every time I try to view my order history. Using iPhone 14 with iOS 17.2.',
        category: 'technical',
        priority: 'medium',
        status: 'open',
        customerName: 'Amanda Taylor',
        customerEmail: 'ataylor@email.com',
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date('2026-02-01')
      }
    ];

    this.complaints = mockComplaints;
    this.complaintsSubject.next(this.complaints);
  }

  getComplaints(): Observable<Complaint[]> {
    return this.complaintsSubject.asObservable();
  }

  getComplaintById(id: string): Observable<Complaint | undefined> {
    return of(this.complaints.find(c => c.id === id)).pipe(delay(300));
  }

  getStats(): Observable<ComplaintStats> {
    const stats: ComplaintStats = {
      total: this.complaints.length,
      open: this.complaints.filter(c => c.status === 'open').length,
      inProgress: this.complaints.filter(c => c.status === 'in-progress').length,
      resolved: this.complaints.filter(c => c.status === 'resolved').length,
      closed: this.complaints.filter(c => c.status === 'closed').length
    };
    return of(stats).pipe(delay(200));
  }

  getRecentComplaints(limit: number = 5): Observable<Complaint[]> {
    const sorted = [...this.complaints]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
    return of(sorted).pipe(delay(200));
  }

  createComplaint(complaint: Partial<Complaint>): Observable<Complaint> {
    const newComplaint: Complaint = {
      id: `CMP-${String(this.complaints.length + 1).padStart(3, '0')}`,
      title: complaint.title || '',
      description: complaint.description || '',
      category: complaint.category || 'other',
      priority: complaint.priority || 'medium',
      status: 'open',
      customerName: complaint.customerName || '',
      customerEmail: complaint.customerEmail || '',
      customerPhone: complaint.customerPhone,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.complaints = [newComplaint, ...this.complaints];
    this.complaintsSubject.next(this.complaints);
    return of(newComplaint).pipe(delay(500));
  }

  updateComplaint(id: string, updates: Partial<Complaint>): Observable<Complaint | undefined> {
    const index = this.complaints.findIndex(c => c.id === id);
    if (index !== -1) {
      this.complaints[index] = {
        ...this.complaints[index],
        ...updates,
        updatedAt: new Date()
      };
      this.complaintsSubject.next(this.complaints);
      return of(this.complaints[index]).pipe(delay(500));
    }
    return of(undefined);
  }

  deleteComplaint(id: string): Observable<boolean> {
    const index = this.complaints.findIndex(c => c.id === id);
    if (index !== -1) {
      this.complaints.splice(index, 1);
      this.complaintsSubject.next(this.complaints);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  filterComplaints(
    status?: ComplaintStatus,
    category?: ComplaintCategory,
    priority?: ComplaintPriority,
    searchTerm?: string
  ): Observable<Complaint[]> {
    let filtered = [...this.complaints];

    if (status) {
      filtered = filtered.filter(c => c.status === status);
    }
    if (category) {
      filtered = filtered.filter(c => c.category === category);
    }
    if (priority) {
      filtered = filtered.filter(c => c.priority === priority);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.customerName.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term)
      );
    }

    return of(filtered).pipe(delay(200));
  }
}
