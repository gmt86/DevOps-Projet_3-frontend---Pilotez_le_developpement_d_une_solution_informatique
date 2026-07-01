import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Service centralisé de gestion des erreurs HTTP.
 * Traduit les codes d'erreur du backend en messages lisibles pour l'utilisateur.
 * Evite la duplication de la gestion des erreurs dans chaque composant.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  /**
   * Traduit une erreur HTTP en message lisible.
   */
  getErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }

    switch (error.status) {
      case 400: return 'Données invalides.';
      case 401: return 'Email ou mot de passe incorrect.';
      case 403: return 'Accès refusé.';
      case 404: return 'Ressource introuvable.';
      case 409: return 'Email déjà utilisé.';
      case 500: return 'Erreur interne du serveur.';
      default:  return 'Une erreur inattendue est survenue.';
    }
  }
}