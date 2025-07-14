# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.2](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v2.1.1...v2.1.2) (2025-07-14)

* chore: Ajouter les permissions pour l'écriture du contenu dans le workflow de création de ZIP ([ce0feac](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/ce0feac220b913485c1ade3a3905400c703a08cb))

## [2.1.1](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v2.1.0...v2.1.1) (2025-07-14)

### Bug Fixes

* Corriger la syntaxe des variables d'environnement dans le workflow de création de ZIP ([2d334d8](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/2d334d8b2e62f00e881d43f42f251b2e4a515d42))

## [2.1.0](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v2.0.1...v2.1.0) (2025-07-13)

### Features

* Activer le déclenchement manuel du workflow de création de ZIP pour l'extension ([7d1029f](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/7d1029fa28007cf114c5380837697c0b99f9490d))
* Ajouter un workflow GitHub Actions pour créer et télécharger un ZIP de l'extension lors des publications ([b782a95](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/b782a95f544895cc2507f23b6fe2ada635394a0c))
* Ajouter une fonction de mappage générique pour la conversion des types ([05fc1b2](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/05fc1b2025611655877016e6473903a5916f7008))

### Bug Fixes

* Améliorer la lisibilité en ajoutant des accolades pour les vérifications d'URL ([7f9ad81](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/7f9ad8193e52ea74a3e6e609f41456e010627b00))
* Améliorer la lisibilité en ajoutant des accolades pour les vérifications de type et de correspondance ([f839307](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/f83930703a00658099763f83fe5281251ccb9664))
* Corriger l'extraction du tag de release en supprimant le préfixe 'v' correctement ([1b671c2](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/1b671c2616da7d685d9226d96d338c7bfacf477e))
* Corriger le téléchargement du ZIP en utilisant l'action appropriée pour les releases ([bc54b5c](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/bc54b5c78ee7562cc14f65957c4b796ecdd293ce))

## [2.0.1](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v2.0.0...v2.0.1) (2025-07-12)

### Features

* Ajouter une nouvelle icône 48x48 pour l'extension ([9fc81ff](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/9fc81ff4070d332c68c96f40a3608ad6bef03498))

### Bug Fixes

* Rajouter des permissions d'hôte pour TMDB dans le manifeste ([5ebc336](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/5ebc3366b867f336e6c04db6373a874ce65ef0a7))

## [2.0.0](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v1.0.0...v2.0.0) (2025-07-12)

### Features

* Ajouter de nouvelles icônes pour TMDB en vert et rouge ([b53c4cf](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/b53c4cfa187a6ed9f666d4e68c3ab0ab7ade6822))
* Ajouter des fonctions pour extraire et mapper les types entre TMDB et CaptainWatch ([662b31b](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/662b31b5f46fbef42ca914a5eb76e0d82e211595))
* Ajouter des tests pour l'extraction et le mapping des types entre CaptainWatch et TMDB ([d421774](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/d421774869e7958c47232020ff9688c06b6b3218))  
* Ajouter la gestion des icônes pour TMDB et CaptainWatch ([c947dbe](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/c947dbe1b5279a001cf576f9186c5faf445437f1))
* Ajouter une table des matières au README pour une meilleure navigation ([f900487](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/f900487896a243374511885aeba7281999556caf))
* Améliorer l'exportation des fonctions pour compatibilité avec Node.js et le navigateur ([f9cade5](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/f9cade5b4cb07162a594514fedfedf691b4a3f5f))  

### Bug Fixes

* Mettre à jour la version à 1.0.0 dans manifest.json ([607ee2f](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/607ee2f87921f8f06be8009dbea70c6266bf6112))
* Mettre à jour la version de 1.0.0-beta à 1.0.0 dans package.json ([adb7ae4](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/adb7ae4fecd10b641b7f1e79e3d43ad80e52ac33))
* Supprimer l'icône icon48.png obsolète ([3ce1e4c](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/3ce1e4ca1c1429f5a7ed5b754b3f96912132d662))
* Supprimer les commentaires obsolètes dans utils.js ([6f8a385](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/6f8a3857973233f8298eee02a9ce8a7f8032847b))

## 1.0.0 (2025-07-12)

### Features

* Ajouter la compatibilité avec les environnements navigateur pour les fonctions utilitaires ([16dfad1](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/16dfad17470c400adfd3d097d1e74020f4db9f6d))
* Mettre à jour la liste des tâches dans le README pour refléter les éléments complétés ([f41643c](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/f41643ce7b0618cbef7910f0581ae88327b56adb))

### Bug Fixes

* Ajouter une vérification de type pour l'URL dans la fonction extractTypeAndId ([8ef5abd](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/8ef5abdbc76f0e04c3f3cc513869d18670779875))
