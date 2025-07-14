import React, { useEffect, useState } from "react";
import SectionSelector from "./components/SectionSelector";
import SectionForm from "./components/SectionForm";
import JSONPreview from "./components/JSONPreview";
import ModalInput from "./components/ModalInput";
import prodConfig from "./config/prod.json";
import qaConfig from "./config/qa.json";

type ConfigType = typeof prodConfig;

const specialKeysWithEnums: Record<string, (string | number)[]> = {
  sender_id: ["Rezolv"],
  case_level: ["LOAN"],
  cc_case_level: ["LOAN"],
  apply_payment_logic: ["PID"],
  distance_check_meters: [100],
  daily_calls_limit: [20],
};

const App: React.FC = () => {
  const [env, setEnv] = useState<"prod" | "qa">("prod");
  const [baseConfig, setBaseConfig] = useState<ConfigType>(prodConfig);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Partial<ConfigType>>({});
  const [modalSection, setModalSection] = useState<string | null>(null);

  // Switch env
  useEffect(() => {
    const config = env === "prod" ? prodConfig : qaConfig;
    setBaseConfig(config);
    setSelectedKeys([]);
    setFormValues({});
  }, [env]);

  // Handle select/unselect
  const handleToggleSection = (key: string) => {
    const isSpecial = Object.keys(specialKeysWithEnums).includes(key);

    if (selectedKeys.includes(key)) {
      setSelectedKeys((prev) => prev.filter((k) => k !== key));
      setFormValues((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } else {
      if (isSpecial) {
        setModalSection(key);
      } else {
        setFormValues((prev) => ({
          ...prev,
          [key]: structuredClone(baseConfig[key]),
        }));
        setSelectedKeys((prev) => [...prev, key]);
      }
    }
  };

  // When modal saves value
  const handleModalSave = (value: string | number) => {
    if (!modalSection) return;
    setFormValues((prev) => ({
      ...prev,
      [modalSection]: value,
    }));
    setSelectedKeys((prev) => [...prev, modalSection]);
    setModalSection(null);
  };

  const handleModalCancel = () => {
    setModalSection(null);
  };

  const handleFieldChange = (
    section: string,
    path: string[],
    value: any
  ) => {
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

      {/* Environment Switch */}
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
        {/* LEFT: Select + Form */}
        <div>
          <SectionSelector
            allKeys={allKeys}
            selectedKeys={selectedKeys}
            onToggle={handleToggleSection}
          />

          {selectedKeys.map((key) =>
            typeof formValues[key] === "object" ? (
              <details key={key} open className="mb-4 border rounded bg-white shadow-sm">
                <summary className="cursor-pointer px-4 py-2 bg-gray-100 text-sm font-semibold capitalize">
                  {key.replace(/_/g, " ")}
                </summary>
                <div className="p-4">
                  <SectionForm
                    section={key}
                    data={formValues[key]}
                    onChange={(path, value) => handleFieldChange(key, path, value)}
                  />
                </div>
              </details>
            ) : null
          )}
        </div>

        {/* RIGHT: JSON Preview */}
        <div className="max-h-screen overflow-y-auto">
          <JSONPreview baseConfig={formValues} />
        </div>
      </div>

      {/* Modal Popup */}
      {modalSection && (
        <ModalInput
          sectionKey={modalSection}
          defaultValue={baseConfig[modalSection]}
          enumOptions={specialKeysWithEnums[modalSection]}
          onSave={handleModalSave}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

export default App;
