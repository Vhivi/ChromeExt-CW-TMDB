/**
 * Gère la logique de fond pour l’extension Chrome :
 * - Active le bouton uniquement sur les pages CaptainWatch.
 * - Transforme les URLs CaptainWatch en URLs TMDB et les ouvre dans un nouvel onglet.
 * - Met à jour l’icône de l’extension selon l’URL de l’onglet courant.
 *
 * Dépendances :
 * - utils.js : doit exporter les fonctions `generateTMDBUrl(url)` et `extractTypeAndId(url)`.
 *
 * Chemins des icônes :
 * - Active : icons/icon48-green.png
 * - Inactive : icons/icon48-red.png
 *
 * Listeners :
 * - chrome.action.onClicked : Génère et ouvre l’URL TMDB pour l’onglet courant.
 * - chrome.tabs.onUpdated : Active/désactive le bouton et met à jour l’icône selon l’URL de l’onglet.
 * - chrome.runtime.onInstalled : Désactive le bouton et définit l’icône pour tous les onglets à l’installation.
 *
 * @file background.js
 */
importScripts('utils.js');

// Pour forcer  l'utilisation du mock global
const chrome = global.chrome || chrome;

// Centralisation des chemins d’icônes
const ICONS = {
  captainwatch: {
    active: { 48: 'icons/icon48-green.png' },
    inactive: { 48: 'icons/icon48-red.png' }
  },
  tmdb: {
    active: { 48: 'icons/icon48-tmdb-green.png' },
    inactive: { 48: 'icons/icon48-tmdb-red.png' }
  }
};

console.log('[DEBUG] Enregistrement listener action.onClicked');
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) {
    return;
  }
  /**
   * L’URL TMDB (The Movie Database) générée pour l’onglet courant.
   * @type {string}
   */
    // Si CaptainWatch → TMDB
    const tmdbUrl = generateTMDBUrl(tab.url);
    if (tmdbUrl) {
      console.log('Opening TMDB URL:', tmdbUrl); // Log pour débogage
      chrome.tabs.create({ url: tmdbUrl });
      return;
    }
    // Si TMDB → CaptainWatch
    const cwUrl = generateCaptainWatchUrl(tab.url);
    if (cwUrl) {
      console.log('Opening CaptainWatch URL:', cwUrl); // Log pour débogage
      chrome.tabs.create({ url: cwUrl });
      return;
    }
});

console.log('[DEBUG] Enregistrement listener tabs.onUpdated');
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url) {
    return;
  }
  const tmdbUrl = generateTMDBUrl(tab.url);
  const cwUrl = generateCaptainWatchUrl(tab.url);
  const isTMDB = !!tmdbUrl;
  const isCaptainWatch = !!cwUrl;
  if (isCaptainWatch || isTMDB) {
    chrome.action.enable(tabId);
    updateIcon(tabId, true, isTMDB);
  } else {
    chrome.action.disable(tabId);
    updateIcon(tabId, false, isTMDB);
  }
});

console.log('[DEBUG] Enregistrement listener runtime.onInstalled');
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id) {
        const tmdbUrl = tab.url && generateTMDBUrl(tab.url);
        const isTMDB = !!tmdbUrl;
        updateIcon(tab.id, false, isTMDB);
      }
    }
  });
});

/**
 * Met à jour l'icône du bouton pour l'onglet indiqué
 * @param {number} tabId Identifiant de l'onglet
 * @param {boolean} isActive True si l'onglet est actif, false sinon
 * @param {boolean} isTMDB True si l’onglet est une page TMDB, false sinon
 */
function updateIcon(tabId, isActive, isTMDB) {
  const source = isTMDB ? 'tmdb' : 'captainwatch';
  const state = isActive ? 'active' : 'inactive';
  chrome.action.setIcon({
    tabId,
    path: ICONS[source][state]
  });
}

