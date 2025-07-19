// Ce fichier fournit une implémentation mock minimale de l’API Chrome Extension pour Jest.

/**
 * Crée une fonction espion (spy) qui enregistre les appels et peut avoir une implémentation simulée (mock).
 * @returns {Function} La fonction spy avec des propriétés additionnelles.
 */
function makeSpy() {
  /**
   * Fonction espion qui enregistre les appels et exécute éventuellement une implémentation simulée.
   * @returns {*} Le résultat de l’implémentation simulée si elle est définie.
   */
  function spy(...args) {
    // Enregistre les arguments de chaque appel
    spy.calls.push(args);

    // Si une implémentation simulée (mock) est fournie, l’exécuter avec les arguments
    if (typeof spy.mockImplementation === 'function') {
      return spy.mockImplementation(...args);
    }
  }

  // Initialise le tableau pour enregistrer les arguments de chaque appel
  spy.calls = [];

  // Réinitialise les appels enregistrés et supprime l’implémentation simulée.
  spy.reset = function() {
    spy.calls = [];
    delete spy.mockImplementation;
  };

  return spy;
}

/**
 * Crée un objet qui peut être utilisé comme un événement Chrome Extension.
 * @returns {Object} L’objet qui a des méthodes pour ajouter des listeners,
 *                  déclencher l’événement et supprimer les listeners.
 */
function createEvent() {
  const listeners = [];
  return {
    addListener: function(fn) {
      listeners.push(fn);
    },
    dispatch: function(...args) {
      listeners.forEach((fn) => fn(...args));
    },
    clearListeners: function() {
      listeners.length = 0;
    },
    getListeners: function() {
      return listeners;
    }
  };
}

const chrome = {
  action: {
    onClicked: createEvent(),
    setIcon: makeSpy(),
    enable: makeSpy(),
    disable: makeSpy()
  },
  tabs: {
    create: makeSpy(),
    onUpdated: createEvent(),
    query: makeSpy()
  },
  runtime: {
    onInstalled: createEvent()
  },
  /**
   * Supprime les appels enregistrés de toutes les fonctions spy de l’objet chrome.
   * Utile pour réinitialiser l’état de l’objet chrome entre les tests.
   */
  flush: function() {
    chrome.tabs.create.reset();
    chrome.tabs.query.reset();
    chrome.action.setIcon.reset();
    chrome.action.enable.reset();
    chrome.action.disable.reset();
  }
};

module.exports = chrome;
