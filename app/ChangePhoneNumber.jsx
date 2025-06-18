import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ChangePhoneNumber = () => {
  const router = useRouter();
  const [newPhone, setNewPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); // Use global later

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const colors = {
    bg: isDarkMode ? '#1D3557' : '#F8F8F8',
    card: isDarkMode ? '#2B2D42' : '#FFFFFF',
    text: isDarkMode ? '#F1FAEE' : '#333',
    subtext: isDarkMode ? '#B0C4DE' : '#666',
    input: isDarkMode ? '#457B9D' : '#fff',
    primary: '#4facfe',
  };

  const handleSendCode = () => {
    if (!newPhone.trim()) {
      Alert.alert('Validation', 'Please enter a valid phone number.');
      return;
    }
    setCodeSent(true);
    setCooldown(60);
    Alert.alert('Code Sent', `A verification code has been sent to ${newPhone}`);
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      Alert.alert('Validation', 'Please enter the 6-digit verification code.');
      return;
    }
    Alert.alert('Success', 'Phone number updated successfully.');
    router.push('/AccountSecurity');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
      backgroundColor: colors.bg,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginLeft: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.input,
      borderRadius: 12,
      height: 50,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
      marginBottom: 20,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    disabled: {
      backgroundColor: '#ccc',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={colors.text} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Change Phone Number</Text>
      </View>

      <Text style={styles.label}>New Phone Number</Text>
      <TextInput
        placeholder="+234xxxxxxxxxx"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        style={styles.input}
        value={newPhone}
        onChangeText={setNewPhone}
      />

      <TouchableOpacity
        onPress={handleSendCode}
        disabled={cooldown > 0}
        style={[styles.button, cooldown > 0 && styles.disabled]}
      >
        <Text style={styles.buttonText}>
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Send Verification Code'}
        </Text>
      </TouchableOpacity>

      {codeSent && (
        <>
          <Text style={styles.label}>Enter Verification Code</Text>
          <TextInput
            placeholder="6-digit Code"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity onPress={handleVerify} style={styles.button}>
            <Text style={styles.buttonText}>Verify & Update</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default ChangePhoneNumber;
