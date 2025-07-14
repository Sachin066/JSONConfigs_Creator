import React from "react";

interface Props {
  allKeys: string[];
  selectedKeys: string[];
  onToggle: (key: string) => void;
}

const SectionSelector: React.FC<Props> = ({
  allKeys,
  selectedKeys,
  onToggle,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Select Config Sections</h2>
      <div className="grid grid-cols-2 gap-2">
        {allKeys.map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedKeys.includes(key)}
              onChange={() => onToggle(key)}
            />
            {key}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SectionSelector;
