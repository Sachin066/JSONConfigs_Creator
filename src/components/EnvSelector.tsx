import React from "react";

type EnvType = "qa" | "prod";

interface EnvSelectorProps {
  selectedEnv: EnvType;
  onChange: (env: EnvType) => void;
}

const EnvSelector: React.FC<EnvSelectorProps> = ({ selectedEnv, onChange }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-gray-700 font-medium">Environment:</label>
      <select
        value={selectedEnv}
        onChange={(e) => onChange(e.target.value as EnvType)}
        className="px-3 py-2 border rounded-md bg-white shadow-sm"
      >
        <option value="qa">QA</option>
        <option value="prod">PROD</option>
      </select>
    </div>
  );
};

export default EnvSelector;
