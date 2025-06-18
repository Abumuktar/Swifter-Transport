import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PaymentPin = () => {
  const router = useRouter();

  const handleForgotPin = () => {
    Alert.alert(
      'Reset PIN',
      'To reset your payment PIN, you will need to verify your identity with OTP.',
      [{ text: 'Proceed', onPress: () => router.push('/VerifyForgotPinOTP?context=reset-pin') }, { text: 'Cancel', style: 'cancel' }]
    );
  };

  const handleChangePin = () => {
    router.push('/ChangePin'); // Make sure you have this screen created
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="card-outline" size={48} color="#4facfe" style={styles.icon} />
        <Text style={styles.title}>Manage Payment PIN</Text>
        <Text style={styles.subtitle}>
          Secure your transactions with a 4-digit PIN. You can reset or change your PIN below.
        </Text>

        {/* Change PIN */}
        <TouchableOpacity style={styles.actionButton} onPress={handleChangePin}>
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Change PIN</Text>
        </TouchableOpacity>

        {/* Forgot PIN */}
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={handleForgotPin}>
          <Ionicons name="help-circle-outline" size={20} color="#4facfe" />
          <Text style={[styles.actionText, { color: '#4facfe' }]}>Forgot PIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4facfe',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4facfe',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#fff',
  },
});
