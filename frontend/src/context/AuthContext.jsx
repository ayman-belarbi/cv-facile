import { createContext, useContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setUser(data.user);
    setToken(data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.access_token);
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const error = await res.json();
      console.error('Register error:', error);
      // رجع جميع التفاصيل للمستخدم
      throw error;
    }
    const data = await res.json();
    setUser(data.user);
    setToken(data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.access_token);
    return data;
  };

  const logout = async () => {
    if (token) {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}