import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" options={{ title: 'Hoş Geldiniz' }} />
        <Stack.Screen name="login" options={{ title: 'Giriş Yap' }} />
        <Stack.Screen name="register" options={{ title: 'Kayıt Ol' }} />
        <Stack.Screen name="home" options={{ title: 'Ana Sayfa' }} />
        {/* Admin Dashboard sayfasını ekleyin */}
        <Stack.Screen name="admin-dashboard" options={{ title: 'Yönetici Paneli' }} />
        
      </Stack>
    </AuthProvider>
  );
}