import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  loading = false;
  error = '';
  success = '';
  
  showPassword = false;
  returnUrl = '/dashboard';
  
  // Demo credentials display
  showDemoCredentials = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    // Get return URL
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.markFormTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.success = response.message;
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 500);
        } else {
          this.error = response.message;
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'An error occurred. Please try again.';
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  fillDemoCredentials(email: string, password: string): void {
    this.loginForm.patchValue({ email, password });
  }

  private markFormTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field?.touched || !field?.errors) return '';

    if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['minlength']) return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;

    return '';
  }
}
