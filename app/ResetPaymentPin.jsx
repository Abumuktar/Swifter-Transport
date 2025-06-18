import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';

const ResetPaymentPin = () => {
  const router = useRouter();

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSave = () => {
    if (!pin || !confirmPin) {
      Alert.alert('Missing Info', 'Please enter and confirm your new PIN.');
      return;
    }

    if (pin.length !== 4 || isNaN(pin)) {
      Alert.alert('Invalid PIN', 'PIN must be exactly 4 digits.');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Mismatch', 'PINs do not match.');
      return;
    }

    // Simulate success
    Alert.alert('Success', 'Your payment PIN has been reset successfully.', [
      { text: 'OK', onPress: () => router.replace('/Settings') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reset Payment PIN</Text>
        <Text style={styles.subtitle}>Enter your new 4-digit payment PIN below.</Text>

        {/* New PIN */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="New PIN"
            keyboardType="number-pad"
            secureTextEntry={!showPin}
            maxLength={4}
            value={pin}
            onChangeText={setPin}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setShowPin(!showPin)}>
            <Ionicons name={showPin ? 'eye-off-outline' : 'eye-outline'} size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Confirm PIN */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Confirm PIN"
            keyboardType="number-pad"
            secureTextEntry={!showPin}
            maxLength={4}
            value={confirmPin}
            onChangeText={setConfirmPin}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save PIN</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Cancel & Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPaymentPin;

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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
