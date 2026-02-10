import './Browser.css';

const projects = [
  {
    id: 1,
    name: 'Old Portfolio',
    url: 'https://sultonovweb.uz',
    icon: '👤',
  },
  {
    id: 2,
    name: 'GitHub Profile',
    url: 'https://github.com/Texnobola',
    icon: '🐙',
  },
  {
    id: 3,
    name: 'React To-Do',
    url: 'https://todomvc.com',
    icon: '✓',
  },
  {
    id: 4,
    name: 'CodePen',
    url: 'https://codepen.io',
    icon: '🎨',
  },
];

export const BrowserHome = ({ onNavigate }) => {
  return (
    <div className="browser-home">
      <h2 className="browser-home-title">Favorites</h2>
      <div className="browser-favorites-grid">
        {projects.map(project => (
          <button
            key={project.id}
            className="browser-favorite-card"
            onClick={() => onNavigate(project.url)}
          >
            <div className="browser-favorite-icon">{project.icon}</div>
            <span className="browser-favorite-name">{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
