import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const navigation = useNavigation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          // Reset the navigation stack so user can't go back to settings
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
        },
      },
    ]);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageModalVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    header: {
      paddingTop: 50,
      paddingBottom: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: '#fff',
      elevation: 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButton: {
      position: 'absolute',
      left: 20,
      top: 50,
      zIndex: 2,
    },
    headerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    logo: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginBottom: 2,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
      marginBottom: 10,
      marginTop: 20,
    },
    card: {
      backgroundColor: '#f9f9f9',
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
      borderBottomColor: '#ddd',
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
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
      marginBottom: 10,
    },
    modalButton: {
      backgroundColor: '#007AFF',
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

  const Section = ({ title, children }) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </>
  );

  const SettingItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#007AFF" style={styles.icon} />
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const SettingItemSwitch = ({ icon, label, value, onValueChange }) => (
    <View style={styles.item}>
      <Ionicons name={icon} size={24} color="#007AFF" style={styles.icon} />
      <Text style={styles.itemText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#767577", true: "#007AFF" }}
        thumbColor={value ? "#fff" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Image source={require('../assets/images/2.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Section title="Profile">
          <SettingItem icon="person-outline" label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
          <SettingItem icon="lock-closed-outline" label="Login Password" onPress={() => navigation.navigate('ChangePassword')} />
        </Section>

        <Section title="Preferences">
          <SettingItemSwitch icon="notifications-outline" label="Notifications" value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled} />
          <SettingItem icon="language-outline" label={`Language: ${language}`} onPress={() => setIsLanguageModalVisible(true)} />
        </Section>

        <Section title="Security">
          <SettingItem icon="keypad-outline" label="Payment Pin" onPress={() => navigation.navigate('PaymentPin')} />
          <SettingItem icon="shield-checkmark-outline" label="Two-Factor Authentication" onPress={() => navigation.navigate('TwoFactorAuthentication')} />
          <SettingItem icon="lock-open-outline" label="Privacy Settings" onPress={() => navigation.navigate('PrivacySettings')} />
        </Section>

        <Section title="About">
          <SettingItem icon="document-text-outline" label="Terms of Service" onPress={() => navigation.navigate('TermsOfService')} />
          <SettingItem icon="information-circle-outline" label="App Version 1.0.0" onPress={() => navigation.navigate('AppVersion')} />
        </Section>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

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
              style={{ width: '100%', color: '#000' }}
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
    </View>
  );
};

export default Settings;