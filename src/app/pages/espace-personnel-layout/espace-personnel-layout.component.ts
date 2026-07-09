import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Layout spécifique à l'espace personnel.
 * Contient une sidebar gauche avec logo, navigation et copyright
 * et une zone droite avec header et contenu.
 */
@Component({
  selector: 'app-espace-personnel-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './espace-personnel-layout.component.html',
  styleUrl: './espace-personnel-layout.component.scss'
})
export class EspacePersonnelLayoutComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  /** Année en cours pour le copyright */
  currentYear: number = new Date().getFullYear();

  /**
   * Déconnecte l'utilisateur et redirige vers login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}