import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Login fonksiyonu
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    
    try {
      // Gerçek API isteği için hazır
      // Şimdilik test kullanıcısı ile çalışıyor
      if (email === 'test@gmail.com' && password === 'test1234') {
        const userData = { 
          email, 
          token: 'sample_token_123', 
          name: 'Test Kullanıcı' 
        };

        // Token ve kullanıcı bilgilerini kaydetme
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

        setUserToken(userData.token);
        setUserInfo(userData);

        // Login başarılı olduktan sonra home sayfasına yönlendir
        router.replace('/(auth)/home');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.log('Login error', error);
      alert('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Kayıt fonksiyonu
  const register = useCallback(async (name, email, password) => {
    setIsLoading(true);
    
    try {
      // Gerçek API isteği için hazır
      const userData = { 
        email, 
        token: 'sample_token_123', 
        name 
      };

      // Token ve kullanıcı bilgilerini kaydetme
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

      setUserToken(userData.token);
      setUserInfo(userData);

      // Kayıt başarılı olduktan sonra home sayfasına yönlendir
      router.replace('/(auth)/home');
    } catch (error) {
      console.log('Register error', error);
      alert('Kayıt yapılamadı. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Çıkış fonksiyonu
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      setUserToken(null);
      setUserInfo(null);

      // Çıkış yapıldıktan sonra welcome sayfasına yönlendir
      router.replace('/(auth)/welcome');
    } catch (error) {
      console.log('Logout error', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Uygulama başlangıcında token kontrolü
  const isLoggedIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const userInfo = await AsyncStorage.getItem('userInfo');

      if (userInfo) {
        setUserInfo(JSON.parse(userInfo));
      }

      if (userToken) {
        setUserToken(userToken);
        // Eğer token varsa otomatik olarak home sayfasına yönlendir
        router.replace('/(auth)/home');
      }
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  // context value'yu memoize ediyoruz ki her render'da değişmesin
  const authContextValue = useMemo(() => ({
    login,
    logout,
    register,
    isLoading,
    userToken,
    userInfo,
  }), [login, logout, register, isLoading, userToken, userInfo]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validasyonu ekliyoruz
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};