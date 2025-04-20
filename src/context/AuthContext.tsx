import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/data';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ error: 'AuthContext not initialized' }),
  logout: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if we have a session token in localStorage
        const token = localStorage.getItem('session_token');
        
        if (token) {
          // Verify the token by looking up the session
          const { data, error } = await supabase
            .from('sessions')
            .select('user_id, expires_at')
            .eq('token', token)
            .single();
          
          if (error || !data) {
            // Token is invalid or session not found
            localStorage.removeItem('session_token');
            setUser(null);
          } else {
            // Check if session is expired
            const expiresAt = new Date(data.expires_at);
            if (expiresAt < new Date()) {
              localStorage.removeItem('session_token');
              setUser(null);
            } else {
              // Session is valid, get user profile
              const { data: profileData } = await supabase
                .from('profiles')
                .select('id, email')
                .eq('id', data.user_id)
                .single();
              
              if (profileData) {
                setUser(profileData);
              } else {
                localStorage.removeItem('session_token');
                setUser(null);
              }
            }
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Find user by email
      const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('id, email, password')
        .eq('email', email)
        .single();

      if (userError || !user) {
        return { error: 'Email ou mot de passe incorrect' };
      }

      // For a real app, we would verify the password hash here
      // This is simplified for demo purposes
      if (user.password !== password) {
        return { error: 'Email ou mot de passe incorrect' };
      }

      // Create a session
      const token = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

      const { error: sessionError } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          token,
          expires_at: expiresAt.toISOString(),
        });

      if (sessionError) {
        return { error: 'Erreur de connexion' };
      }

      // Store session token
      localStorage.setItem('session_token', token);
      
      // Set user in state (without password)
      setUser({
        id: user.id,
        email: user.email,
      });

      return { error: null };
    } catch (err) {
      console.error('Login error:', err);
      return { error: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('session_token');
      if (token) {
        // Delete the session from the database
        await supabase
          .from('sessions')
          .delete()
          .eq('token', token);
        
        // Remove from localStorage
        localStorage.removeItem('session_token');
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Helper to generate a random session token
  const generateSessionToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};