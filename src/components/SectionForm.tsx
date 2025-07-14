import React from "react";

interface Props {
  section: string;
  data: any;
  onChange: (path: string[], value: any) => void;
}

const tooltips: Record<string, string> = {
  sender_id: "Sender ID used in SMS/communication.",
  case_level: "Case level config, e.g., LOAN level.",
  cc_case_level: "Call center case level.",
  apply_payment_logic: "Logic to apply on payment (e.g. PID).",
  distance_check_meters: "Max distance allowed to check location accuracy.",
  daily_calls_limit: "Limit on number of daily calls.",
  google_apikey: "Google API key used for geocoding.",
  is_geocoding_enabled: "Toggle geocoding feature on/off.",
  test_radius: "Radius to test lat/long accuracy.",
  base_url: "Base URL for provider or dialer API.",
  auth_key: "Authentication key for communication.",
  sip_location: "SIP server region (e.g., IN, US).",
  campaign_name: "Campaign identifier for dialers.",
  bridge_call_did: "Bridge call DID number.",
  rate_limit_period: "Period in seconds for rate limiting.",
  rate_limit_rate: "Allowed requests per period.",
  rate_limit_burst: "Max burst allowed in rate limit.",
  is_rate_limit_enabled: "Toggle rate limiting on/off.",
};

const SectionForm: React.FC<Props> = ({ section, data, onChange }) => {
  if (!data) return null;

  const flatTextKeys = [
    "sender_id",
    "case_level",
    "cc_case_level",
    "apply_payment_logic",
    "distance_check_meters",
    "daily_calls_limit",
  ];

  const renderField = (key: string, value: any, path: string[]) => {
    const fullPath = [...path, key];
    const tooltipText = tooltips[key] || "";

    // Simple text input fields
    if (typeof value === "string" && flatTextKeys.includes(key)) {
      return (
        <div key={fullPath.join(".")} className="mb-3">
          <label
            className="block text-sm font-medium text-gray-700 capitalize"
            title={tooltipText}
          >
            {key.replace(/_/g, " ")}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(fullPath, e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
      );
    }

    // Enum detection
    const isEnumArray =
      Array.isArray(value) &&
      value.length > 0 &&
      value.every((v) => typeof v === "string");

    // Primitive fields
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return (
        <div key={fullPath.join(".")} className="mb-3">
          <label
            className="block text-sm font-medium text-gray-700 capitalize"
            title={tooltipText}
          >
            {key.replace(/_/g, " ")}
          </label>
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

    // Enum dropdown
    if (isEnumArray) {
      return (
        <div key={fullPath.join(".")} className="mb-3">
          <label
            className="block text-sm font-medium text-gray-700 capitalize"
            title={tooltipText}
          >
            {key.replace(/_/g, " ")}
          </label>
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

    // Array of objects (like dialers or providers)
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object"
    ) {
      return (
        <div key={fullPath.join(".")} className="mb-4">
          <p
            className="text-sm font-semibold text-gray-700 mb-2 capitalize"
            title={tooltipText}
          >
            {key.replace(/_/g, " ")}
          </p>
          {value.map((item, idx) => (
            <div key={idx} className="pl-3 border-l-4 border-gray-500 mb-2">
              {Object.entries(item).map(([k, v]) =>
                renderField(k, v, [...fullPath, idx.toString()])
              )}
            </div>
          ))}
        </div>
      );
    }

    // Nested object
    if (typeof value === "object" && value !== null) {
      return (
        <div key={fullPath.join(".")} className="pl-3 border-l-4 border-gray-500  mb-3">
          <p
            className="text-sm font-semibold mb-1 text-gray-600 capitalize"
            title={tooltipText}
          >
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
