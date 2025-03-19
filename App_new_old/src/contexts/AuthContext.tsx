import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { toast } from "@/hooks/use-toast";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDlUij1WPMKx1Sf5P2TYDAd-vbQ6iSHMw", // Replace with your actual Firebase API key
  authDomain: "student-platform-e5cab.firebaseapp.com", // Replace with your actual domain
  projectId: "student-platform-e5cab", // Replace with your actual project ID
  storageBucket: "student-platform-e5cab.firebasestorage.app", // Replace with your actual storage bucket
  messagingSenderId: "780617985030", // Replace with your actual messaging sender ID
  appId: "1:780617985030:web:f530a854f7f6e407dee787",
  measurementId: "G-P144T20T0E" // Replace with your actual app ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  emailPasswordLogin: (email: string, password: string) => Promise<void>;
  emailPasswordSignup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage or if Firebase has a session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Set up Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || undefined
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userData: User = {
        id: user.uid,
        name: user.displayName || 'Google User',
        email: user.email || 'google@example.com',
        photoURL: user.photoURL || undefined
      };
      
      // Save to database via API call
      try {
        const response = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save user to database');
        }
      } catch (error) {
        console.error('Error saving user to database:', error);
        // Continue anyway since authentication worked
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to the Student Platform!",
      });
      
      return;
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Login Failed",
        description: "There was an error logging in with Google. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const emailPasswordLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to the Student Platform!",
      });
      
      return;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const emailPasswordSignup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to the Student Platform!",
      });
      
      return;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      loginWithGoogle,
      emailPasswordLogin,
      emailPasswordSignup
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};