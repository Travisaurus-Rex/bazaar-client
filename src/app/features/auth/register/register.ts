import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth-service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  email = '';
  password = '';
  role: 'buyer' | 'seller' = 'buyer';
  error = signal<string | null>(null);

  async onSubmit(): Promise<void> {
    this.error.set(null);

    try {
      await lastValueFrom(
        this.auth.register(this.email, this.password, this.role)
      )

      this.router.navigate(['/products']);
    } catch {
      this.error.set('Registration failed')
    }
  }
}

