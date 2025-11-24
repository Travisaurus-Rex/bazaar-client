import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth-service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  email = '';
  password = '';
  error = signal<string | null>(null);

  async onSubmit(): Promise<void> {
    this.error.set(null);

    try {
      await firstValueFrom(
        this.auth.login(this.email, this.password)
      );

      this.router.navigate(['/products']);

    } catch (err: any) {
      this.error.set(err.error?.message || 'Invalid login');
    }
  }
}

