import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { router } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useContext(AuthContext);

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Uyarı', 'Lütfen email ve şifrenizi girin');
      return;
    }
    login(email, password);
  };

  const handleQuickLogin = (type) => {
    if (type === 'admin') {
      login('admin@gmail.com', 'admin1234');
    } else {
      login('user@gmail.com', 'user1234');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Giriş Yap</Text>
        
        {/* E-mail Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#6c63ff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            editable={true}
          />
        </View>
        
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#6c63ff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={true}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons 
              name={showPassword ? 'visibility' : 'visibility-off'} 
              size={24} 
              color="#6c63ff" 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>
        
        {/* Hızlı Giriş Butonları */}
        <View style={styles.quickLoginContainer}>
          <Text style={styles.quickLoginTitle}>Hızlı Giriş:</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.quickButton, styles.adminButton]} 
              onPress={() => handleQuickLogin('admin')}
            >
              <MaterialIcons name="admin-panel-settings" size={20} color="white" />
              <Text style={styles.quickButtonText}>Admin</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickButton, styles.userButton]}
              onPress={() => handleQuickLogin('user')}
            >
              <MaterialIcons name="person" size={20} color="white" />
              <Text style={styles.quickButtonText}>Kullanıcı</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.credentialsBox}>
          <Text style={styles.credentialsTitle}>Test Bilgileri</Text>
          <Text style={styles.credentialsText}>Admin: admin@gmail.com / admin1234</Text>
          <Text style={styles.credentialsText}>Kullanıcı: user@gmail.com / user1234</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#6c63ff',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickLoginContainer: {
    width: '100%',
    marginTop: 30,
  },
  quickLoginTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 45,
    borderRadius: 10,
  },
  adminButton: {
    backgroundColor: '#FF5722',
  },
  userButton: {
    backgroundColor: '#2196F3',
  },
  quickButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#6c63ff',
    fontWeight: 'bold',
  },
  credentialsBox: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
  },
  credentialsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  credentialsText: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default LoginScreen;