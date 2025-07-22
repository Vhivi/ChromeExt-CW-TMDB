
# Extension Chrome : CaptainWatch ↔ TMDB

## Objectif

Permettre la conversion rapide et fiable d’URLs entre CaptainWatch et The Movie Database (TMDB) directement depuis la barre d’outils du navigateur, sans popup ni options, pour les contenus séries, films et artistes/personnes.

## Fonctionnalités principales

- Conversion bidirectionnelle : CaptainWatch → TMDB et TMDB → CaptainWatch
- Activation contextuelle : l’extension n’est active (icône verte) que sur une page CaptainWatch ou TMDB valide, sinon l’icône est rouge (inactive)
- Extraction automatique du type de contenu (`serie`/`tv`, `film`/`movie`, `artiste`/`person`) et de l’identifiant numérique
- Génération de l’URL correspondante :
  - CaptainWatch → TMDB : `serie` → `tv`, `film` → `movie`, `artiste` → `person`
  - TMDB → CaptainWatch : `tv` → `serie`, `movie` → `film`, `person` → `artiste` (⚠️ `/person` → `/artiste/-`)
- Ouverture de l’URL générée dans un nouvel onglet
- Icônes contextuelles : verte/rouge pour CaptainWatch et TMDB, selon l’état actif/inactif
- Aucun popup, aucune option, aucun stockage utilisateur
- Tests automatisés (Jest) sur la logique métier et le background

## Sécurité et portée

- L’extension ne fonctionne que sur les URLs :
  - CaptainWatch : `https://www.captainwatch.com/serie/*`, `/film/*`, `/artiste/*`
  - TMDB : `https://www.themoviedb.org/tv/*`, `/movie/*`, `/person/*`
- Aucun tracking, aucune collecte de données, aucun stockage local

## Exemples de conversion

- CaptainWatch → TMDB :
  - `https://www.captainwatch.com/serie/93405/squid-game` → `https://www.themoviedb.org/tv/93405`
  - `https://www.captainwatch.com/film/27205/inception` → `https://www.themoviedb.org/movie/27205`
  - `https://www.captainwatch.com/artiste/138/quentin-tarantino` → `https://www.themoviedb.org/person/138`
- TMDB → CaptainWatch :
  - `https://www.themoviedb.org/tv/93405` → `https://www.captainwatch.com/serie/93405/`
  - `https://www.themoviedb.org/movie/27205` → `https://www.captainwatch.com/film/27205/`
  - `https://www.themoviedb.org/person/138` → `https://www.captainwatch.com/artiste/138/-`

## Installation (mode développeur)

1. Téléchargez la dernière release `.zip` depuis la page [Releases](https://github.com/Vhivi/ChromeExt-CW-TMDB/releases/latest).
2. Décompressez l’archive.
3. Ouvrez la page des extensions de votre navigateur :  
   - Chrome : `chrome://extensions/`  
   - Brave : `brave://extensions/`  
   - Edge : `edge://extensions/`
4. Activez le « Mode développeur » (généralement en haut à droite).

   ![Mode développeur](screenshots/chrome-dev-mode.jpg)
5. Cliquez sur « Charger l’extension non empaquetée » et sélectionnez le dossier décompressé.

   ![Charger l’extension](screenshots/chrome-load.jpg)
6. L’extension apparaît dans la liste avec son icône. Assurez-vous qu’elle est activée.

   ![Extension activée](screenshots/chrome-activate.jpg)
7. Épinglez l’icône de l’extension dans la barre d’outils pour un accès rapide.

   ![Barre d’outils](screenshots/chrome-pin.jpg)
8. Profitez de l’extension ! En dehors des pages CaptainWatch et TMDB, l’icône sera rouge et l'extension inactive.

   ![Extension inactive](screenshots/chrome-enjoy.jpg)
9. Sur une page valide, elle deviendra verte et cliquable.

   ![Extension active](screenshots/chrome-click.jpg)

## Utilisation

- Naviguez sur une page CaptainWatch ou TMDB valide
- L’icône devient verte : cliquez pour ouvrir l’URL convertie dans un nouvel onglet
- Hors de ces sites, l’icône reste rouge et l’extension est inactive

## Développement & tests

- Node.js 18+ recommandé
- Installer les dépendances :  
  `npm install`
- Lancer les tests automatisés (Jest) :  
  `npm test`
- La logique métier est dans `utils.js`, la gestion d’icône et d’activation dans `background.js`
- Les tests sont dans le dossier `test/`

## Structure du projet

- `manifest.json` : Déclaration de l’extension (permissions, scripts, icônes)
- `background.js` : Détection d’URL, gestion d’icône, activation, ouverture d’onglet
- `utils.js` : Fonctions de conversion et mapping
- `icons/` : Icônes verte/rouge pour CaptainWatch et TMDB
- `test/` : Tests Jest (logique métier et background)
- `README.md` : Documentation
- `screenshots/` : Captures d’écran

## FAQ & points d’attention

- Pas de popup, pas d’options, pas de stockage utilisateur
- Pour les artistes, l’URL CaptainWatch doit se terminer par `/-` (bug connu)
- Toute évolution doit être documentée dans le README et testée
- Voir `HISTORIQUE_DEVELOPPEMENT.md` pour le détail des changements

## Licence

MIT – Voir le fichier [LICENSE](LICENSE).
