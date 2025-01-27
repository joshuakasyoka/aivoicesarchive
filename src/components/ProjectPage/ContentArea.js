import React, { useEffect, useState } from 'react';

const shapes = {
  'description': '⬡',
  'installation': '⬠',
  'digitalProbe': '⭔',
  'handbook': '⭔',
  'glossary': '⬡',
  'archive': '⬡'
};

const ContentArea = ({ projectId, section }) => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log(`Loading content for project ${projectId}, section ${section}`);
        const module = await import(`../../data/projects/${projectId}/${section}.js`);
        const contentKey = `${section}Content`;
        
        // Debug logging
        console.log('Available exports:', Object.keys(module));
        
        if (!module[contentKey]) {
          throw new Error(`No ${contentKey} export found in module`);
        }

        setContent(module[contentKey]);
        setError(null);
      } catch (error) {
        console.error(`Error loading content for project ${projectId}, section ${section}:`, error);
        setError(`Failed to load ${section} content`);
        setContent(null);
      }
    };

    if (projectId && section) {
      loadContent();
    }
  }, [projectId, section]);

  if (error) {
    return (
      <div className="border border-red-300 bg-red-50 p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="border border-gray-300 p-8">
        <div className="animate-pulse">Loading {section} content...</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 p-8">
      <div className="text-2xl mb-4">
        {shapes[section] || '⬡'} {/* Fallback shape if section not found */}
      </div>
      <h2 className="text-lg uppercase mb-8">{content.title}</h2>
      <div className="space-y-6">
        {content.sections?.map((section, index) => (
          <div key={`${section.title}-${index}`} className="border-t border-gray-300 pt-4">
            <h3 className="uppercase text-sm mb-2 flex justify-between items-center">
              {section.title}
              <button 
                className="text-xl focus:outline-none" 
                aria-label={section.content ? "Collapse section" : "Expand section"}
              >
                {section.content ? "^" : "v"}
              </button>
            </h3>
            {section.content && (
              <div className="text-sm prose max-w-none">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;