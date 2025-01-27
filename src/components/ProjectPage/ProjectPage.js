import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from './Navigation';
import ContentArea from './ContentArea';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [activeSection, setActiveSection] = useState('installation');
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        console.log('Loading metadata for project:', projectId); // Debug logging
        const module = await import(`../../data/projects/${projectId}/metadata.js`);
        if (!module.metadata) {
          throw new Error('Metadata not found');
        }
        setMetadata(module.metadata);
        setError(null);
      } catch (error) {
        console.error('Error loading metadata:', error);
        setError('Failed to load project metadata');
      }
    };

    loadMetadata();
  }, [projectId]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-red-500">{error}</div>
        <Link to="/" className="text-blue-500 hover:underline">Return to Homepage</Link>
      </div>
    );
  }

  if (!metadata) {
    return <div className="max-w-7xl mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-right mb-4">
        <a href="/" className="uppercase text-sm text-black hover:underline">Return to Homepage</a>
      </div>
      <div className="mb-8">
        <h1 className="text-lg font-bold">{metadata.title}</h1>
        <h2 className="text-sm uppercase mb-4">{metadata.subtitle}</h2>
        <p className="text-sm max-w-2xl">
          {metadata.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <ContentArea 
          projectId={projectId} 
          section={activeSection} 
        />
      </div>
      {/* Removed redundant return link at bottom */}
    </div>
  );
};

export default ProjectPage;