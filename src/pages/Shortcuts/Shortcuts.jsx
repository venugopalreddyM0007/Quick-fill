import React, { useEffect, useMemo, useRef, useState } from 'react';
import Table from '../../components/Table';
import { getShortcutsFromStorage, setShortcutsToStorage } from '../Content';
import { ACTION, RESPONSE, sendMessage } from '../utils';

const Shortcuts = () => {
  const [shortcuts, setShortcuts] = useState({});
  const [inputValue, setInputValue] = useState('');
  const editingShortcutKey = useRef(null);

  useEffect(() => {
    getShortcutsFromStorage(setShortcuts);
  }, []);

  const handleDelete = (shortcutKey) => {
    sendMessage({ action: ACTION.DELETE_SHORTCUT, shortcutKey }, (res) => {
      if (res.action === RESPONSE.SUCCESS) {
        const newShortcuts = { ...shortcuts };
        delete newShortcuts[shortcutKey];
        setShortcuts(newShortcuts);
        setShortcutsToStorage(newShortcuts);
      }
    });
  };

  const openEditModal = (shortcutKey) => {
    editingShortcutKey.current = shortcutKey;
    setInputValue(shortcuts[shortcutKey] || '');
    document.getElementById('edit_modal').showModal();
  };

  const handleEditShortcut = () => {
    if (!editingShortcutKey.current) return;
    sendMessage(
      {
        action: ACTION.EDIT_OR_ADD_SHORTCUT,
        shortcutKey: editingShortcutKey.current,
        shortcutValue: inputValue,
      },
      (res) => {
        if (res.action === RESPONSE.SUCCESS) {
          const newShortcuts = { ...shortcuts };
          newShortcuts[editingShortcutKey.current] = inputValue;
          setShortcuts(newShortcuts);
          setShortcutsToStorage(newShortcuts);
          document.getElementById('edit_modal').close();
        }
      }
    );
  };

  const shortcutAsArray = useMemo(() => {
    const shortcutKeys = Object.keys(shortcuts);
    return shortcutKeys.map((key) => ({ key, value: shortcuts[key] }));
  }, [shortcuts]);

  return (
    <div className="container py-6 mx-auto">
      <h1 className="px-4 text-4xl font-semibold text-center">Your Shortcuts</h1>
      <Table list={shortcutAsArray} handleDelete={handleDelete} handleEdit={openEditModal} />

      <dialog id="edit_modal" className="modal">
        <div className="flex flex-col gap-4 modal-box">
          <input
            type="text"
            disabled
            value={editingShortcutKey.current}
            className="w-full input input-bordered"
          />
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-full input input-bordered"
          />
          <div className="flex justify-end gap-4">
            <form method="dialog">
              <button className="btn btn-default">Cancel</button>
            </form>
            <button
              onClick={handleEditShortcut}
              disabled={editingShortcutKey.current?.length === 0 || inputValue.length === 0}
              className="btn btn-neutral"
            >
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Shortcuts;
