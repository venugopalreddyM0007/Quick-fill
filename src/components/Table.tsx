import React from 'react';

type TableProps = {
  list: { key: string; value: string }[];
  handleEdit: (shortcutKey: string) => void;
  handleDelete: (shortcutKey: string) => void;
};

const Table = (props: TableProps) => {
  const { list, handleDelete, handleEdit } = props;

  return (
    <div className="mx-auto overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr>
            <th className="text-base">Shortcut Key</th>
            <th className="text-base">Value</th>
            <th className="text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 && (
            <tr>
              <td className="no-shortcuts" colSpan={3}>
                No shortcuts added yet
              </td>
            </tr>
          )}
          {list.map((shortcut, index) => (
            <tr key={index}>
              <td>
                <kbd className="kbd">{shortcut.key}</kbd>
              </td>
              <td className="w-full">{shortcut.value}</td>
              <td className="flex gap-2">
                <button
                  className="p-2 btn btn-ghost hover:bg-base-300/40"
                  onClick={() => handleEdit(shortcut.key)}
                >
                  Edit
                </button>
                <button
                  className="p-2 text-red-400 btn btn-ghost hover:bg-base-300/40"
                  onClick={() => handleDelete(shortcut.key)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
