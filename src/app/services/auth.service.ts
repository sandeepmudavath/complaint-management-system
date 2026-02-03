import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, DEMO_USERS, AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    otpSent: false,
    otpVerified: false
  };

  private authStateSubject = new BehaviorSubject<AuthState>(this.authState);

  constructor() {
    this.checkSession();
  }

  private checkSession(): void {
    const savedUser = localStorage.getItem('cms_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.authState = {
          isAuthenticated: true,
          user,
          otpSent: true,
          otpVerified: true
        };
        this.authStateSubject.next(this.authState);
      } catch {
        localStorage.removeItem('cms_user');
      }
    }
  }

  getAuthState(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.authState.user;
  }

  // Direct login with email and password
  login(email: string, password: string): Observable<{ success: boolean; message: string; user?: User }> {
    const demoUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && 
           u.password === password
    );

    if (demoUser) {
      this.authState = {
        isAuthenticated: true,
        user: demoUser.user,
        otpSent: true,
        otpVerified: true
      };
      this.authStateSubject.next(this.authState);
      
      // Save session
      localStorage.setItem('cms_user', JSON.stringify(demoUser.user));

      return of({ 
        success: true, 
        message: 'Login successful!',
        user: demoUser.user 
      }).pipe(delay(800));
    }

    return of({ 
      success: false, 
      message: 'Invalid email or password. Try: admin@company.com / admin123' 
    }).pipe(delay(500));
  }

  // Logout
  logout(): void {
    this.authState = {
      isAuthenticated: false,
      user: null,
      otpSent: false,
      otpVerified: false
    };
    this.authStateSubject.next(this.authState);
    localStorage.removeItem('cms_user');
  }
}
