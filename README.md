# DataShare Frontend

Application Angular pour la plateforme de transfert sécurisé de fichiers DataShare.

## Proxy de développement

Le fichier `proxy.conf.json` configure le proxy Angular pour le développement local.

Il redirige automatiquement toutes les requêtes commençant par `/api` vers le backend Spring Boot (`http://localhost:8080`).

**Exemple :**
- Angular envoie : `/api/auth/login`
- Le proxy redirige vers : `http://localhost:8080/api/auth/login`

Cela évite les erreurs CORS en développement et permet aux services Angular d'utiliser des URLs courtes comme `/api/...` sans connaître l'adresse complète du backend.

## Prérequis

- Node.js >= 18
- Angular CLI >= 19
- Backend Spring Boot en cours d'exécution sur le port 8080

## Installation

```bash
npm install
```

## Lancement

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`.