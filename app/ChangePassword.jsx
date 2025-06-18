import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ChangePassword = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 digits');
      return;
    }

    // Simulate success
    Alert.alert('Success', 'Password changed successfully!');
    router.back();
  };

  // Limit password to 6 digits only
  const handlePasswordInput = (val, setter) => {
    // Only allow up to 6 digits, no letters
    if (/^\d{0,6}$/.test(val)) {
      setter(val);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back-outline" size={24} color="#4facfe" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Old Password */}
          <Text style={styles.label}>Old 6-digit Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter old password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              keyboardType="number-pad"
              value={oldPassword}
              maxLength={6}
              onChangeText={(val) => handlePasswordInput(val, setOldPassword)}
              autoComplete="off"
              textContentType="oneTimeCode"
            />
          </View>

          {/* New Password */}
          <Text style={styles.label}>New 6-digit Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-open-outline" size={20} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              keyboardType="number-pad"
              value={newPassword}
              maxLength={6}
              onChangeText={(val) => handlePasswordInput(val, setNewPassword)}
              autoComplete="off"
              textContentType="oneTimeCode"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm New 6-digit Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#4facfe" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              keyboardType="number-pad"
              value={confirmPassword}
              maxLength={6}
              onChangeText={(val) => handlePasswordInput(val, setConfirmPassword)}
              autoComplete="off"
              textContentType="oneTimeCode"
            />
          </View>

          {/* Password hint */}
          <Text style={styles.hintText}>
            Password must be exactly 6 digits. Only numbers are allowed.
          </Text>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Save New Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F8F8F8',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  backBtn: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D3557',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 8,
    marginTop: 20,
    letterSpacing: 0.1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#dfe6ed',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    letterSpacing: 4,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#4facfe',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  hintText: {
    color: '#7b8ca6',
    fontSize: 13,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
});