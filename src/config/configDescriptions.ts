// src/config/configDescriptions.ts

export const sectionDescriptions: Record<string, string> = {
    address_lat_long_config: "Latitude/Longitude & geocoding configuration",
    apply_payment_logic: "Sets the logic used to apply payments",
    attributes: "List of case attributes with types and options",
    case_level: "Sets the primary case level scope (like LOAN)",
    cc_case_level: "Sets the CC case level scope (like LOAN)",
    communication_config: "DND time slots and frequency limits for communication",
    daily_calls_limit: "Maximum number of daily calls allowed",
    dialer_configuration: "Settings for external dialers like OZONETEL",
    distance_check_meters: "Distance threshold for geo-checks (meters)",
    payment_config: "Settings for payment methods and gateways",
    providers: "Configuration of communication providers (SMS, WhatsApp, etc.)",
    sender_id: "Sender ID to be used in communications"
  };
  
  export const fieldDescriptions: Record<string, string> = {
    google_apikey: "API key for Google Maps geocoding",
    is_geocoding_enabled: "Enable or disable geocoding",
    likely_address_enabled: "Enable AI-based address suggestion",
    llm_api_key: "Key for LLM service used in address logic",
    llm_version: "Version of LLM used",
    rate_limit: "API call rate limit",
    test_lat: "Latitude for test mode",
    test_long: "Longitude for test mode",
    test_radius: "Radius for address detection",
    test_mode: "Enable test mode",
    sender_id: "Used as sender identity in outbound messages",
    apply_payment_logic: "Controls how payments are distributed",
    case_level: "Level of case handling for main logic",
    cc_case_level: "Level of case handling for call center logic",
    daily_calls_limit: "Number of calls allowed per day per case",
    distance_check_meters: "Allowed proximity distance in meters",
    attributes: "Key case attributes used in scoring/routing",
    communication_config: "When and how often communications can be sent",
    dialer_configuration: "Configuration for telephony providers",
    payment_config: "How customer can make payments",
    providers: "Message provider APIs and limits"
  };
  