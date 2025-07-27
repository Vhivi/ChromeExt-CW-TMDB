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
import { generateTMDBUrl, generateCaptainWatchUrl } from './utils.js';

// Permet aux tests Jest d'injecter un mock "chrome" ; ignoré en production
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
      chrome.tabs.create({ url: tmdbUrl });
      return;
    }
    // Si TMDB → CaptainWatch
    const cwUrl = generateCaptainWatchUrl(tab.url);
    if (cwUrl) {
      chrome.tabs.create({ url: cwUrl });
      return;
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Ignore les onglets sans URL
  if (!tab.url) {
    return;
  }
  /**
   * L’URL TMDB ou CaptainWatch générée pour l’onglet courant.
   * @type {string|null}
   */
  const tmdbUrl = generateTMDBUrl(tab.url);
  const cwUrl = generateCaptainWatchUrl(tab.url);
  // Si l'URL générée est pour CaptainWatch, alors c'est une page TMDB
  const isTMDB = !!cwUrl;
  // Si l'URL générée est pour TMDB, alors c'est une page CaptainWatch
  const isCaptainWatch = !!tmdbUrl;
  /**
   * Met à jour l'icône et l'état du bouton selon l'URL de l'onglet.
   * @param {number} tabId Identifiant de l'onglet
   * @param {boolean} isActive True si l'onglet est actif, false sinon
   * @param {boolean} isTMDB True si l’onglet est une page TMDB, false sinon
   */
  if (isCaptainWatch || isTMDB) {
    chrome.action.enable(tabId);
    updateIcon(tabId, true, isTMDB);
  } else {
    chrome.action.disable(tabId);
    updateIcon(tabId, false, isTMDB);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  // Désactive le bouton pour tous les onglets
  chrome.action.disable();
  // Met à jour l'icône pour tous les onglets
  // Ignore les onglets sans ID
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id) {
        // Si l'onglet a une URL, on tente de générer l'URL CaptainWatch
        const cwUrl = tab.url && generateCaptainWatchUrl(tab.url);
        // Si l'URL générée est pour CaptainWatch, alors c'est une page TMDB
        // Sinon, c'est une page CaptainWatch
        const isTMDB = !!cwUrl;
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
