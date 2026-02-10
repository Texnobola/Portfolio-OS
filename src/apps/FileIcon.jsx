import './Finder.css';

const getIcon = (type) => {
  switch (type) {
    case 'folder': return '📁';
    case 'text': return '📄';
    case 'pdf': return '📕';
    default: return '📄';
  }
};

export const FileIcon = ({ name, type, isSelected, onClick, onDoubleClick }) => {
  return (
    <div
      className={`file-icon ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="file-icon-image">{getIcon(type)}</div>
      <div className="file-icon-name">{name}</div>
    </div>
  );
};
