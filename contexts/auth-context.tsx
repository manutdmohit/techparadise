'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string,
    requireAdmin?: boolean
  ) => Promise<void>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const signIn = async (
    email: string,
    password: string,
    requireAdmin = false
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll just check if the email contains "error" to simulate an error
      if (email.includes('error')) {
        throw new Error('Invalid email or password');
      }

      // Check if admin access is required but the email doesn't have admin privileges
      const isAdminUser = email.includes('admin') || email.includes('demo');
      if (requireAdmin && !isAdminUser) {
        throw new Error("You don't have admin privileges");
      }

      // Create mock user
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email,
        firstName: 'Demo',
        lastName: 'User',
        isAdmin: isAdminUser,
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      // toast({
      //   title: 'Signed in successfully',
      //   description: `Welcome back, ${mockUser.firstName}!`,
      // });

      toast.success('Signed in successfully', {
        description: `Welcome back, ${mockUser.firstName}!`,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll just check if the email contains "taken" to simulate an error
      if (email.includes('taken')) {
        throw new Error('Email is already taken');
      }

      // Create mock user
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email,
        firstName,
        lastName,
        isAdmin: email.includes('admin') || email.includes('demo'),
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      toast.success('Signed up successfully', {
        description: `Welcome, ${mockUser.firstName}!`,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);

    toast.success('Signed out successfully', {
      description: 'You have been signed out of the admin area.',
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
