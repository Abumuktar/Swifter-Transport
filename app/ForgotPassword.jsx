// app/ForgotPassword.jsx

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
  const [method, setMethod] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
  if (method === 'phone' && !phoneNumber) {
    Alert.alert('Error', 'Please enter your phone number');
    return;
  }

  if (method === 'email' && !email) {
    Alert.alert('Error', 'Please enter your email address');
    return;
  }

  if (method === 'phone' && phoneNumber.length !== 11) {
    Alert.alert('Error', 'Phone number must be 11 digits');
    return;
  }

  // Simulate sending OTP
  Alert.alert(
    'OTP Sent',
    `An OTP has been sent to your ${method === 'phone' ? 'phone number' : 'email'} for verification.`,
    [
      {
        text: 'Proceed',
        onPress: () => {
          router.push({
            pathname: '/VerifyOTP',
            params: {
              method,
              contact: method === 'phone' ? phoneNumber : email,
            },
          });
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Reset Your Password</Text>

        {/* Method Switch */}
        <View style={styles.methodSwitch}>
          <Text style={styles.label}>Choose Reset Method:</Text>
          <View style={styles.methodOptions}>
            <TouchableOpacity
              style={[styles.methodButton, method === 'phone' && styles.activeButton]}
              onPress={() => setMethod('phone')}
            >
              <Text style={method === 'phone' ? styles.activeText : styles.methodText}>
                By Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodButton, method === 'email' && styles.activeButton]}
              onPress={() => setMethod('email')}
            >
              <Text style={method === 'email' ? styles.activeText : styles.methodText}>
                By Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input */}
        {method === 'phone' && (
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={22} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              maxLength={11}
              placeholderTextColor="#ccc"
            />
          </View>
        )}

        {method === 'email' && (
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={22} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />
          </View>
        )}

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        {/* Back Link */}
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1D3557',
    marginBottom: 8,
    textAlign: 'center',
  },
  methodSwitch: {
    marginBottom: 20,
  },
  methodOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  methodButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#eaf4ff',
  },
  activeButton: {
    backgroundColor: '#4facfe',
  },
  methodText: {
    color: '#457B9D',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
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
    backgroundColor: '#4facfe',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#F1FAEE',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 18,
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
