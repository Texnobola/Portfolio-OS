import { useState, useRef, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

export const Camera = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(false);
  const [flash, setFlash] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { addToast } = useNotification();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(mediaStream => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch(() => setError(true));

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `selfie_os_${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Photo saved!', 'success');
    }, 'image/jpeg', 0.95);
  };

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📷</div>
          <div style={{ fontSize: '18px' }}>Camera access required for Mirror app</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', border: '3px solid rgba(255,255,255,0.5)', borderRadius: '50%', pointerEvents: 'none' }} />
      
      <button
        onClick={takePicture}
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '70px', borderRadius: '50%', background: '#fff', border: '4px solid rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'transform 0.1s' }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(0.9)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(1)'}
      />
      
      {flash && <div style={{ position: 'absolute', inset: 0, background: '#fff', animation: 'fadeOut 0.2s' }} />}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
