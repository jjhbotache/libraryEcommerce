import { useState, useEffect } from 'react';
import { UserData } from '@/interfaces/userInterface';
import { apiUrl } from '@/constants/constants';
import { toast } from 'react-toastify';
import useCart from './useCart';

export default function  useUser (){
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });
  const {clearCart} = useCart();

  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: UserData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
    sessionStorage.setItem('user', JSON.stringify(userData));
    toast.success('Sesión iniciada');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    clearCart();

    toast.success('Sesión cerrada');
    setTimeout(() => { window.location.reload() }, 1000)
  };

  interface LoginResponse {
    message: string,
    success: boolean,
    data: UserData,
    errors: string[]
  }
  const performLogin = async ( userName: string, password: string ) => new Promise<boolean>((resolve, reject) => {
    fetch(apiUrl + '/user/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    })
      .then(response => response.json() as Promise<LoginResponse>)
      .then(data => {
        if (data.success) {
          login(data.data);
          resolve(data.success);
        } else {
          reject(data.success);
        }
      })
  });
  
  interface RegisterResponse {
    message: string;
    success: boolean;
    data?: {
      id: number;
      name: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
      enabled: boolean;
      authorities: {
        authority: string;
      }[];
      accountNonExpired: boolean;
      accountNonLocked: boolean;
      credentialsNonExpired: boolean;
    };
    errors: string[] | null;
  }
  const performRegister = async (userData: {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/user/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data: RegisterResponse = await response.json();

      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message || 'Error en el registro');
        return false;
      }
    } catch {
      toast.error('Error en el registro');
      return false;
    }
  };

  useEffect(() => {
    const savedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    const savedUser = sessionStorage.getItem('user');
    if (savedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(savedIsLoggedIn));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return {
    isLoggedIn,
    user,
    login,
    logout,
    performLogin,
    performRegister
  };
};
