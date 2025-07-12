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

const iconsActive = {
  48: 'icons/icon48-green.png'
};
const iconsInactive = {
  48: 'icons/icon48-red.png'
};

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;
  /**
   * L’URL TMDB (The Movie Database) générée pour l’onglet courant.
   * @type {string}
   */
  const tmdbUrl = generateTMDBUrl(tab.url);
  if (!tmdbUrl) return;
  chrome.tabs.create({ url: tmdbUrl });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url) return;
  /**
   * Contient le type et l’ID extraits de l’URL de l’onglet donné.
   * @type {{ type: string, id: string }}
   */
  const data = extractTypeAndId(tab.url);
  if (data) {
    chrome.action.enable(tabId);
    updateIcon(tabId, true);
  } else {
    chrome.action.disable(tabId);
    updateIcon(tabId, false);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id) updateIcon(tab.id, false);
    }
  });
});

/**
 * Met à jour l'icône du bouton pour l'onglet indiqué
 * @param {number} tabId Identifiant de l'onglet
 * @param {boolean} isActive True si l'onglet est actif, false sinon
 */
function updateIcon(tabId, isActive) {
  chrome.action.setIcon({
    tabId,
    path: isActive ? iconsActive : iconsInactive
  });
}

