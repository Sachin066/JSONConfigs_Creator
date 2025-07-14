import React, { useEffect, useState } from "react";
import SectionSelector from "./components/SectionSelector";
import SectionForm from "./components/SectionForm";
import JSONPreview from "./components/JSONPreview";
import prodConfig from "./config/prod.json";
import qaConfig from "./config/qa.json";

type ConfigType = typeof prodConfig;

const popupEnums: Record<string, string[]> = {
  sender_id: ["Rezolv"],
  case_level: ["LOAN"],
  cc_case_level: ["LOAN"],
  apply_payment_logic: ["PID"],
  daily_calls_limit: ["20"],
  distance_check_meters: ["100", "200", "300"],
};

const popupKeys = Object.keys(popupEnums);

const App: React.FC = () => {
  const [env, setEnv] = useState<"prod" | "qa">("prod");
  const [baseConfig, setBaseConfig] = useState<ConfigType>(prodConfig);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Partial<ConfigType>>({});
  const [activePopupKey, setActivePopupKey] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");

  // Switch between prod and qa
  useEffect(() => {
    const config = env === "prod" ? prodConfig : qaConfig;
    setBaseConfig(config);
    setSelectedKeys([]);
    setFormValues({});
  }, [env]);

  const handleToggleSection = (key: string) => {
    const config = baseConfig[key];
    const isSelected = selectedKeys.includes(key);

    if (isSelected) {
      // ✅ Deselect both popup and regular keys
      setSelectedKeys((prev) => prev.filter((k) => k !== key));
      setFormValues((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
      return;
    }

    if (popupKeys.includes(key)) {
      setActivePopupKey(key);
      return;
    }

    // Normal key
    setSelectedKeys((prev) => [...prev, key]);
    setFormValues((prev) => ({
      ...prev,
      [key]: structuredClone(config),
    }));
  };

  const handleConfirmPopupValue = () => {
    if (!activePopupKey) return;

    const defaultVal = baseConfig[activePopupKey];
    const rawValue = customValue || selectedValue || defaultVal;

    const parsedValue =
      ["daily_calls_limit", "distance_check_meters"].includes(activePopupKey)
        ? Number(rawValue)
        : rawValue;

    setFormValues((prev) => ({
      ...prev,
      [activePopupKey]: parsedValue,
    }));

    if (!selectedKeys.includes(activePopupKey)) {
      setSelectedKeys((prev) => [...prev, activePopupKey]);
    }

    setActivePopupKey(null);
    setSelectedValue("");
    setCustomValue("");
  };

  const handleFieldChange = (section: string, path: string[], value: any) => {
    setFormValues((prev) => {
      const updated = { ...prev };
      let target = updated[section] ?? {};
      let ref = target;

      for (let i = 0; i < path.length - 1; i++) {
        if (!ref[path[i]]) ref[path[i]] = {};
        ref = ref[path[i]];
      }

      ref[path[path.length - 1]] = value;
      updated[section] = target;
      return updated;
    });
  };

  const allKeys = Object.keys(baseConfig);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🛠 JSON Config Builder</h1>

      {/* Environment Selector */}
      <div className="mb-4">
        <label className="mr-4 font-medium">Environment:</label>
        <select
          value={env}
          onChange={(e) => setEnv(e.target.value as "prod" | "qa")}
          className="border px-3 py-1 rounded"
        >
          <option value="prod">Production</option>
          <option value="qa">QA</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Section Selector + Forms */}
        <div>
          <SectionSelector
            allKeys={allKeys}
            selectedKeys={selectedKeys}
            onToggle={handleToggleSection}
          />

          {selectedKeys.map((key) => (
            <details
              key={key}
              open
              className="mb-4 border rounded bg-white shadow-sm"
            >
              <summary className="cursor-pointer px-4 py-2 bg-gray-100 text-sm font-semibold capitalize">
                {key.replace(/_/g, " ")}
              </summary>
              <div className="p-4">
                {!popupKeys.includes(key) && formValues[key] && (
                  <SectionForm
                    section={key}
                    data={formValues[key]}
                    onChange={(path, value) =>
                      handleFieldChange(key, path, value)
                    }
                  />
                )}
              </div>
            </details>
          ))}
        </div>

        {/* Right: JSON Preview */}
        <div className="max-h-screen overflow-y-auto">
          <JSONPreview baseConfig={formValues} />
        </div>
      </div>

      {/* Popup Modal for special keys */}
      {activePopupKey && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Set value for <span className="text-blue-600">{activePopupKey}</span>
            </h2>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Select enum value:
              </label>
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">-- Select --</option>
                {popupEnums[activePopupKey].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Or enter custom value:
              </label>
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setActivePopupKey(null);
                  setSelectedValue("");
                  setCustomValue("");
                }}
                className="px-3 py-1 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPopupValue}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
  