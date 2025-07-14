import React, { useState } from "react";

interface Props {
  keyName: string;
  options: string[];
  defaultValue: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const EnumPopup: React.FC<Props> = ({ keyName, options, defaultValue, onClose, onSubmit }) => {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-sm shadow-md">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          {keyName.replace(/_/g, " ")} Configuration
        </h2>

        <label className="block mb-2">Select value:</label>
        <select
          className="border p-2 w-full rounded mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">-- Select from enum --</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label className="block mb-1">Or enter custom value:</label>
        <input
          className="border p-2 w-full rounded mb-4"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter custom value"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(value || defaultValue)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnumPopup;
