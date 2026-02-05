import './Projects.css';

export const Projects = () => {
  const projects = [
    { id: 1, name: 'E-Commerce Platform', tech: 'React, Node.js' },
    { id: 2, name: 'Portfolio OS', tech: 'React, Framer Motion' },
    { id: 3, name: 'Dashboard Analytics', tech: 'React, D3.js' },
    { id: 4, name: 'Social Media App', tech: 'React Native' },
  ];

  return (
    <div className="projects-grid">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <div className="project-icon">📁</div>
          <h3>{project.name}</h3>
          <p>{project.tech}</p>
        </div>
      ))}
    </div>
  );
};
