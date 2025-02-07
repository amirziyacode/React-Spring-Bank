import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import axios from 'axios';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuthState({
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
            //Encode The Data !!!
        const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
        const respone =  await axios.post("http://localhost:8080/auth/login",{
          username,
          password
        });
        if(respone.status === 200){
          const getUser =  await axios.get("http://localhost:8080/auth/user",{
            headers: {
              'Authorization': authHeader
            },
              params:{
                userName:username
              }
            });
          const mockUser: User = {
            id: getUser.data.id,
            username: getUser.data.username,
            accountNumber:getUser.data.accountNumber,
            balance: getUser.data.amount,
            password:password
          };
          localStorage.setItem('user', JSON.stringify(mockUser));
          setAuthState({
            user: mockUser,
            isAuthenticated: true,
          });
        }

  };

  const register = async (username: string, password: string, firstName: string, lastName: string) => {
    const mockUser: User = {
      id: '1',
      username:"",
      accountNumber:"",
      balance: 0,
      password:""
    };
    // not need for this App 
    localStorage.setItem('user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
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