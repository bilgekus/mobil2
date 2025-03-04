import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';


const AdminDashboardScreen = () => {
  const { logout, userInfo } = useContext(AuthContext);
  
  // Kullanıcı yönetimi state'leri
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'user', status: 'Aktif' },
    { id: 2, name: 'Bilge Kuş', email: 'bilge@example.com', role: 'user', status: 'Aktif' },
    { id: 3, name: 'Ayşe Kaya', email: 'ayse@example.com', role: 'user', status: 'Pasif' },
  ]);
  
  // Yeni kullanıcı ekleme state'leri
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  
  // Yeni kullanıcı ekleme fonksiyonu
  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Aktif'
    };
    
    setUsers([...users, newUser]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
    setShowAddUserForm(false);
    
    Alert.alert('Başarılı', 'Yeni kullanıcı başarıyla eklendi.');
  };
  
  // Kullanıcı silme fonksiyonu
  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Kullanıcı Sil',
      'Bu kullanıcıyı silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: () => {
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            Alert.alert('Başarılı', 'Kullanıcı başarıyla silindi.');
          }
        }
      ]
    );
  };
  
  // Kullanıcı durumunu değiştirme fonksiyonu
  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Aktif' ? 'Pasif' : 'Aktif'
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dekoratif daireler */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />
      
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Merhaba, {userInfo?.name || 'Admin'}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <MaterialIcons name="logout" size={24} color="#FF5722" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.adminBanner}>
          <MaterialIcons name="admin-panel-settings" size={40} color="white" />
          <Text style={styles.adminBannerTitle}>Admin Paneli</Text>
          <Text style={styles.adminBannerSubtitle}>Tüm yönetici fonksiyonlarına erişebilirsiniz</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Genel İstatistikler</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#FF5722' }]}>
                <MaterialIcons name="people" size={24} color="white" />
              </View>
              <Text style={styles.statNumber}>{users.length}</Text>
              <Text style={styles.statLabel}>Toplam Kullanıcı</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#4CAF50' }]}>
                <MaterialIcons name="check-circle" size={24} color="white" />
              </View>
              <Text style={styles.statNumber}>
                {users.filter(user => user.status === 'Aktif').length}
              </Text>
              <Text style={styles.statLabel}>Aktif Kullanıcı</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#2196F3' }]}>
                <MaterialIcons name="shopping-cart" size={24} color="white" />
              </View>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Siparişler</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: '#9C27B0' }]}>
                <MaterialIcons name="attach-money" size={24} color="white" />
              </View>
              <Text style={styles.statNumber}>12,460₺</Text>
              <Text style={styles.statLabel}>Gelir</Text>
            </View>
          </View>
        </View>
        
        {/* Kullanıcı Yönetimi Bölümü */}
        <View style={styles.usersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kullanıcı Yönetimi</Text>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddUserForm(!showAddUserForm)}
            >
              <MaterialIcons name={showAddUserForm ? "remove" : "add"} size={24} color="white" />
              <Text style={styles.addButtonText}>
                {showAddUserForm ? "İptal" : "Kullanıcı Ekle"}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Kullanıcı Ekleme Formu */}
          {showAddUserForm && (
            <View style={styles.addUserForm}>
              <TextInput
                style={styles.formInput}
                placeholder="Ad Soyad"
                value={newUserName}
                onChangeText={setNewUserName}
              />
              
              <TextInput
                style={styles.formInput}
                placeholder="E-posta"
                keyboardType="email-address"
                value={newUserEmail}
                onChangeText={setNewUserEmail}
              />
              
              <View style={styles.roleSelector}>
                <Text style={styles.roleSelectorLabel}>Rol:</Text>
                
                <TouchableOpacity 
                  style={[
                    styles.roleButton, 
                    newUserRole === 'user' && styles.roleButtonActive
                  ]}
                  onPress={() => setNewUserRole('user')}
                >
                  <Text style={[
                    styles.roleButtonText,
                    newUserRole === 'user' && styles.roleButtonTextActive
                  ]}>Kullanıcı</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.roleButton, 
                    newUserRole === 'admin' && styles.roleButtonActive
                  ]}
                  onPress={() => setNewUserRole('admin')}
                >
                  <Text style={[
                    styles.roleButtonText,
                    newUserRole === 'admin' && styles.roleButtonTextActive
                  ]}>Admin</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleAddUser}
              >
                <Text style={styles.submitButtonText}>Kullanıcı Ekle</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Kullanıcı Listesi */}
          <View style={styles.usersList}>
            {users.map(user => (
              <View key={user.id} style={styles.userItem}>
                <View style={styles.userInfo}>
                  <View style={styles.userIconContainer}>
                    <MaterialIcons 
                      name={user.role === 'admin' ? "admin-panel-settings" : "person"} 
                      size={24} 
                      color="white" 
                    />
                  </View>
                  
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View style={styles.userMeta}>
                      <Text style={[
                        styles.userStatus,
                        user.status === 'Aktif' ? styles.statusActive : styles.statusInactive
                      ]}>
                        {user.status}
                      </Text>
                      <Text style={styles.userRole}>
                        {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.userActions}>
                  <TouchableOpacity 
                    style={[styles.userActionButton, styles.statusButton]}
                    onPress={() => toggleUserStatus(user.id)}
                  >
                    <MaterialIcons 
                      name={user.status === 'Aktif' ? "block" : "check-circle"} 
                      size={22} 
                      color={user.status === 'Aktif' ? "#FF5722" : "#4CAF50"} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.userActionButton, styles.deleteButton]}
                    onPress={() => handleDeleteUser(user.id)}
                  >
                    <MaterialIcons name="delete" size={22} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Diğer Yönetim Araçları */}
        <View style={styles.managementContainer}>
          <Text style={styles.sectionTitle}>Yönetim Araçları</Text>
          
          <TouchableOpacity style={styles.managementItem}>
            <View style={[styles.managementIcon, { backgroundColor: '#673AB7' }]}>
              <MaterialIcons name="inventory" size={24} color="white" />
            </View>
            <View style={styles.managementTextContainer}>
              <Text style={styles.managementTitle}>Ürün Yönetimi</Text>
              <Text style={styles.managementSubtitle}>Ürünleri ekle, düzenle ve sil</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.managementItem}>
            <View style={[styles.managementIcon, { backgroundColor: '#03A9F4' }]}>
              <MaterialIcons name="analytics" size={24} color="white" />
            </View>
            <View style={styles.managementTextContainer}>
              <Text style={styles.managementTitle}>Rapor ve İstatistikler</Text>
              <Text style={styles.managementSubtitle}>Detaylı analizleri görüntüle</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.managementItem}>
            <View style={[styles.managementIcon, { backgroundColor: '#009688' }]}>
              <MaterialIcons name="settings" size={24} color="white" />
            </View>
            <View style={styles.managementTextContainer}>
              <Text style={styles.managementTitle}>Sistem Ayarları</Text>
              <Text style={styles.managementSubtitle}>Uygulama ayarlarını yapılandır</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 10,
    zIndex: 1,
    marginBottom: 20,
  },
  topCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FF5722',
    opacity: 0.3,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#FF9800',
    opacity: 0.2,
  },
  adminBanner: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adminBannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  adminBannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  
  // Kullanıcı Yönetimi Stilleri
  usersContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  
  // Kullanıcı Ekleme Formu
  addUserForm: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  formInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  roleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleSelectorLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  roleButtonActive: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  roleButtonText: {
    color: '#666',
  },
  roleButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Kullanıcı Listesi
  usersList: {
    marginTop: 5,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userMeta: {
    flexDirection: 'row',
    marginTop: 4,
  },
  userStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    color: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    color: '#F44336',
  },
  userRole: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  userActions: {
    flexDirection: 'row',
  },
  userActionButton: {
    padding: 8,
    marginLeft: 8,
  },
  
  // Diğer Yönetim Araçları
  managementContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  managementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  managementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  managementTextContainer: {
    flex: 1,
  },
  managementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  managementSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default AdminDashboardScreen;