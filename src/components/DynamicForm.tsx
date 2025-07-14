import React, { useEffect, useState } from "react";

interface Props {
  section: string;
  defaultData: any;
  data?: any;
  onChange: (data: any) => void;
}

const DynamicForm: React.FC<Props> = ({ section, defaultData, data = {}, onChange }) => {
  const [localData, setLocalData] = useState<any>(data);

  useEffect(() => {
    setLocalData(data || {});
  }, [data]);

  const handleChange = (key: string, value: any) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  if (section === "attributes" && Array.isArray(defaultData)) {
    return (
      <div className="space-y-4">
        {defaultData.map((attr: any) => {
          const val = localData?.[attr.name] ?? "";
          return (
            <div key={attr.name}>
              <label className="block text-sm font-medium mb-1">{attr.label}</label>

              {attr.type === "enum" ? (
                <select
                  value={val}
                  onChange={(e) => handleChange(attr.name, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select...</option>
                  {attr.options.map((opt: string) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : attr.type === "boolean" ? (
                <input
                  type="checkbox"
                  checked={!!val}
                  onChange={(e) => handleChange(attr.name, e.target.checked)}
                />
              ) : (
                <input
                  type={attr.type === "date" ? "date" : "text"}
                  value={val}
                  onChange={(e) => handleChange(attr.name, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (defaultData && typeof defaultData === "object" && !Array.isArray(defaultData)) {
    return (
      <div className="space-y-4">
        {Object.keys(defaultData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{key}</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={localData?.[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }

  return <p className="text-sm text-gray-500">Unsupported section format</p>;
};

export default DynamicForm;
