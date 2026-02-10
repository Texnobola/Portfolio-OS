import { FiFile, FiChevronDown, FiTrash2 } from 'react-icons/fi';
import './VSCode.css';

export const FileTree = ({ files, activeFile, onFileClick, onDeleteFile }) => {
  return (
    <div className="file-tree">
      <div className="file-tree-header">
        <FiChevronDown size={16} />
        <span>SULTONOVOS</span>
      </div>
      <div className="file-list">
        {Object.keys(files).map(fileName => (
          <div
            key={fileName}
            className={`file-item ${activeFile === fileName ? 'active' : ''}`}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div onClick={() => onFileClick(fileName)} style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
              <FiFile size={16} />
              <span>{fileName}{files[fileName].modified && '*'}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteFile(fileName); }}
              style={{ background: 'none', border: 'none', color: '#858585', cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s' }}
              className="delete-btn"
              title="Delete"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
