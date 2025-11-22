import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';
  role: 'buyer' | 'seller' = 'buyer';
  error = signal<string | null>(null);

  onSubmit() {
    this.auth.register(this.email, this.password, this.role).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Registration failed');
      }
    });
  }
}

