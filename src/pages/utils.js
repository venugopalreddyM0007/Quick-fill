export const QUICK_FLL_PORT_NAME = 'quick-fill-background';

export const ACTION = {
  SEND_OTP: 'SEND_OTP',
  VERIFY_OTP: 'VERIFY_OTP',

  GET_SHORTCUTS: 'GET_SHORTCUTS',
  EDIT_OR_ADD_SHORTCUT: 'EDIT_OR_ADD_SHORTCUT',
  REMOVE_SHORTCUT: 'REMOVE_SHORTCUT',
};

export const RESPONSE = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const sendMessage = (message = {}, callback = console.log) => {
  const targetOrigin = chrome.runtime.id;
  const port = chrome.runtime.connect({ name: QUICK_FLL_PORT_NAME });

  port.onMessage.addListener(callback);
  port.postMessage(message, targetOrigin);
};
