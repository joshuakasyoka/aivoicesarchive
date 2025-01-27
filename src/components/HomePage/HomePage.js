import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/1_CAI.png'
import image2 from '../../assets/2_CAI.png';
import image3 from '../../assets/3_CAI.png';

const ProjectTile = ({ project }) => {
  const shapes = {
    1: '◇',  // diamond
    2: '⬠',  // pentagon
    3: '⬡',  // hexagon
    4: '⬢',  // heptagon
    5: '⭔',  // octagon
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e) => {
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const targetIndex = e.target.dataset.index;
    // Logic to swap or reorder tiles based on draggedIndex and targetIndex
  };

  return (
    <Link to={`/project/${project.id}`} className="block">
      <div className="border border-gray-300 p-6 hover:border-gray-400 transition-colors duration-200">
        <div className="text-2xl mb-2">
          {shapes[project.id]}
        </div>
        <h2 className="text-sm font-normal mb-2">
          {String(project.id).padStart(3, '0')} {project.title}
        </h2>
        <div className="mb-4">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
        <p className="text-sm font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </Link>
  );
};

const HomePage = () => {
  const projects = [
    {
      id: 1,
      title: "PROBLEM DEFINITION",
      image: image1,
      description: "An interactive street probe which gets people to question how problems are framed in the creation of an algorithm"
    },
    {
      id: 2,
      title: "DATA COLLECTION",
      image: image2,
      description: "An interactive street probe which gets people to question how problems are framed in the creation of an algorithm"
    },
    {
      id: 3,
      title: "ALGORITHM TRAINING",
      image: image3,
      description: "An interactive street probe which gets people to question how problems are framed in the creation of an algorithm"
    },
    {
      id: 4,
      title: "INTEGRATION",
      image: image2,
      description: "An interactive street probe which gets people to question how problems are framed in the creation of an algorithm"
    },
    {
      id: 5,
      title: "MONITORING",
      image: image1,
      description: "An interactive street probe which gets people to question how problems are framed in the creation of an algorithm"
    }
  ];

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e) => {
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const targetIndex = e.target.dataset.index;
    // Logic to swap or reorder tiles based on draggedIndex and targetIndex
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-xl mb-2">LONDON AI VOICES</h1>
      <h2 className="text-sm mb-8">DESIGN EXPERIMENTS IN THE CIVICS EXPLORING ALGORITHMS & ETHICS</h2>
      <p className="text-sm mb-8">EXPLORE CIVIC EXPERIMENTS...</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-index={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;