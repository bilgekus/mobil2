import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { logout, userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Dekoratif daireler */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />
      
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Merhaba, {userInfo?.name || 'Kullanıcı'}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <MaterialIcons name="logout" size={24} color="#6c63ff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
          <Text style={styles.successText}>Başarıyla Giriş Yaptınız!</Text>
          <Text style={styles.successSubtext}>Artık uygulamayı kullanabilirsiniz.</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Özellikler</Text>
          
          <View style={styles.featureItemsContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#FFC107' }]}>
                <MaterialIcons name="dashboard" size={24} color="white" />
              </View>
              <Text style={styles.featureText}>Dashboard</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#2196F3' }]}>
                <MaterialIcons name="people" size={24} color="white" />
              </View>
              <Text style={styles.featureText}>Profil</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#E91E63' }]}>
                <MaterialIcons name="notifications" size={24} color="white" />
              </View>
              <Text style={styles.featureText}>Bildirimler</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#9C27B0' }]}>
                <MaterialIcons name="settings" size={24} color="white" />
              </View>
              <Text style={styles.featureText}>Ayarlar</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 1,
  },
  topCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#6c63ff',
    opacity: 0.3,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#4CAF50',
    opacity: 0.2,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  successSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  featureItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default HomeScreen;