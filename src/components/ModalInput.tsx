import React, { useState } from "react";

interface Props {
  sectionKey: string;
  defaultValue: string | number;
  enumOptions: (string | number)[];
  onSave: (value: string | number) => void;
  onCancel: () => void;
}

const ModalInput: React.FC<Props> = ({
  sectionKey,
  defaultValue,
  enumOptions,
  onSave,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState<string | number>("");

  const handleSave = () => {
    if (inputValue === "") {
      onSave(defaultValue); // Use default if user didn’t enter anything
    } else {
      onSave(inputValue);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          {sectionKey.replace(/_/g, " ")}
        </h2>

        {/* Dropdown enum options */}
        <label className="block mb-2 text-sm font-medium">
          Choose from options:
        </label>
        <select
          className="w-full border rounded px-3 py-2 mb-3"
          value={typeof inputValue === "string" ? inputValue : ""}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option value="">-- Select an option --</option>
          {enumOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Or enter custom input */}
        <label className="block mb-2 text-sm font-medium">
          Or enter custom value:
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded border text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInput;
