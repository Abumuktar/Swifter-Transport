import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (phoneNumber.length !== 11) {
      Alert.alert('Error', 'Phone number must be 11 digits');
      return;
    }

    if (password.length !== 6) {
      Alert.alert('Error', 'Password must be 6 digits');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      router.push('/Dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.wrapper}>
      {/* Logo outside the card */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/images/1.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome Back!</Text>

        {/* Phone Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={22} color="#4facfe" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
            maxLength={11}
            placeholderTextColor="#aaa"
            selectionColor="#4facfe"
            returnKeyType="next"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={22} color="#4facfe" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="number-pad"
            maxLength={6}
            placeholderTextColor="#aaa"
            selectionColor="#4facfe"
            returnKeyType="done"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.disabledButton,
          ]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/Signup')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  logoCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4facfe',
    shadowColor: '#4facfe',
    shadowOpacity: 0.13,
    shadowRadius: 9,
    elevation: 7,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  heading: {
    fontSize: 26,
    color: '#1D3557',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 16,
    paddingHorizontal: 18,
    height: 50,
    borderWidth: 1.2,
    borderColor: '#e5e5e5',
    shadowColor: '#4facfe',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginRight: 13,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1D3557',
    fontWeight: '500',
    letterSpacing: 0.4,
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  button: {
    height: 50,
    backgroundColor: '#4facfe',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    elevation: 7,
    shadowColor: '#4facfe',
    shadowOpacity: 0.17,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 7 },
    flexDirection: 'row',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#457B9D',
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4facfe',
    marginLeft: 6,
  },
});

export default Login;