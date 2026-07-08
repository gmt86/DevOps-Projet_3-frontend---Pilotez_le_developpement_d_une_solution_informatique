import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';

/**
 * Configuration des routes de l'application DataShare.
 * - Routes publiques : login, register, download
 * - Routes protégées : nécessitent une authentification via AuthGuard
 */
export const routes: Routes = [

  // Routes avec layout (header + footer)
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Routes publiques
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
      },     
      {
        path: 'home',       
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },

       // Routes protégées
      {
        path: 'espace-personnel',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/espace-personnel/espace-personnel.component').then(m => m.EspacePersonnelComponent)
      },

      // Redirection par défaut
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Wildcard
  { path: '**', redirectTo: 'login' }
];