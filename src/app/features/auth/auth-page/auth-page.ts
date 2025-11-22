import { Component, signal } from '@angular/core';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.scss'],
  imports: [LoginComponent, RegisterComponent],
})
export class AuthPageComponent {
  isLoginMode = signal(true);

  showLogin() { this.isLoginMode.set(true) }

  showRegister() { this.isLoginMode.set(false) }
}

