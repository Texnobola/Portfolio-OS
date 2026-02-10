import { useRef, useState, useEffect } from 'react';
import { FiEdit3, FiTrash2, FiDownload, FiDelete } from 'react-icons/fi';
import './Paint.css';

export const Paint = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Fill with white background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setCtx(context);
  }, []);

  const startDrawing = (e) => {
    if (!ctx) return;
    setIsDrawing(true);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);
    ctx.closePath();
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'sultonov-drawing.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="paint-app">
      <div className="paint-toolbar">
        <div className="tool-section">
          <label>Tool:</label>
          <div className="tool-buttons">
            <button
              className={`tool-btn ${tool === 'pencil' ? 'active' : ''}`}
              onClick={() => setTool('pencil')}
              title="Pencil"
            >
              <FiEdit3 />
            </button>
            <button
              className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              onClick={() => setTool('eraser')}
              title="Eraser"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        <div className="tool-section">
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
            disabled={tool === 'eraser'}
          />
        </div>

        <div className="tool-section">
          <label>Size: {brushSize}px</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="size-slider"
          />
        </div>

        <div className="tool-section">
          <button onClick={clearCanvas} className="action-btn clear-btn">
            <FiDelete /> Clear
          </button>
          <button onClick={downloadCanvas} className="action-btn download-btn">
            <FiDownload /> Download
          </button>
        </div>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="paint-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};
