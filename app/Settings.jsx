import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => router.push('/Login') },
    ]);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <Section title="Profile">
        <SettingItem icon="person-outline" label="Edit Profile" onPress={() => router.push('/EditProfile')} />
        <SettingItem icon="lock-closed-outline" label="Change Password" onPress={() => router.push('/ChangePassword')} />
      </Section>

      {/* Preferences Section */}
      <Section title="Preferences">
        <SettingItemSwitch
          icon="moon-outline"
          label="Dark Mode"
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
        <SettingItemSwitch
          icon="notifications-outline"
          label="Notifications"
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
        />
        <SettingItem
          icon="language-outline"
          label={`Language: ${language}`}
          onPress={() => setIsLanguageModalVisible(true)}
        />
      </Section>

      {/* Security Section */}
      <Section title="Security">
        <SettingItem icon="shield-checkmark-outline" label="Two-Factor Authentication" onPress={() => router.push('/TwoFactorAuthentication')} />
        <SettingItem icon="lock-open-outline" label="Privacy Settings" onPress={() => router.push('/PrivacySettings')} />
      </Section>

      {/* About Section */}
      <Section title="About">
        <SettingItem icon="document-text-outline" label="Terms of Service" onPress={() => router.push('/TermsOfService')} />
        <SettingItem icon="information-circle-outline" label="App Version 1.0.0" onPress={() => router.push('/AppVersion')} />
      </Section>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <Picker
              selectedValue={language}
              onValueChange={handleLanguageChange}
              style={{ width: '100%' }}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="German" value="German" />
            </Picker>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsLanguageModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const Section = ({ title, children }) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </>
);

const SettingItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#4facfe" style={styles.icon} />
    <Text style={styles.itemText}>{label}</Text>
    <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
  </TouchableOpacity>
);

const SettingItemSwitch = ({ icon, label, value, onValueChange }) => (
  <View style={styles.item}>
    <Ionicons name={icon} size={24} color="#4facfe" style={styles.icon} />
    <Text style={styles.itemText}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    marginTop: 30,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#4facfe',
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
