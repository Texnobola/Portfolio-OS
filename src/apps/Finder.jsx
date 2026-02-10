import { useState } from 'react';
import { FileIcon } from './FileIcon';
import { fileSystem } from './fileSystem';
import { FiX, FiChevronRight } from 'react-icons/fi';
import './Finder.css';

export const Finder = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const getCurrentFolder = () => {
    if (currentPath === '/') return fileSystem['/'];
    
    const parts = currentPath.split('/').filter(Boolean);
    let current = fileSystem['/'];
    
    for (const part of parts) {
      current = current.children[part];
      if (!current) return fileSystem['/'];
    }
    
    return current;
  };

  const getBreadcrumbs = () => {
    if (currentPath === '/') return ['Home'];
    return ['Home', ...currentPath.split('/').filter(Boolean)];
  };

  const handleSidebarClick = (location) => {
    setCurrentPath(`/${location}`);
    setSelectedFile(null);
  };

  const handleFileClick = (name) => {
    setSelectedFile(name);
  };

  const handleFileDoubleClick = (name, item) => {
    if (item.type === 'folder') {
      const newPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
      setCurrentPath(newPath);
      setSelectedFile(null);
    } else if (item.type === 'text') {
      setPreviewFile({ name, content: item.content, type: 'text' });
    } else if (item.type === 'contact') {
      setPreviewFile({ name, content: item.content, type: 'contact' });
    } else if (item.type === 'pdf') {
      window.open(item.url, '_blank');
    }
  };

  const currentFolder = getCurrentFolder();
  const files = currentFolder.children || {};

  return (
    <div className="finder">
      <div className="finder-sidebar">
        <div className="finder-sidebar-section">
          <div className="finder-sidebar-title">Favorites</div>
          {['Desktop', 'Documents', 'Projects', 'Downloads'].map(location => (
            <button
              key={location}
              className={`finder-sidebar-item ${currentPath === `/${location}` ? 'active' : ''}`}
              onClick={() => handleSidebarClick(location)}
            >
              📁 {location}
            </button>
          ))}
        </div>
        <div className="finder-sidebar-section">
          <div className="finder-sidebar-title">Other</div>
          <button
            className={`finder-sidebar-item ${currentPath === '/Trash' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('Trash')}
          >
            🗑️ Trash
          </button>
        </div>
      </div>

      <div className="finder-main">
        <div className="finder-breadcrumb">
          {getBreadcrumbs().map((crumb, i) => (
            <span key={i} className="finder-breadcrumb-item">
              {i > 0 && <FiChevronRight className="finder-breadcrumb-separator" />}
              {crumb}
            </span>
          ))}
        </div>

        <div className="finder-content">
          {Object.entries(files).map(([name, item]) => (
            <FileIcon
              key={name}
              name={name}
              type={item.type}
              isSelected={selectedFile === name}
              onClick={() => handleFileClick(name)}
              onDoubleClick={() => handleFileDoubleClick(name, item)}
            />
          ))}
          {Object.keys(files).length === 0 && (
            <div className="finder-empty">This folder is empty</div>
          )}
        </div>
      </div>

      {previewFile && (
        <div className="finder-preview-overlay" onClick={() => setPreviewFile(null)}>
          <div className="finder-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="finder-preview-header">
              <span>{previewFile.name}</span>
              <button onClick={() => setPreviewFile(null)}>
                <FiX />
              </button>
            </div>
            <div className="finder-preview-content">
              {previewFile.type === 'contact' ? (
                <div className="contact-card">
                  {previewFile.content.map((item, i) => (
                    <div key={i} className="contact-item">
                      <span className="contact-label">{item.label}:</span>
                      {item.type === 'email' ? (
                        <a href={`mailto:${item.value}`} className="contact-link">{item.value}</a>
                      ) : item.type === 'url' ? (
                        <a href={`https://${item.value}`} target="_blank" rel="noopener noreferrer" className="contact-link">{item.value}</a>
                      ) : item.type === 'tel' ? (
                        <a href={`tel:${item.value}`} className="contact-link">{item.value}</a>
                      ) : item.type === 'telegram' ? (
                        <a href={`https://t.me/${item.value.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="contact-link">{item.value}</a>
                      ) : (
                        <span className="contact-value">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <pre>{previewFile.content}</pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
