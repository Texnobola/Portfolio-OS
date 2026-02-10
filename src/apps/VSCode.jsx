import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { FiFile, FiSearch, FiGitBranch, FiPackage, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import { FileTree } from './FileTree';
import { PROJECT_FILES } from './codeData';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import './VSCode.css';

export const VSCode = () => {
  const { user } = useAuth();
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [readOnly, setReadOnly] = useState(false);
  const [files, setFiles] = useState(PROJECT_FILES);
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const editorRef = useRef(null);
  const { addToast } = useNotification();

  const currentFile = files[activeFile];

  const handleEditorChange = (value) => {
    setFiles(prev => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        value: value,
        modified: true,
      },
    }));
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const createFile = () => {
    if (!newFileName.trim()) return;
    const ext = newFileName.split('.').pop();
    const langMap = { js: 'javascript', jsx: 'javascript', css: 'css', html: 'html', json: 'json' };
    
    setFiles(prev => ({
      ...prev,
      [newFileName]: {
        name: newFileName,
        language: langMap[ext] || 'javascript',
        value: `// ${newFileName}\n\n`,
      },
    }));
    setActiveFile(newFileName);
    setNewFileName('');
    setShowNewFile(false);
    addToast(`Created ${newFileName}`, 'success');
  };

  const deleteFile = (fileName) => {
    if (user?.isGuest) {
      addToast('Sign in to delete files', 'warning');
      return;
    }
    if (Object.keys(files).length === 1) {
      addToast('Cannot delete last file', 'warning');
      return;
    }
    const newFiles = { ...files };
    delete newFiles[fileName];
    setFiles(newFiles);
    if (activeFile === fileName) {
      setActiveFile(Object.keys(newFiles)[0]);
    }
    addToast(`Deleted ${fileName}`, 'info');
  };

  const saveFile = () => {
    if (user?.isGuest) {
      addToast('Sign in to save changes', 'warning');
      return;
    }
    setFiles(prev => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        modified: false,
      },
    }));
    addToast(`Saved ${activeFile}`, 'success');
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
      addToast('Code formatted', 'success');
    }
  };

  return (
    <div className="vscode">
      <div className="activity-bar">
        <button className="activity-btn active" title="Explorer">
          <FiFile />
        </button>
        <button className="activity-btn" title="Search">
          <FiSearch />
        </button>
        <button className="activity-btn" title="Source Control">
          <FiGitBranch />
        </button>
        <button className="activity-btn" title="Extensions">
          <FiPackage />
        </button>
      </div>

      <div className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>EXPLORER</span>
          <button 
            onClick={() => {
              if (user?.isGuest) {
                addToast('Sign in to create files', 'warning');
              } else {
                setShowNewFile(true);
              }
            }} 
            style={{ background: 'none', border: 'none', color: '#cccccc', cursor: 'pointer', fontSize: '16px' }} 
            title="New File"
          >
            <FiPlus />
          </button>
        </div>
        {showNewFile && (
          <div style={{ padding: '8px 12px' }}>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') createFile();
                if (e.key === 'Escape') { setShowNewFile(false); setNewFileName(''); }
              }}
              placeholder="filename.js"
              style={{ width: '100%', padding: '4px 8px', background: '#3c3c3c', border: '1px solid #007acc', color: '#cccccc', fontSize: '13px' }}
              autoFocus
            />
          </div>
        )}
        <FileTree
          files={files}
          activeFile={activeFile}
          onFileClick={setActiveFile}
          onDeleteFile={deleteFile}
        />
      </div>

      <div className="editor-area">
        <div className="tabs-bar">
          <div className="tab active">
            <FiFile size={14} />
            <span>{currentFile.name}{currentFile.modified && '*'}</span>
          </div>
        </div>

        <div className="editor-container">
          <Editor
            height="100%"
            language={currentFile.language}
            value={currentFile.value}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              readOnly: readOnly,
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>

        <div className="status-bar">
          <div className="status-left">
            <span className="status-item">{currentFile.language}</span>
            {currentFile.modified && <span className="status-item" style={{ color: '#ffa500' }}>● Modified</span>}
          </div>
          <div className="status-right">
            {currentFile.modified && (
              <button className="status-item clickable" onClick={saveFile} title="Save" style={{ background: '#28a745', padding: '2px 8px', borderRadius: '3px' }}>
                <FiSave size={12} /> Save
              </button>
            )}
            <button className="status-item clickable" onClick={formatCode} title="Format Code">
              Format
            </button>
            <button className="status-item clickable" onClick={() => setReadOnly(!readOnly)}>
              {readOnly ? '🔒 Read-Only' : '✏️ Editing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
