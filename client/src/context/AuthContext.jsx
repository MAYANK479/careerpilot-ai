import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || '';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Configure axios authorization header globally when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token and fetch fresh user profile on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (isMounted && response.data.success && response.data.user) {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.response?.data?.message || err.message);
        if (isMounted) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: (email || '').trim().toLowerCase(),
      password,
    });

    if (response.data.success) {
      const newToken = response.data.token;
      const newUser = response.data.user;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name: (name || '').trim(),
      email: (email || '').trim().toLowerCase(),
      password,
    });

    if (response.data.success) {
      const newToken = response.data.token;
      const newUser = response.data.user;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      return response.data;
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  }, []);

  const loginWithGoogle = useCallback(async (credential, userInfo = null) => {
    const response = await axios.post(`${API_URL}/api/auth/google`, {
      credential,
      userInfo,
    });

    if (response.data.success) {
      const newToken = response.data.token;
      const newUser = response.data.user;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      return response.data;
    } else {
      throw new Error(response.data.message || 'Google authentication failed');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
