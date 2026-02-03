export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  otpSent: boolean;
  otpVerified: boolean;
}

// Dummy users for demo
export const DEMO_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'admin@company.com',
    password: 'admin123',
    user: {
      id: 'USR-001',
      email: 'admin@company.com',
      name: 'Admin User',
      role: 'admin'
    }
  },
  {
    email: 'agent@company.com',
    password: 'agent123',
    user: {
      id: 'USR-002',
      email: 'agent@company.com',
      name: 'Support Agent',
      role: 'agent'
    }
  },
  {
    email: 'demo@example.com',
    password: 'demo123',
    user: {
      id: 'USR-003',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user'
    }
  }
];
