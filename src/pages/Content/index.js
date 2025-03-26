const localStorageIdentifier = 'quickfill-shortcuts';
chrome.storage.local.get([localStorageIdentifier], function (e) {
  if (e[localStorageIdentifier]) return;
  chrome.storage.local.set({ [localStorageIdentifier]: [] });
});

function isElementEditableOrReadOnly(element) {
  if (!element.readOnly) return true;
  if (element instanceof HTMLInputElement) return true;
  if (element instanceof HTMLTextAreaElement) return true;
  return false;
}

const getEditableElement = (target) => {
  while (target && target !== document) {
    if (isElementEditableOrReadOnly(target)) return target;
    target = target.parentElement;
  }
  return target;
};

document.addEventListener(
  'focusin',
  (e) => {
    const editableElement = getEditableElement(e.target);
    if (!editableElement || editableElement === document) return;
    addEventListenerOnce(editableElement, 'input', setInputValue);
  },
  { bubbles: true }
);

let updatedValue;
const setInputValue = (e) => {
  if (e.target.value === updatedValue) return;

  chrome.storage.local.get([localStorageIdentifier], function (data) {
    updatedValue = getUpdatedValue(e.target.value, data[localStorageIdentifier]);
    if (e.target.value === updatedValue) return;
    e.preventDefault();

    const event = new Event('input', { bubbles: true });
    e.target.value = updatedValue;
    e.target.dispatchEvent(event);
  });
};

const getUpdatedValue = (inputValue = '', mappings = {}) => {
  const [key] = inputValue.match(new RegExp(/\.\w+$/g)) ?? [null];
  if (!key) return inputValue;
  const inputKey = key.slice(1);
  if (inputKey in mappings) return mappings[inputKey];
  return inputValue;
};

const addEventListenerOnce = (element, eventName, listener) => {
  if (!element.__eventListeners) {
    element.__eventListeners = {};
  }
  if (!element.__eventListeners[eventName]) {
    element.__eventListeners[eventName] = [];
  }
  if (!element.__eventListeners[eventName].includes(listener)) {
    element.addEventListener(eventName, listener);
    element.__eventListeners[eventName].push(listener);
  }
};

export const getShortcutsFromStorage = (callback) => {
  chrome.storage.local.get([localStorageIdentifier], function (data) {
    const shortcuts = data[localStorageIdentifier] || {};
    callback(shortcuts);
  });
};

export const setShortcutsToStorage = (shortcuts) => {
  chrome.storage.local.set({ [localStorageIdentifier]: shortcuts });
};
