// app/2FASetup.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TwoFASetup = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = () => {
    if (!phoneNumber) return;
    setCodeSent(true);
    // Here you would trigger backend API to send verification code
  };

  const handleVerifyCode = () => {
    if (!verificationCode) return;
    // Here you would trigger backend verification logic
    alert('2FA Enabled Successfully!');
    router.push('/AccountSecurity');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#333" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Setup 2FA</Text>
      </View>

      {/* Info */}
      <Text style={styles.info}>
        Secure your account by enabling Two-Factor Authentication (2FA). You’ll receive a code via SMS whenever you sign in.
      </Text>

      {/* Step 1: Enter Phone Number */}
      <Text style={styles.stepTitle}>1. Enter your Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#ccc"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>

      {/* Step 2: Enter Verification Code */}
      {codeSent && (
        <>
          <Text style={styles.stepTitle}>2. Enter the Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            placeholderTextColor="#ccc"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verify & Activate 2FA</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    lineHeight: 22,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TwoFASetup;
