import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, X, Lock, Mail, User, Check, Sparkles, ChevronRight } from 'lucide-react';

const REMEMBER_KEY = 'careerpilot_remember_google';

export default function GoogleAuthButton({ mode = 'signin', onError = () => {} }) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [useAnother, setUseAnother] = useState(false);

  // Remembered Google profile
  const [rememberedAccount, setRememberedAccount] = useState(() => {
    try {
      const stored = localStorage.getItem(REMEMBER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleOpenModal = () => {
    setModalError('');
    if (rememberedAccount && !useAnother) {
      setName(rememberedAccount.name || '');
      setEmail(rememberedAccount.email || '');
    }
    setModalOpen(true);
  };

  // Derive human-friendly name from email if user hasn't typed name yet
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!name && val.includes('@')) {
      const local = val.split('@')[0];
      const clean = local.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim();
      if (clean) {
        const formatted = clean
          .split(/\s+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
        setName(formatted);
      }
    }
  };

  const handleQuickRememberedLogin = async () => {
    if (!rememberedAccount) return;
    setLoading(true);
    setModalError('');
    try {
      await loginWithGoogle(null, {
        name: rememberedAccount.name,
        email: rememberedAccount.email,
        password: rememberedAccount.password || 'GoogleOAuth2026!',
      });
      setModalOpen(false);
      navigate('/dashboard');
    } catch (err) {
      console.warn('Quick login failed, prompting for password:', err);
      // Fallback to manual entry
      setUseAnother(true);
      setEmail(rememberedAccount.email);
      setName(rememberedAccount.name);
      setModalError('Please confirm your password to continue.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setModalError('Please enter your Google email address.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setModalError('Please enter a valid password (at least 4 characters).');
      return;
    }

    setLoading(true);
    setModalError('');

    try {
      const resolvedName = name.trim() || email.split('@')[0];
      const normalizedEmail = email.trim().toLowerCase();

      await loginWithGoogle(null, {
        name: resolvedName,
        email: normalizedEmail,
        password: password.trim(),
      });

      if (rememberMe) {
        const toSave = {
          name: resolvedName,
          email: normalizedEmail,
          password: password.trim(),
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(REMEMBER_KEY, JSON.stringify(toSave));
        setRememberedAccount(toSave);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
        setRememberedAccount(null);
      }

      setModalOpen(false);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Sign-In error:', err);
      const msg = err.response?.data?.message || err.message || 'Google authentication failed.';
      setModalError(msg);
      onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="google-auth-btn"
        id="google-auth-button"
        title="Sign in with your Google account"
      >
        <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>{mode === 'signup' ? 'Sign up with Google' : 'Continue with Google'}</span>
      </button>

      {/* Google Authentication Dialog */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 20, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div
            style={{
              background: 'var(--card-bg, #111827)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              maxWidth: '440px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-light, #94A3B8)',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Google Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <svg width="34" height="34" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-main, #F8FAFC)', margin: 0 }}>
                Sign in with Google
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #94A3B8)', marginTop: '0.35rem' }}>
                to continue to <strong style={{ color: 'var(--text-main, #F8FAFC)' }}>CareerPilot AI</strong>
              </p>
            </div>

            {/* Remembered account 1-click option */}
            {rememberedAccount && !useAnother && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  onClick={handleQuickRememberedLogin}
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    background: 'rgba(59, 130, 246, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  title="Click to continue with saved Google profile"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {rememberedAccount.name
                        ? rememberedAccount.name
                            .split(' ')
                            .filter(Boolean)
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)
                        : 'G'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main, #F8FAFC)' }}>
                        {rememberedAccount.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #94A3B8)' }}>
                        {rememberedAccount.email}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--primary-light, #60A5FA)" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--success, #22C55E)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Check size={12} /> Remembered on this device
                  </span>
                  <button
                    type="button"
                    onClick={() => setUseAnother(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-light, #60A5FA)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Use another account
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Form for New / Changed Credentials */}
            {(!rememberedAccount || useAnother) && (
              <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {modalError && (
                  <div
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: 'var(--danger, #EF4444)',
                      fontSize: '0.82rem',
                    }}
                  >
                    {modalError}
                  </div>
                )}

                {/* Candidate Name Input */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light, #94A3B8)', marginBottom: '0.35rem' }}>
                    <User size={14} /> Candidate Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name (e.g. Mayank Pandey)"
                    required
                    className="form-input"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Google Email Input */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light, #94A3B8)', marginBottom: '0.35rem' }}>
                    <Mail size={14} /> Google Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@gmail.com"
                    required
                    className="form-input"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light, #94A3B8)', marginBottom: '0.35rem' }}>
                    <Lock size={14} /> Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="form-input"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Remember Me Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main, #F8FAFC)', cursor: 'pointer', margin: '0.2rem 0' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--primary, #3B82F6)', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>Remember me on this device (auto-login next time)</span>
                </label>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (rememberedAccount && useAnother) {
                        setUseAnother(false);
                      } else {
                        setModalOpen(false);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-pill, 50px)',
                      background: 'var(--card-bg-light, #161F31)',
                      border: '1px solid var(--input-border, rgba(255,255,255,0.1))',
                      color: 'var(--text-main, #F8FAFC)',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{
                      flex: 2,
                      padding: '0.65rem 1rem',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Sign In with Google
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
