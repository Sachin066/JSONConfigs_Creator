import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  baseConfig: any;
}

const JSONPreview: React.FC<Props> = ({ baseConfig }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(baseConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded shadow h-full max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">📄 Live JSON Preview</h2>
        <button
          onClick={handleCopy}
          className="text-sm text-blue-600 flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check size={16} /> Copied
            </>
          ) : (
            <>
              <Copy size={16} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(baseConfig, null, 2)}
      </pre>
    </div>
  );
};

export default JSONPreview;
