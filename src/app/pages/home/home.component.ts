import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FichierService } from '../../core/services/fichier.service';
import { ErrorService } from '../../core/services/error.service';
import { FichierResponse } from '../../models/fichier.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Composant de la page d'accueil.
 * Gère le formulaire d'upload de fichier.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private fichierService = inject(FichierService);
  private errorService = inject(ErrorService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private authService = inject(AuthService);

  /** Formulaire d'upload */
  uploadForm: FormGroup = new FormGroup({});

  /** Fichier sélectionné */
  selectedFile: File | null = null;

  /** Résultat après upload réussi */
  uploadResult: FichierResponse | null = null;

  /** Contrôle l'affichage du formulaire d'upload */
  showForm: boolean = false;

  /** Message d'erreur */
  errorMessage: string = '';

  /** Indicateur de chargement */
  isLoading: boolean = false;

  /** Indique si le formulaire a été soumis */
  submitted: boolean = false;

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      dateExpiration: ['', [Validators.required]],
      password: ['']
    });
  }

  get form() {
    return this.uploadForm.controls;
  }

  /** Année en cours pour le copyright */
  currentYear: number = new Date().getFullYear();

  /**
   * Gère la sélection du fichier.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  /**
   * Soumet le formulaire d'upload.
   */
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier.';
      return;
    }

    if (this.uploadForm.invalid) {
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('fichier', this.selectedFile);
    formData.append('dateExpiration', this.form['dateExpiration'].value);
    if (this.form['password'].value) {
      formData.append('password', this.form['password'].value);
    }

    this.fichierService.uploadFichier(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.uploadResult = response;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = this.errorService.getErrorMessage(error);
          this.isLoading = false;
        }
      });
  }


  
  /**
 * Affiche le formulaire si connecté, sinon redirige vers login.
 */
  showUploadForm(): void {
    if (this.authService.isAuthenticated()) {
      this.showForm = true;
    } else {
      this.router.navigate(['/login']);
    }
  }


  /**
   * Copie le lien de téléchargement dans le presse-papier.
   */
  copyLink(): void {
    if (this.uploadResult) {
      const link = `${window.location.origin}/download/${this.uploadResult.tokenTelechargement}`;
      navigator.clipboard.writeText(link);
    }
  }

  /**
 * Retourne le lien de téléchargement complet.
 */
  getDownloadLink(): string {
    return `${window.location.origin}/download/${this.uploadResult?.tokenTelechargement}`;
  }

  /**
   * Réinitialise le formulaire pour un nouvel upload.
   */
  reset(): void {
    this.uploadForm.reset();
    this.selectedFile = null;
    this.uploadResult = null;
    this.errorMessage = '';
    this.submitted = false;
  }
}