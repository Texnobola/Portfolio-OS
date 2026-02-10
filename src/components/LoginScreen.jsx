import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useOS } from '../context/OSContext';
import { useAuth } from '../context/AuthContext';
import './LoginScreen.css';

export const LoginScreen = ({ onLogin }) => {
  const { wallpaper } = useOS();
  const { signIn, signUp, signInAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRealLogin, setIsRealLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRealLogin) {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);
      
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        onLogin();
      }
    } else {
      if (password.trim()) {
        signInAsGuest();
        onLogin();
      }
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="login-screen"
      style={{ backgroundImage: `url(${wallpaper})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="login-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 20 }}
      >
        <div className="login-avatar">
          <div className="avatar-circle">SO</div>
        </div>
        <h2 className="login-name">Sultonov O'razali</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {isRealLogin && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login-input"
              required
              autoFocus
            />
          )}
          <div className="login-form-row">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRealLogin ? "Password" : "Enter Password"}
              className="login-input"
              autoFocus={!isRealLogin}
              required={isRealLogin}
            />
            <button type="submit" className="login-btn" disabled={loading}>
              <FiArrowRight />
            </button>
          </div>
        </form>
        {error && <p className={`login-error ${isSignUp && !error.includes('error') ? 'success' : ''}`}>{error}</p>}
        <p className="login-hint">
          {isRealLogin ? (
            <>
              <span onClick={() => { setIsRealLogin(false); setIsSignUp(false); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Continue as guest
              </span>
              {' | '}
              <span onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                {isSignUp ? 'Sign in' : 'Sign up'}
              </span>
            </>
          ) : (
            <>
              Type anything to unlock or{' '}
              <span onClick={() => setIsRealLogin(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                sign in
              </span>
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
};
