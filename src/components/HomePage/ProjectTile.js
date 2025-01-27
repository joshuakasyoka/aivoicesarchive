import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Navigation = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'description', label: 'Description' },
    { id: 'installation', label: 'Installation' },
    { id: 'digitalProbe', label: 'Digital Probe' },
    { id: 'handbook', label: 'Handbook' },
    { id: 'glossary', label: 'Civic Glossary' },
    { id: 'archive', label: 'Archive' }
  ];

  return (
    <div className="space-y-2">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`w-full p-3 text-left rounded-lg ${
            activeSection === section.id
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

const ContentArea = ({ projectId, section }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Dynamically import the content based on projectId and section
        const module = await import(`../../data/projects/${projectId}/${section}.js`);
        setContent(module[`${section}Content`]);
      } catch (error) {
        console.error('Error loading content:', error);
        setContent(null);
      }
    };

    loadContent();
  }, [projectId, section]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-gray-300 p-8">
      <h2 className="text-lg uppercase mb-4">{content.title}</h2>
      <div className="space-y-6">
        {content.sections?.map((section, index) => (
          <div key={index} className="border-t border-gray-300 pt-4">
            <h3 className="uppercase text-sm mb-2">{section.title}</h3>
            {section.content && (
              <p className="text-sm">{section.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectPage = () => {
  const { projectId } = useParams();
  const [activeSection, setActiveSection] = useState('description');

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Navigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>
        <div className="md:col-span-3">
          <ContentArea 
            projectId={projectId} 
            section={activeSection} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;