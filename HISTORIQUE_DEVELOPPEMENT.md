# Historique de développement

Les notes complètes des étapes de développement initiales sont conservées ici pour référence.

- [x] Initialiser le projet et créer le manifest.json
- [x] Détecter l’URL CaptainWatch et activer le bouton uniquement sur les pages valides
- [x] Extraire le type de contenu et l’identifiant depuis l’URL
- [x] Générer l’URL TMDB correspondante (mapping type)
- [x] Ouvrir la nouvelle URL TMDB dans un onglet
- [x] Gérer le changement d’icône (verte/rouge) selon l’état (dossier `icons`)
- [x] Centraliser la logique métier dans `utils.js` et l’utiliser dans `background.js`
- [x] Ajouter des tests unitaires avec Jest (`utils.test.js`)
- [x] Ajouter des tests automatisés sur le background (`background.test.js`)
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
- [x] Correction de la logique d’icône inactive à l’installation (mapping exact CaptainWatch/TMDB)
- [x] Couverture de test complète sur la logique d’icône (état actif/inactif, mapping, cas limites)
