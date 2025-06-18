import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

let SmsRetriever;
if (Platform.OS === 'android') {
  try {
    SmsRetriever = require('react-native-sms-retriever');
  } catch (e) {
    console.warn('SMS Retriever is unavailable on Expo Go.');
  }
}

const VerifyForgotPinOTP = () => {
  const router = useRouter();
  const { method = 'phone', contact = '' } = useLocalSearchParams();

  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    startCountdown();
    if (Platform.OS === 'android' && SmsRetriever) {
      startSmsListener();
    }
  }, []);

  const startCountdown = () => {
    setCanResend(false);
    let counter = 60;
    setResendTimer(counter);
    const timer = setInterval(() => {
      counter -= 1;
      setResendTimer(counter);
      if (counter <= 0) {
        clearInterval(timer);
        setCanResend(true);
      }
    }, 1000);
  };

  const startSmsListener = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          const match = event.message.match(/\b\d{6}\b/);
          if (match) setOtp(match[0]);
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.log('SMS listener error:', error);
    }
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'OTP must be 6 digits');
      return;
    }

    // Simulate success
    Alert.alert('Verified', 'OTP verified successfully!', [
      {
        text: 'Continue',
        onPress: () => router.push('/ResetPaymentPin'),
      },
    ]);
  };

  const handleResend = () => {
    Alert.alert('OTP Resent', `A new OTP has been sent to your ${method}`);
    startCountdown();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to your {method}:{" "}
          <Text style={styles.contact}>{contact}</Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="keypad-outline" size={22} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Resend */}
        <TouchableOpacity onPress={handleResend} disabled={!canResend}>
          <Text style={[styles.resendText, !canResend && styles.disabled]}>
            {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Cancel & Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyForgotPinOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  contact: {
    fontWeight: '600',
    color: '#1D3557',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  resendText: {
    color: '#4facfe',
    textAlign: 'right',
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 14,
  },
  disabled: {
    color: '#999',
  },
  button: {
    backgroundColor: '#4facfe',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backLink: {
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
