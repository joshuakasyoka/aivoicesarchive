// src/components/shared/DropdownContent.js
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function DropdownContent({ title, sections }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      <h2 className="text-lg uppercase mb-6">{title}</h2>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border-t border-gray-300 pt-4">
            <button 
              onClick={() => toggleSection(index)}
              className="w-full text-left flex justify-between items-center group"
            >
              <h3 className="uppercase text-sm">{section.title}</h3>
              <span className="text-gray-400 group-hover:text-gray-600">
                {openSections[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {openSections[index] && section.content && (
              <div className="mt-2 text-sm">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownContent;