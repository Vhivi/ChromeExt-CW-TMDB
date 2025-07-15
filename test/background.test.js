const utils = require('../utils');

// Injection globale pour simuler l'environnement extension
global.chrome = require('./sinon-chrome');

// Mock importScripts pour simuler l'injection des fonctions utilitaires
global.importScripts = function(path) {
  if (path === 'utils.js') {
    global.generateTMDBUrl = utils.generateTMDBUrl;
    global.generateCaptainWatchUrl = utils.generateCaptainWatchUrl;
    // Ajoute d'autres exports si nécessaire
  }
};

// Import du script à tester (injecte les listeners)
require('../background.js');

describe('background.js', () => {
  beforeEach(() => {
    chrome.flush();
  });

  describe('action.onClicked', () => {
    it('ouvre l’URL TMDB si CaptainWatch détecté', () => {
      const tab = { url: 'https://www.captainwatch.com/film/27205' };
      // Vérifie la présence du listener
      expect(chrome.action.onClicked.getListeners().length).toBeGreaterThan(0);
      chrome.action.onClicked.dispatch(tab);
      // Log pour debug
      console.log('tabs.create.calls:', chrome.tabs.create.calls);
      expect(chrome.tabs.create.calls.length).toBeGreaterThan(0);
      expect(chrome.tabs.create.calls[0][0]).toEqual({ url: 'https://www.themoviedb.org/movie/27205' });
    });
    it('ouvre l’URL CaptainWatch si TMDB détecté', () => {
      const tab = { url: 'https://www.themoviedb.org/tv/93405' };
      expect(chrome.action.onClicked.getListeners().length).toBeGreaterThan(0);
      chrome.action.onClicked.dispatch(tab);
      console.log('tabs.create.calls:', chrome.tabs.create.calls);
      expect(chrome.tabs.create.calls.length).toBeGreaterThan(0);
      expect(chrome.tabs.create.calls[0][0]).toEqual({ url: 'https://www.captainwatch.com/serie/93405/' });
    });
    it('ne fait rien si URL non reconnue', () => {
      const tab = { url: 'https://example.com' };
      expect(chrome.action.onClicked.getListeners().length).toBeGreaterThan(0);
      chrome.action.onClicked.dispatch(tab);
      console.log('tabs.create.calls:', chrome.tabs.create.calls);
      expect(chrome.tabs.create.calls.length).toBe(0);
    });
  });

  describe('tabs.onUpdated', () => {
    it('active et met l’icône CW sur page CaptainWatch', () => {
      const tabId = 1;
      const tab = { url: 'https://www.captainwatch.com/film/27205' };
      expect(chrome.tabs.onUpdated.getListeners().length).toBeGreaterThan(0);
      chrome.tabs.onUpdated.dispatch(tabId, {}, tab);
      console.log('action.enable.calls:', chrome.action.enable.calls);
      console.log('action.setIcon.calls:', chrome.action.setIcon.calls);
      expect(chrome.action.enable.calls.length).toBeGreaterThan(0);
      expect(chrome.action.enable.calls[0][0]).toBe(tabId);
      expect(chrome.action.setIcon.calls.length).toBeGreaterThan(0);
      expect(chrome.action.setIcon.calls[0][0]).toEqual({ tabId, path: { 48: 'icons/icon48-green.png' } });
    });
    it('active et met l’icône TMDB sur page TMDB', () => {
      const tabId = 2;
      const tab = { url: 'https://www.themoviedb.org/movie/27205' };
      expect(chrome.tabs.onUpdated.getListeners().length).toBeGreaterThan(0);
      chrome.tabs.onUpdated.dispatch(tabId, {}, tab);
      console.log('action.enable.calls:', chrome.action.enable.calls);
      console.log('action.setIcon.calls:', chrome.action.setIcon.calls);
      expect(chrome.action.enable.calls.length).toBeGreaterThan(0);
      expect(chrome.action.enable.calls[0][0]).toBe(tabId);
      expect(chrome.action.setIcon.calls.length).toBeGreaterThan(0);
      expect(chrome.action.setIcon.calls[0][0]).toEqual({ tabId, path: { 48: 'icons/icon48-tmdb-green.png' } });
    });
    it('désactive et met l’icône inactive sur page non reconnue', () => {
      const tabId = 3;
      const tab = { url: 'https://example.com' };
      expect(chrome.tabs.onUpdated.getListeners().length).toBeGreaterThan(0);
      chrome.tabs.onUpdated.dispatch(tabId, {}, tab);
      console.log('action.disable.calls:', chrome.action.disable.calls);
      console.log('action.setIcon.calls:', chrome.action.setIcon.calls);
      expect(chrome.action.disable.calls.length).toBeGreaterThan(0);
      expect(chrome.action.disable.calls[0][0]).toBe(tabId);
      expect(chrome.action.setIcon.calls.length).toBeGreaterThan(0);
      expect(chrome.action.setIcon.calls[0][0]).toEqual({ tabId, path: { 48: 'icons/icon48-red.png' } });
    });
  });

  describe('runtime.onInstalled', () => {
    it('désactive le bouton et met l’icône sur tous les onglets', () => {
      // Simule plusieurs onglets
      const tabs = [
        { id: 1, url: 'https://www.captainwatch.com/film/27205' },
        { id: 2, url: 'https://www.themoviedb.org/movie/27205' },
        { id: 3, url: 'https://example.com' }
      ];
      chrome.tabs.query.mockImplementation = (query, cb) => cb(tabs);
      expect(chrome.runtime.onInstalled.getListeners().length).toBeGreaterThan(0);
      chrome.runtime.onInstalled.dispatch();
      console.log('action.disable.calls:', chrome.action.disable.calls);
      console.log('action.setIcon.calls:', chrome.action.setIcon.calls);
      expect(chrome.action.disable.calls.length).toBeGreaterThan(0);
      expect(chrome.action.setIcon.calls.length).toBeGreaterThan(2);
      expect(chrome.action.setIcon.calls[0][0]).toEqual({ tabId: 1, path: { 48: 'icons/icon48-green.png' } });
      expect(chrome.action.setIcon.calls[1][0]).toEqual({ tabId: 2, path: { 48: 'icons/icon48-tmdb-green.png' } });
      expect(chrome.action.setIcon.calls[2][0]).toEqual({ tabId: 3, path: { 48: 'icons/icon48-red.png' } });
    });
  });
});
