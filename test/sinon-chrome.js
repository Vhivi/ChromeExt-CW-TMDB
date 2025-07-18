function makeSpy() {
  function spy(...args) {
    spy.calls.push(args);
    if (typeof spy.mockImplementation === 'function') {
      return spy.mockImplementation(...args);
    }
  }
  spy.calls = [];
  spy.reset = function() {
    spy.calls = [];
    delete spy.mockImplementation;
  };
  return spy;
}

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
  flush: function() {
    chrome.tabs.create.reset();
    chrome.action.setIcon.reset();
    chrome.action.enable.reset();
    chrome.action.disable.reset();
  }
};

module.exports = chrome;
