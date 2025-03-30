import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const API_URL = "http://192.168.100.169:8080";

// Types for our auth context
type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<boolean>;
};

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Token storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token and user on mount
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        setIsLoading(true);
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const storedUser = await SecureStore.getItemAsync(USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          await verifyToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        // Clear possibly corrupted data
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Verify token validity with the API
  const verifyToken = async (tokenToVerify: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/users/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        // Token invalid, clear auth state
        setToken(null);
        setUser(null);
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
        return false;
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  // Login function - store token and user data
  const login = async (newToken: string, userData: User): Promise<void> => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error('Login storage error:', error);
      throw new Error('Failed to store auth data');
    }
  };

  // Register function - just set the user data (typically followed by login)
  const register = async (userData: User): Promise<void> => {
    setUser(userData);
  };

  // Logout function - clear token and user data
  const logout = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to clear auth data');
    }
  };

  // Public method to verify auth status
  const verifyAuth = async (): Promise<boolean> => {
    if (!token) return false;
    return verifyToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        verifyAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 