import React, { useEffect, useState } from "react";

interface Props {
  section: string;
  defaultValue: any;
  enums?: string[];
  onConfirm: (value: any) => void;
  onClose: () => void;
}

const PopupSectionHandler: React.FC<Props> = ({
  section,
  defaultValue,
  enums = [],
  onConfirm,
  onClose,
}) => {
  const [customValue, setCustomValue] = useState(defaultValue ?? "");

  const handleSubmit = () => {
    onConfirm(customValue || defaultValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4 capitalize">
          {section.replace(/_/g, " ")}
        </h2>
        {enums.length > 0 && (
          <select
            className="w-full border rounded px-2 py-1 mb-3"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          >
            <option value="">Select from options</option>
            {enums.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Enter custom value"
          className="w-full border rounded px-2 py-1 mb-4"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupSectionHandler;
