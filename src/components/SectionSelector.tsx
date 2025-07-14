import React, { useState } from "react";

interface Props {
  allKeys: string[];
  selectedKeys: string[];
  onToggle: (key: string) => void;
}

// Tooltip info per section key
const sectionDescriptions: Record<string, string> = {
  address_lat_long_config: "Settings for location tracking & geocoding.",
  apply_payment_logic: "Configures the payment application logic (e.g., PID).",
  attributes: "All user or case-level attributes used for logic building.",
  case_level: "Loan-level configuration scope.",
  cc_case_level: "Call-center level config scope.",
  communication_config: "Controls frequency & timing for communication.",
  daily_calls_limit: "Limit for maximum daily call attempts.",
  dialer_configuration: "Settings for integrating dialers like Ozonetel, Dialshree.",
  distance_check_meters: "Max distance allowed for field agent proximity.",
  payment_config: "All supported payment methods and partners.",
  providers: "SMS/WhatsApp/IVR service provider API configuration.",
  sender_id: "Sender ID for messages/communication."
};

const SectionSelector: React.FC<Props> = ({ allKeys, selectedKeys, onToggle }) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const toggleDropdown = (key: string) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Select Config Sections</h2>
      <div className="grid grid-cols-1 gap-2">
        {allKeys.map((key) => (
          <div key={key} className="border p-2 rounded bg-white shadow-sm">
            <label
              className="flex items-center justify-between cursor-pointer"
              title={sectionDescriptions[key] || ""}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedKeys.includes(key)}
                  onChange={() => onToggle(key)}
                />
                <span className="capitalize">{key.replace(/_/g, " ")}</span>
              </div>
              <button
                type="button"
                className="text-xs text-blue-500 underline"
                onClick={() => toggleDropdown(key)}
              >
                {expandedKeys.includes(key) ? "Hide Info" : "Show Info"}
              </button>
            </label>
            {expandedKeys.includes(key) && (
              <div className="mt-2 text-sm text-gray-600">
                {sectionDescriptions[key] || "No description available."}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionSelector;
