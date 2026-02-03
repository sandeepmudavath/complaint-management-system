export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  attachments?: string[];
}

export type ComplaintCategory = 
  | 'product'
  | 'service'
  | 'billing'
  | 'delivery'
  | 'technical'
  | 'other';

export type ComplaintPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type ComplaintStatus = 
  | 'open'
  | 'in-progress'
  | 'pending'
  | 'resolved'
  | 'closed';

export interface ComplaintStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
}

export const CATEGORY_OPTIONS: { value: ComplaintCategory; label: string; icon: string }[] = [
  { value: 'product', label: 'Product Issue', icon: 'inventory_2' },
  { value: 'service', label: 'Service Quality', icon: 'support_agent' },
  { value: 'billing', label: 'Billing Problem', icon: 'receipt_long' },
  { value: 'delivery', label: 'Delivery Issue', icon: 'local_shipping' },
  { value: 'technical', label: 'Technical Support', icon: 'build' },
  { value: 'other', label: 'Other', icon: 'more_horiz' }
];

export const PRIORITY_OPTIONS: { value: ComplaintPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: '#10b981' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#f97316' },
  { value: 'urgent', label: 'Urgent', color: '#ef4444' }
];

export const STATUS_OPTIONS: { value: ComplaintStatus; label: string; color: string }[] = [
  { value: 'open', label: 'Open', color: '#3b82f6' },
  { value: 'in-progress', label: 'In Progress', color: '#8b5cf6' },
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
  { value: 'resolved', label: 'Resolved', color: '#10b981' },
  { value: 'closed', label: 'Closed', color: '#6b7280' }
];
