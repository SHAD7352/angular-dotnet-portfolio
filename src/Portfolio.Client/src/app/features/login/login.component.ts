import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  error = signal('');
  isLoading = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.email() || !this.password()) {
      this.error.set('Email and password are required');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    this.authService.login(this.email(), this.password(), this.rememberMe()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Invalid email or password');
        console.error('Login error', err);
      }
    });
  }
}
