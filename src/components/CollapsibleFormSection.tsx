import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleFormSection: React.FC<Props> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border rounded mb-4 bg-white shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100"
      >
        <span className="capitalize">{title.replace(/_/g, " ")}</span>
        {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {open && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

export default CollapsibleFormSection;
