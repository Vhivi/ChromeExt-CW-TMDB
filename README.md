# Extension Chrome : CaptainWatch → TMDB

## Objectif

Créer une extension pour navigateurs basés sur Chromium (Chrome, Edge, Brave, etc.) qui permet, lorsqu’on visite une page CaptainWatch, de générer et d’ouvrir l’URL correspondante sur The Movie Database (TMDB).

## Fonctionnalités principales

- L’extension est active uniquement si l’onglet courant correspond à une URL CaptainWatch.
- Un bouton d’action (icône dans la barre d’outils) permet de transformer l’URL CaptainWatch en URL TMDB et d’ouvrir cette dernière dans un nouvel onglet.
- L’icône change dynamiquement : verte si l’extension est utilisable, rouge sinon (icônes dans le dossier `icons`).
- Extraction automatique du type de contenu ("serie", "film", "artiste") et de l’identifiant numérique depuis l’URL CaptainWatch.
- Génération de l’URL TMDB correspondante :
  - `serie` → `tv`
  - `film` → `movie`
  - `artiste` → `person`
- Ouverture de l’URL TMDB dans un nouvel onglet.
- Structure modulaire : la logique métier est centralisée dans `utils.js` et utilisée dans `background.js`.
- Tests unitaires avec Jest sur la logique métier (`utils.test.js`).
- Fichier `.gitignore` pour la publication propre du projet.
- La popup est définitivement abandonnée.

## Exemple

- CaptainWatch : `https://www.captainwatch.com/serie/93405/squid-game`
- TMDB : `https://www.themoviedb.org/tv/93405`
- CaptainWatch : `https://www.captainwatch.com/film/27205/inception`
- TMDB : `https://www.themoviedb.org/movie/27205`
- CaptainWatch : `https://www.captainwatch.com/artiste/138/quentin-tarantino`
- TMDB : `https://www.themoviedb.org/person/138`

## Technologies utilisées

- Manifest V3 (standard Chrome Extensions)
- JavaScript (ES6+)
- Icônes verte et rouge pour l’état actif/inactif (dossier `icons`)
- Jest pour les tests unitaires

## Structure du projet

- `manifest.json` : Déclaration de l’extension
- `background.js` : Gestion de l’activation, de l’action du bouton et du changement d’icône
- `utils.js` : Fonctions métier (extraction, mapping, génération d’URL)
- `test/` : Dossier des tests unitaires Jest (ex : utils.test.js)
- `icons/` : Icônes verte et rouge (ex : icon48-green.png, icon48-red.png)
- `.gitignore` : Fichiers à exclure du dépôt
- `README.md` : Documentation et instructions

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
- [ ] Tester le fonctionnement sur différents cas d’URL
- [ ] Finaliser et maintenir la documentation (README)
- [ ] Adapter les icônes si besoin (tailles, couleurs)
- [ ] Nettoyer le projet (suppression des fichiers inutiles, popup abandonnée)

## Instructions d’installation

1. Cloner le dépôt
2. Charger l’extension en mode développeur dans Chrome
3. Tester sur des pages CaptainWatch
4. Vérifier le changement d’icône selon l’URL

---

> Ce README est mis à jour pour refléter l’état actuel du projet et les instructions détaillées.
