import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login(cleanEmail, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="brand-badge">
        <Sparkles size={13} style={{ display: 'inline', marginRight: '6px' }} />
        CareerPilot AI
      </div>

      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to access your resumes, ATS scores, and interviews</p>
      </div>

      {/* Google Authentication Button */}
      <div className="auth-social-section">
        <GoogleAuthButton mode="signin" onError={(msg) => setError(msg)} />
      </div>

      <div className="auth-divider">
        <span>or continue with email</span>
      </div>

      {error && (
        <div className="auth-alert auth-alert-danger">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form className="auth-form-content" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>min 6 characters</span>
          </div>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          id="login-submit-btn"
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Quick Demo Login Preset Helper */}
      <div className="demo-credentials-box">
        <div className="demo-credentials-title">Quick Demo Login:</div>
        <div className="demo-credentials-buttons">
          <button
            type="button"
            className="demo-btn"
            onClick={() => handleDemoLogin('mayankpandey1331@gmail.com', 'test1234')}
            disabled={loading}
          >
            Mayank Pandey (Demo)
          </button>
          <button
            type="button"
            className="demo-btn"
            onClick={() => handleDemoLogin('z@example.com', '123')}
            disabled={loading}
          >
            Candidate Z (Demo)
          </button>
        </div>
      </div>

      <div className="auth-footer">
        <span style={{ color: 'var(--text-muted)' }}>Don't have an account?</span>
        <Link to="/register" className="auth-link">Create Account</Link>
      </div>
    </div>
  );
}
