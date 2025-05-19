// app/ForgotPassword.jsx

import React, { useState } from 'react';
import { View, TextInput, Alert, Text, StyleSheet, TouchableOpacity, ImageBackground, RadioButton } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Importing icons from react-native-vector-icons
import { useRouter } from 'expo-router';  // Using expo-router for navigation

const ForgotPassword = () => {
  const [method, setMethod] = useState('phone');  // Tracks whether phone or email is selected
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    if (method === 'phone' && !phoneNumber) {
      Alert.alert('Error', 'Please fill in your phone number');
      return;
    }

    if (method === 'email' && !email) {
      Alert.alert('Error', 'Please fill in your email address');
      return;
    }

    if (method === 'phone' && phoneNumber.length !== 11) {
      Alert.alert('Error', 'Phone number must be 11 digits');
      return;
    }

    // Logic for resetting password
    Alert.alert('Success', `A password reset link has been sent via ${method === 'phone' ? 'phone number' : 'email'}.`);

    // Optionally navigate back to the login page after resetting
    router.push('/Login');
  };

  return (
    <ImageBackground
      source={require('../assets/icon.png')}  // Background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Reset Your Password</Text>

        {/* Method Selection */}
        <View style={styles.methodSelection}>
          <Text style={styles.methodLabel}>Choose Reset Method:</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity onPress={() => setMethod('phone')} style={styles.radioOption}>
              <Text style={styles.radioText}>By Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMethod('email')} style={styles.radioOption}>
              <Text style={styles.radioText}>By Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phone number input field with an icon */}
        {method === 'phone' && (
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={24} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              maxLength={11}  // Restrict input to 11 digits
              placeholderTextColor="#ccc"
            />
          </View>
        )}

        {/* Email input field with an icon */}
        {method === 'email' && (
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={24} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#ccc"
            />
          </View>
        )}

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        {/* Back to Login Link */}
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to enhance contrast
    borderRadius: 15,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  methodSelection: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  methodLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  radioOption: {
    padding: 10,
    backgroundColor: '#4facfe',
    borderRadius: 25,
    marginHorizontal: 10,
  },
  radioText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4facfe',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  backToLogin: {
    fontSize: 16,
    color: '#4facfe',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
