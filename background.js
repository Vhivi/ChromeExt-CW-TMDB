// background.js
// Active le bouton uniquement sur CaptainWatch et gère la transformation d’URL



// Import des fonctions métier
importScripts('utils.js');

const iconsActive = {
  48: 'icons/icon48-green.png'
};
const iconsInactive = {
  48: 'icons/icon48-red.png'
};

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;
  const tmdbUrl = generateTMDBUrl(tab.url);
  if (!tmdbUrl) return;
  chrome.tabs.create({ url: tmdbUrl });
});

function updateIcon(tabId, isActive) {
  chrome.action.setIcon({
    tabId,
    path: isActive ? iconsActive : iconsInactive
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url) return;
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
  // Optionnel : mettre à jour l'icône de tous les onglets ouverts
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id) updateIcon(tab.id, false);
    }
  });
});
