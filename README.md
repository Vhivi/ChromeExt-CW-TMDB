# Extension Chrome : CaptainWatch → TMDB

## Table des matières

- [Extension Chrome : CaptainWatch → TMDB](#extension-chrome--captainwatch--tmdb)
  - [Table des matières](#table-des-matières)
  - [Objectif](#objectif)
  - [Fonctionnalités principales](#fonctionnalités-principales)
  - [Portée et sécurité](#portée-et-sécurité)
  - [Exemples](#exemples)
  - [Technologies utilisées](#technologies-utilisées)
  - [Structure du projet](#structure-du-projet)
  - [TODO – Étapes de développement](#todo--étapes-de-développement)
  - [Instructions d’installation](#instructions-dinstallation)
    - [Installation au format `.zip` (mode développeur)](#installation-au-format-zip-mode-développeur)

## Objectif

Créer une extension pour navigateurs basés sur Chromium (Chrome, Edge, Brave, etc.) qui permet, lorsqu’on visite une page CaptainWatch, de générer et d’ouvrir l’URL correspondante sur The Movie Database (TMDB).

## Fonctionnalités principales

- Conversion bidirectionnelle :
  - CaptainWatch → TMDB
  - TMDB → CaptainWatch
- L’extension est active uniquement si l’onglet courant correspond à une URL CaptainWatch **ou** TMDB valide.
- Un bouton d’action (icône dans la barre d’outils) permet de transformer l’URL CaptainWatch en URL TMDB, ou l’URL TMDB en URL CaptainWatch, et d’ouvrir la nouvelle adresse dans un nouvel onglet.
- L’icône change dynamiquement selon le contexte :
  - Icônes CaptainWatch (verte/rouge) sur les pages CaptainWatch
  - Icônes TMDB (verte/rouge) sur les pages TMDB
- Extraction automatique du type de contenu ("serie", "film", "artiste" ou "tv", "movie", "person") et de l’identifiant numérique depuis l’URL.
- Génération de l’URL correspondante :
  - CaptainWatch :
    - `serie` → `tv`
    - `film` → `movie`
    - `artiste` → `person`
  - TMDB :
    - `tv` → `serie`
    - `movie` → `film`
    - `person` → `artiste` (⚠️ Pour les artistes, l’URL CaptainWatch doit se terminer par `/-`)
- Ouverture de l’URL générée dans un nouvel onglet.
- Structure modulaire : la logique métier est centralisée dans `utils.js` et utilisée dans `background.js`.
- Tests unitaires avec Jest sur la logique métier (`utils.test.js`).
- Fichier `.gitignore` pour la publication propre du projet.

## Portée et sécurité

L’extension n’est active et n’a accès qu’aux pages des domaines suivants :

- CaptainWatch :
  - `https://www.captainwatch.com/serie/*`
  - `https://www.captainwatch.com/film/*`
  - `https://www.captainwatch.com/artiste/*`
- TMDB :
  - `https://www.themoviedb.org/tv/*`
  - `https://www.themoviedb.org/movie/*`
  - `https://www.themoviedb.org/person/*`
Cela garantit que l’extension ne fonctionne que sur ces URLs et ne collecte ni n’interagit avec d’autres sites ou données.

## Exemples

- CaptainWatch → TMDB :
  - `https://www.captainwatch.com/serie/93405/squid-game` → `https://www.themoviedb.org/tv/93405`
  - `https://www.captainwatch.com/film/27205/inception` → `https://www.themoviedb.org/movie/27205`
  - `https://www.captainwatch.com/artiste/138/quentin-tarantino` → `https://www.themoviedb.org/person/138`
- TMDB → CaptainWatch :
  - `https://www.themoviedb.org/tv/93405` → `https://www.captainwatch.com/serie/93405/`
  - `https://www.themoviedb.org/movie/27205` → `https://www.captainwatch.com/film/27205/`
  - `https://www.themoviedb.org/person/138` → `https://www.captainwatch.com/artiste/138/-` (⚠️ `/person` → `/artiste/-`)

## Technologies utilisées

- Manifest V3 (standard Chrome Extensions)
- JavaScript (ES6+)
- Icônes verte et rouge pour l’état actif/inactif (dossier `icons`)
- Jest pour les tests unitaires

## Structure du projet

- `manifest.json` : Déclaration de l’extension
- `background.js` : Gestion de l’activation, de l’action du bouton et du changement d’icône contextuel (CaptainWatch/TMDB)
- `utils.js` : Fonctions métier (extraction, mapping, génération d’URL dans les deux sens, gestion du cas artiste)
- `test/` : Dossier des tests unitaires Jest (ex : utils.test.js)
- `icons/` : Icônes verte et rouge pour CaptainWatch et TMDB (ex : icon48-green.png, icon48-tmdb-green.png, etc.)
- `.gitignore` : Fichiers à exclure du dépôt
- `README.md` : Documentation et instructions
- `screenshots/` : Captures d’écran pour la documentation

## TODO – Étapes de développement

- [x] Initialiser le projet et créer le manifest.json
- [x] Détecter l’URL CaptainWatch et activer le bouton uniquement sur les pages valides
- [x] Extraire le type de contenu et l’identifiant depuis l’URL
- [x] Générer l’URL TMDB correspondante (mapping type)
- [x] Ouvrir la nouvelle URL TMDB dans un onglet
- [x] Gérer le changement d’icône (verte/rouge) selon l’état (dossier `icons`)
- [x] Centraliser la logique métier dans `utils.js` et l’utiliser dans `background.js`
- [x] Ajouter des tests unitaires avec Jest (`utils.test.js`)
- [x] Ajouter un fichier `.gitignore` pour la publication
- [x] Tester le fonctionnement sur différents cas d’URL
- [x] Finaliser et maintenir la documentation (README)
- [x] Adapter les icônes si besoin (tailles, couleurs)
- [x] Nettoyer le projet
- [x] Faire les captures d’écran pour la documentation
- [x] Mettre à jour le README avec les instructions d’installation
- [x] Préparer une release pour distribution restreinte
- [x] Ajouter la conversion TMDB → CaptainWatch
- [x] Gérer le cas particulier `/person` → `/artiste/-`
- [x] Changement d’icônes contextuelles (TMDB/CaptainWatch)

## Instructions d’installation

### Installation au format `.zip` (mode développeur)

1. Téléchargez la dernière release `.zip` depuis la page [Releases du dépôt GitHub](https://github.com/Vhivi/ChromeExt-CW-TMDB/releases/latest).
2. Décompressez-le dans un dossier.
3. Ouvrez la page des extensions de votre navigateur :
   - **Chrome** : `chrome://extensions/`
   - **Brave** : `brave://extensions/`
   - **Opera** : `opera://extensions/`
   - **Edge** : `edge://extensions/`
   - Autres navigateurs Chromium : cherchez « extensions » dans la barre d’adresse.
4. Activez le « Mode développeur » (généralement en haut à droite).

   ![Mode développeur](screenshots/chrome-dev-mode.jpg)
5. Cliquez sur « Charger l’extension non empaquetée » et sélectionnez le dossier décompressé.

   ![Charger l’extension](screenshots/chrome-load.jpg)
6. L’extension devrait apparaître dans la liste avec son icône. Assurez-vous qu’elle est activée.

   ![Extension activée](screenshots/chrome-activate.jpg)
7. Épinglez l’icône de l’extension dans la barre d’outils pour un accès rapide.

   ![Barre d’outils](screenshots/chrome-pin.jpg)
8. Profitez de l’extension ! En dehors des pages CaptainWatch et TMDB, l’icône sera rouge et l'extension inactive.

   ![Extension inactive](screenshots/chrome-enjoy.jpg)
9. Sur une page valide, elle deviendra verte et cliquable.

   ![Extension active](screenshots/chrome-click.jpg)
