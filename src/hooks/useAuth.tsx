
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error loading session:', error);
        toast({
          title: 'Authentication Error',
          description: 'Failed to load user session',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Initial session fetch
    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: 'Sign In Failed',
        description: error.message || 'Please check your credentials and try again',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Account Created',
        description: 'Check your email to confirm your account',
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'Failed to create an account',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: 'Signed Out',
        description: 'You have successfully signed out',
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
