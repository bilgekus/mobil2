import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  useEffect(() => {
    // Uygulama başlangıcında token kontrolü yap ve yönlendir
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        
        if (userToken) {
          // Token varsa, home sayfasına yönlendir
          router.replace('/(auth)/home');
        } else {
          // Token yoksa, welcome sayfasına yönlendir
          router.replace('/(auth)/welcome');
        }
      } catch (error) {
        console.log('Token kontrolü hatası:', error);
        router.replace('/(auth)/welcome');
      }
    };
    
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#6c63ff" />
    </View>
  );
}