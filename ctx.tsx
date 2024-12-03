import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './hooks/useStorageState';
import { Redirect } from 'expo-router';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
    signIn: async (_username: string, _password: string) => {
        return ; // Explicitly return nothing (void) for the default implementation
        },
  signOut: () => null,
  session: null,
  isLoading: false
});


export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}


export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URI}/auth/login`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      
      if(response.status !== 200) {
        const errorMessage = data?.message || 'Failed to log in';
        throw new Error(errorMessage)
      }

      console.log(data)
  
      if (data?.token) {
        setSession(data.token); // Store the token
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      throw error
    }
            
  }

  const signOut= () => {
    setSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
