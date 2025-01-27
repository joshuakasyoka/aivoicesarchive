// src/components/ProjectPage/Navigation.js
import React from 'react';

const shapes = {
  'description': '⬡',
  'installation': '⬠',
  'digitalProbe': '⭔',
  'handbook': '⭔',
  'glossary': '⬡',
  'archive': '⬡'
};

export const NavigationButton = ({ id, label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left border ${
        isActive ? 'bg-black text-white' : 'border-gray-300'
      }`}
    >
      <div className="text-2xl mb-2">{shapes[id]}</div>
      <div className="uppercase text-sm">{label}</div>
    </button>
  );
};

function Navigation({ activeSection, onSectionChange }) {
  const sections = [
    { id: 'description', label: 'Description' },
    { id: 'installation', label: 'Installation' },
    { id: 'digitalProbe', label: 'Digital Probe' },
    { id: 'handbook', label: 'Handbook' },
    { id: 'glossary', label: 'Civic Glossary' },
    { id: 'archive', label: 'Disappearance Archive' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {sections.map(section => (
        <NavigationButton
          key={section.id}
          id={section.id}
          label={section.label}
          onClick={() => onSectionChange(section.id)}
          isActive={activeSection === section.id}
        />
      ))}
    </div>
  );
}

export default Navigation;
