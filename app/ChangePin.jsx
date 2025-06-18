import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ChangePin = () => {
  const router = useRouter();

  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(60);

  // Simulated current PIN (in production, fetch from secure storage or backend)
  const currentPin = '1234';

  useEffect(() => {
    let timer;
    if (isLocked && lockCountdown > 0) {
      timer = setInterval(() => {
        setLockCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsLocked(false);
            setFailedAttempts(0);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked]);

  const handleSave = () => {
    if (isLocked) {
      return;
    }

    if (!oldPin || !newPin || !confirmPin) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (oldPin !== currentPin) {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= 3) {
        setIsLocked(true);
        Alert.alert('Too many attempts', 'Try again after 60 seconds.');
      } else {
        Alert.alert('Incorrect PIN', `You have ${3 - attempts} attempt(s) left`);
      }
      return;
    }

    if (newPin.length !== 4 || isNaN(newPin)) {
      Alert.alert('Error', 'New PIN must be exactly 4 digits');
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert('Mismatch', 'New PINs do not match');
      return;
    }

    // Save new PIN logic goes here
    Alert.alert('Success', 'Your payment PIN has been changed successfully');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Change Payment PIN</Text>
        <Text style={styles.subtitle}>
          For security, please enter your old PIN and then your new PIN.
        </Text>

        {/* Old PIN */}
        <View style={styles.inputWrapper}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Old PIN"
            keyboardType="number-pad"
            secureTextEntry={!showPin}
            maxLength={4}
            value={oldPin}
            onChangeText={setOldPin}
            editable={!isLocked}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* New PIN */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="New PIN"
            keyboardType="number-pad"
            secureTextEntry={!showPin}
            maxLength={4}
            value={newPin}
            onChangeText={setNewPin}
            editable={!isLocked}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setShowPin(!showPin)}>
            <Ionicons
              name={showPin ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm PIN */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Confirm New PIN"
            keyboardType="number-pad"
            secureTextEntry={!showPin}
            maxLength={4}
            value={confirmPin}
            onChangeText={setConfirmPin}
            editable={!isLocked}
            placeholderTextColor="#aaa"
          />
        </View>

        {isLocked && (
          <Text style={styles.lockNotice}>
            You are temporarily locked out. Try again in {lockCountdown}s.
          </Text>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, isLocked && styles.disabledButton]}
          onPress={handleSave}
          disabled={isLocked}
        >
          <Text style={styles.saveButtonText}>Update PIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Cancel & Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePin;

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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
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
  disabledButton: {
    backgroundColor: '#ccc',
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
  lockNotice: {
    textAlign: 'center',
    color: '#e63946',
    marginTop: 8,
    fontWeight: '600',
  },
});
