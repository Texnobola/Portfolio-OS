import { useState } from 'react';
import { FiSend, FiInbox, FiSend as FiSent, FiEdit } from 'react-icons/fi';
import { useSound } from '../hooks/useSound';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';
import './Mail.css';

const fakeInboxEmail = {
  from: 'no-reply@google.com',
  subject: 'Security Alert: New Login from Tashkent',
  body: 'We noticed a new sign-in to your Google Account from a device in Tashkent, Uzbekistan. If this was you, you can safely ignore this email.',
  date: 'Today, 10:30 AM',
};

export const Mail = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('compose');
  const [formData, setFormData] = useState({
    from: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const { play } = useSound();
  const { addToast } = useNotification();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (user?.isGuest) {
      addToast('Sign in to send messages', 'warning');
      return;
    }

    if (!formData.from || !formData.subject || !formData.message) {
      setToast({ type: 'error', message: 'Please fill in all fields' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_email: formData.from,
          subject: formData.subject,
          message: formData.message,
          to_email: 'texnobola@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      play('windowOpen');
      addToast('Message Sent Successfully!', 'success');
      setToast({ type: 'success', message: 'Message Sent Successfully!' });
      setFormData({ from: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      addToast('Failed to send message', 'error');
      setToast({ type: 'error', message: 'Failed to send message' });
    }
    
    setSending(false);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="mail-app">
      <div className="mail-sidebar">
        <button
          className={`mail-sidebar-item ${activeView === 'inbox' ? 'active' : ''}`}
          onClick={() => setActiveView('inbox')}
        >
          <FiInbox />
          <span>Inbox</span>
          <span className="mail-badge">1</span>
        </button>
        <button
          className={`mail-sidebar-item ${activeView === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveView('sent')}
        >
          <FiSent />
          <span>Sent</span>
        </button>
        <button
          className={`mail-sidebar-item ${activeView === 'compose' ? 'active' : ''}`}
          onClick={() => setActiveView('compose')}
        >
          <FiEdit />
          <span>Compose</span>
        </button>
      </div>

      <div className="mail-content">
        {activeView === 'inbox' && (
          <div className="mail-inbox">
            <h2>Inbox</h2>
            <div className="mail-list">
              <div className="mail-item">
                <div className="mail-item-header">
                  <strong>{fakeInboxEmail.from}</strong>
                  <span className="mail-date">{fakeInboxEmail.date}</span>
                </div>
                <div className="mail-item-subject">{fakeInboxEmail.subject}</div>
                <div className="mail-item-preview">{fakeInboxEmail.body}</div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'sent' && (
          <div className="mail-empty">
            <FiSent size={48} />
            <p>No sent messages</p>
          </div>
        )}

        {activeView === 'compose' && (
          <div className="mail-compose">
            <div className="mail-compose-header">
              <h2>New Message</h2>
              <button
                onClick={handleSend}
                disabled={sending}
                className="mail-send-btn"
              >
                <FiSend />
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
            <form onSubmit={handleSend} className="mail-form">
              <div className="mail-field">
                <label>To:</label>
                <input
                  type="email"
                  value="admin@sultonovweb.uz"
                  disabled
                  className="mail-input disabled"
                />
              </div>
              <div className="mail-field">
                <label>From:</label>
                <input
                  type="email"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="mail-input"
                  required
                />
              </div>
              <div className="mail-field">
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="mail-input"
                  required
                />
              </div>
              <div className="mail-field-body">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="mail-textarea"
                  required
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {toast && (
        <div className={`mail-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};
