import { Component, Input } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'All Complaints', icon: 'list_alt', route: '/complaints', badge: 8 },
    { label: 'New Complaint', icon: 'add_circle', route: '/complaints/new' }
  ];

  secondaryItems: MenuItem[] = [
    { label: 'Reports', icon: 'assessment', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Help', icon: 'help', route: '/help' }
  ];
}
