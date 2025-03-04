import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Login fonksiyonu - kullanıcı rolüne göre farklı sayfalara yönlendirme
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    
    try {
      // Admin kullanıcısı için giriş kontrolü
      if (email === 'admin@gmail.com' && password === 'admin1234') {
        const userData = { 
          email, 
          token: 'admin_token_123', 
          name: 'Admin Kullanıcı',
          role: 'admin' // Admin rolü
        };

        // Token ve kullanıcı bilgilerini kaydetme
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

        setUserToken(userData.token);
        setUserInfo(userData);

        // Admin için admin-dashboard sayfasına yönlendir
        router.replace('/(auth)/admin-dashboard');
      } 
      // Normal kullanıcı için giriş kontrolü
      else if (email === 'user@gmail.com' && password === 'user1234') {
        const userData = { 
          email, 
          token: 'user_token_123', 
          name: 'Normal Kullanıcı',
          role: 'user' // Normal kullanıcı rolü
        };

        // Token ve kullanıcı bilgilerini kaydetme
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

        setUserToken(userData.token);
        setUserInfo(userData);

        // Normal kullanıcı için home sayfasına yönlendir
        router.replace('/(auth)/home');
      } 
      // Eski test kullanıcısı da çalışmaya devam etsin
      else if (email === 'test@gmail.com' && password === 'test1234') {
        const userData = { 
          email, 
          token: 'sample_token_123', 
          name: 'Test Kullanıcı',
          role: 'user'
        };

        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

        setUserToken(userData.token);
        setUserInfo(userData);

        router.replace('/(auth)/home');
      }
      else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.log('Login error', error);
      alert('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Kayıt fonksiyonu - varsayılan olarak normal kullanıcı rolüyle kayıt
  const register = useCallback(async (name, email, password) => {
    setIsLoading(true);
    
    try {
      // Gerçek API isteği için hazır
      const userData = { 
        email, 
        token: 'user_token_' + Math.random().toString(36).substring(7), 
        name,
        role: 'user' // Yeni kayıtlar normal kullanıcı olarak oluşturulur
      };

      // Token ve kullanıcı bilgilerini kaydetme
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

      setUserToken(userData.token);
      setUserInfo(userData);

      // Kayıt başarılı olduktan sonra normal kullanıcı sayfasına yönlendir
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

  // Uygulama başlangıcında token kontrolü ve kullanıcı rolüne göre yönlendirme
  const isLoggedIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const userInfoStr = await AsyncStorage.getItem('userInfo');

      if (userInfoStr) {
        const userInfoData = JSON.parse(userInfoStr);
        setUserInfo(userInfoData);

        if (userToken) {
          setUserToken(userToken);
          
          // Kullanıcı rolüne göre doğru sayfaya yönlendirme
          if (userInfoData.role === 'admin') {
            router.replace('/(auth)/admin-dashboard');
          } else {
            router.replace('/(auth)/home');
          }
        }
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

// PropTypes validasyonu
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};