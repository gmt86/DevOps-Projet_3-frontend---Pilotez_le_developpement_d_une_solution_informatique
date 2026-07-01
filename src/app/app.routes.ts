import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Configuration des routes de l'application DataShare.
 * - Routes publiques : login, register
 * - Routes protégées : nécessitent une authentification via AuthGuard
 */
export const routes: Routes = [

  // Routes publiques
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Routes protégées
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        // path: 'home',
        // loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        // path: 'espace-personnel',
        // loadComponent: () => import('./pages/espace-personnel/espace-personnel.component').then(m => m.EspacePersonnelComponent)
      }
    ]
  },

  // Redirection par défaut
  { path: '**', redirectTo: 'login' }
];