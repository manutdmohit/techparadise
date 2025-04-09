'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock sign-in function (in a real app, this would call an API)
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists in localStorage (for demo purposes)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email);

    if (!foundUser) {
      setIsLoading(false);
      throw new Error('User not found');
    }

    // In a real app, you would verify the password here
    // For demo purposes, we'll just assume it's correct

    // Create user data
    const userData: User = {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      avatar: 'https://github.com/shadcn.png',
    };

    // Save to state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoading(false);

    // Show welcome toast
    toast.success(`Welcome back, ${userData.firstName}!`, {
      description: 'You have successfully signed in.',
      className: 'bg-zinc-900 border-zinc-800 text-white',
    });
  };

  // Mock sign-up function
  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      setIsLoading(false);
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      firstName,
      lastName,
      email,
      password, // In a real app, this would be hashed
    };

    // Save user to "database" (localStorage)
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Create user data for session
    const userData: User = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    // Save to state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoading(false);

    // Show welcome toast
    toast.success(`Welcome, ${userData.firstName}!`, {
      description: 'You have successfully signed up.',
      className: 'bg-zinc-900 border-zinc-800 text-white',
    });
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');

    // Show sign out toast
    toast.success('You have successfully signed out.', {
      description: 'You have been signed out.',
      className: 'bg-zinc-900 border-zinc-800 text-white',
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
