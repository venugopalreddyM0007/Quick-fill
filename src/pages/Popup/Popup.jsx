import React, { useEffect } from 'react';
import { getShortcutsFromStorage, setShortcutsToStorage } from '../Content';
import { ACTION, RESPONSE, sendMessage } from '../utils';

const Popup = () => {
  const [shortcuts, setShortcuts] = React.useState({});
  const [inputKey, setInputKey] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    getShortcutsFromStorage(setShortcuts);
  }, []);

  const handleAdd = () => {
    sendMessage(
      {
        action: ACTION.EDIT_OR_ADD_SHORTCUT,
        shortcutKey: inputKey,
        shortcutValue: inputValue,
      },
      (res) => {
        if (res.action === RESPONSE.SUCCESS) {
          const newShortcuts = { ...shortcuts, [inputKey]: inputValue };
          setShortcuts(newShortcuts);
          setShortcutsToStorage(newShortcuts);
          setInputKey('');
          setInputValue('');
        }
      }
    );
  };

  const isKeyDuplicate = inputKey in shortcuts;
  const isAddShortcutDisabled = inputKey.length === 0 || inputValue.length === 0 || isKeyDuplicate;

  return (
    <>
      <div className="flex justify-between border-b border-b-neutral">
        <h4>Add Shortcuts</h4>

        <a className="link link-hover" href="./shortcuts.html" target="_blank">
          View Shortcuts
        </a>
      </div>

      <section className="mt-2 space-y-2">
        <input
          value={inputKey}
          type="text"
          placeholder="shortcut key"
          className="w-full max-w-xs input-sm input input-bordered"
          onChange={(e) => setInputKey(e.target.value)}
        />
        <input
          value={inputValue}
          type="text"
          className="w-full max-w-xs input-sm input input-bordered"
          placeholder="shortcut value"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex items-center justify-between w-full">
          <span
            className="text-error"
            style={{ visibility: isKeyDuplicate ? 'visible' : 'hidden' }}
          >
            Duplicate key found!
          </span>
          <button
            className="btn btn-neutral btn-sm"
            onClick={handleAdd}
            disabled={isAddShortcutDisabled}
          >
            Add
          </button>
        </div>
      </section>
    </>
  );
};

export default Popup;
