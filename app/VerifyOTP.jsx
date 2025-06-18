import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

let SmsRetriever;
if (Platform.OS === 'android') {
  try {
    SmsRetriever = require('react-native-sms-retriever');
  } catch (e) {
    console.warn('SMS Retriever not available in Expo Go.');
  }
}

const VerifyOTP = () => {
  const { method, contact } = useLocalSearchParams();
  const router = useRouter();

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
    } catch (err) {
      console.log('SMS Listener Error:', err);
    }
  };

  const handleResend = () => {
    Alert.alert('OTP Sent', `A new OTP has been sent to your ${method}.`);
    startCountdown();
  };

  const handleVerify = () => {
    if (otp.length !== 6 || isNaN(otp)) {
      Alert.alert('Invalid OTP', 'OTP must be a 6-digit number.');
      return;
    }

    // Simulate OTP verification success
    router.push('/SetNewPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your {method === 'phone' ? 'phone' : 'email'}:{" "}
          <Text style={styles.contact}>{contact}</Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="keypad-outline" size={22} color="#4facfe" style={styles.icon} />
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

        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResend} disabled={!canResend}>
          <Text style={[styles.resendText, !canResend && styles.disabledResend]}>
            {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={styles.backLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  contact: {
    color: '#4facfe',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dfe6ed',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resendText: {
    textAlign: 'right',
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 20,
  },
  disabledResend: {
    color: '#aaa',
  },
  button: {
    backgroundColor: '#4facfe',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24,
    textDecorationLine: 'underline',
  },
});
