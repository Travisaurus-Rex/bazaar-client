import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadComponent: () => import('./features/auth/auth-page/auth-page').then(m => m.AuthPageComponent) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

