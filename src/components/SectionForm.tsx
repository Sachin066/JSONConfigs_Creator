import React from "react";

interface Props {
  section: string;
  data: any;
  onChange: (path: string[], value: any) => void;
}

const SectionForm: React.FC<Props> = ({ section, data, onChange }) => {
  if (!data) return null;

  const excludedFlatKeys = [
    "sender_id",
    "case_level",
    "cc_case_level",
    "apply_payment_logic",
    "distance_check_meters",
    "daily_calls_limit"
  ];

  const renderField = (key: string, value: any, path: string[]): React.ReactNode => {
    const fullPath = [...path, key];
    const label = (
      <label className="block text-sm font-medium text-gray-700 capitalize">
        {key.replace(/_/g, " ")}
      </label>
    );

    // ❌ Skip keys handled via popup
    if (typeof value === "string" && excludedFlatKeys.includes(key)) {
      return null;
    }

    // ✅ Primitive
    if (["string", "number", "boolean"].includes(typeof value)) {
      return (
        <div key={fullPath.join(".")} className="mb-3">
          {label}
          {typeof value === "boolean" ? (
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(fullPath, e.target.checked)}
              className="mt-1"
            />
          ) : (
            <input
              type={typeof value === "number" ? "number" : "text"}
              value={value}
              onChange={(e) =>
                onChange(
                  fullPath,
                  typeof value === "number" ? +e.target.value : e.target.value
                )
              }
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          )}
        </div>
      );
    }

    // ✅ ENUM dropdown
    if (
      Array.isArray(value) &&
      value.every((v) => typeof v === "string")
    ) {
      return (
        <div key={fullPath.join(".")} className="mb-3">
          {label}
          <select
            value={value[0] || ""}
            onChange={(e) => onChange(fullPath, [e.target.value])}
            className="mt-1 block w-full border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {value.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // ✅ Array of Objects
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      !Array.isArray(value[0])
    ) {
      return (
        <div key={fullPath.join(".")} className="mb-4 border-l pl-4">
          <p className="font-semibold text-gray-700 mb-1">{key.replace(/_/g, " ")}</p>
          {value.map((item: any, index: number) => (
            <div key={index} className="mb-3 border p-2 rounded bg-gray-50">
              {Object.entries(item).map(([subKey, subVal]) =>
                renderField(subKey, subVal, [...fullPath, index.toString()])
              )}
            </div>
          ))}
        </div>
      );
    }

    // ✅ Object
    if (typeof value === "object" && value !== null) {
      return (
        <div key={fullPath.join(".")} className="pl-3 border-l mb-3">
          <p className="text-sm font-semibold mb-1 text-gray-600 capitalize">
            {key.replace(/_/g, " ")}
          </p>
          {Object.entries(value).map(([subKey, subVal]) =>
            renderField(subKey, subVal, fullPath)
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {Object.entries(data).map(([key, value]) => renderField(key, value, []))}
    </div>
  );
};

export default SectionForm;
