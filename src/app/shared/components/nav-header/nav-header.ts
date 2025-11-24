import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth-service';

@Component({
  selector: 'app-nav-header',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.scss',
})
export class NavHeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
