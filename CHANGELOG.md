# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.4](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v2.1.3...v2.1.4) (2025-07-19)

### Documentation

* Ajouter des commentaires explicatifs pour les fonctions makeSpy et createEvent dans sinon-chrome.js ([650a7da](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/650a7da7cfe06117ad96ec2c6e9c1a71e2624b9f))
* Ajouter des crochets autour de l'année dans le copyright du fichier LICENSE ([76b6708](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/76b6708ca847b93efc4a8bbfce227cf81af0f8b6))
* Ajouter l'auteur dans le fichier package.json ([04d3150](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/04d3150a25a887a3ccb8c54108cee05586fe5f49))
* Ajouter le fichier LICENSE et mettre à jour la licence dans package.json à MIT, et ajouter une section Licence dans README.md ([f08a632](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/f08a632f069e6fe6c609951f3ccee09e4796a3a8))
* Ajouter un commentaire explicatif sur l'implémentation mock de l'API Chrome Extension pour Jest ([bcde805](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/bcde80519e8e879c1e6c961b017c3eee3e6544a1))
* Ajouter une section sur le développement et les tests dans le README ([070b80e](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/070b80eef21bbcda476bbe858f2333b8cd8e538a))
* Améliorer les commentaires pour clarifier la logique de mise à jour des icônes et des états des boutons selon les URLs des onglets ([a126a60](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/a126a60df92ae659ef83ddb6296a7028edfa0948))
* Clarifier le commentaire sur l'injection du mock "chrome" pour les tests Jest ([6260add](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/6260add97432a991e112785de9673ad01b1ea7d6))
* Créer un fichier HISTORIQUE_DEVELOPPEMENT.md pour documenter les étapes de développement ([2b335cc](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/2b335ccb2c6747f957c55fdbf023817329a299c4))
* Mettre à jour la documentation pour clarifier la gestion des icônes et ajouter des tests unitaires automatisés ([2136286](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/2136286fbee9fc2711f3d6bb2903ce1243a33342))
* Renommer la section "TODO – Étapes de développement" en "Historique du développement" et ajouter un lien vers le fichier HISTORIQUE_DEVELOPPEMENT.md ([eb796a7](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/eb796a7683b11ea411f35d0399a15d9d53244289))

### Tests

* Ajouter des tests pour les listeners dans background.js et simuler l'environnement Chrome ([b5002935](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/b50293597044b88730bbd7a06ef88ff12c751ae6))

### Bug Fixes

* Ajouter des nouvelles lignes à la fin des fichiers pour respecter les conventions de style ([1ae7f54](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/1ae7f543d4de0ec36c4c9debeed54322dded5b08))
* Améliorer la gestion des mocks dans makeSpy en ajoutant des vérifications et en nettoyant les implémentations ([c333d40](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/c333d409fc37db7ff52ee6b0136e5abfee4a5a5e))
* Corriger la gestion des onglets sans id dans le test onInstalled ([9f00da9](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/9f00da92d49d08a2c940292767461eb7bcad9338))
* Mettre à jour les icônes pour les onglets dans le test onInstalled ([7ea5968](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/7ea5968ae02d3d4450e27a9339baa1900f59f47f))
* Réinitialiser les appels de chrome.tabs.query dans la fonction flush ([cfb7fce](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/cfb7fce77f81bf5f6c12cb53f6d219b0e05af25f))
* Rétablir la logique de vérification des URLs TMDB et CaptainWatch ([7ea68fc](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/7ea68fc49ad78714d7e47db6c432fcb922c5c858))
* Supprimer les appels à clearListeners dans la fonction flush de l'objet chrome ([3bacb9c](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/3bacb9ce50fb72c8f01d43634d492245e11df3a8))
* Supprimer les logs de débogage dans background.js ([c0ea49f](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/c0ea49f2a2c231b958898d0aad10a384ac4076a7))
* Supprimer les logs de débogage dans les tests de background.test.js ([e994a16](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/e994a161a71b6f707ea0179575109feaf19acae1))

## [2.1.3](https://github.com/Vhivi/ChromeExt-CW-TMDB/compare/v2.1.2...v2.1.3) (2025-07-14)

fix: Corriger la logique de détection des URLs TMDB et CaptainWatch dans les listeners ([ed58448](https://github.com/Vhivi/ChromeExt-CW-TMDB/commit/ed58448d9a23b4b2e5660888128d8c0f4135f32b))

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
