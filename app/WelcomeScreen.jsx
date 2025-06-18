import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Swifter Brand Colors
const COLORS = {
  primary: '#4facfe',
  secondary: '#1D3557',
  accent: '#457B9D',
  light: '#F1FAEE',
  background: '#F8F8F8',
};

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* Brand Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="bus" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.brandName}>Swifter</Text>
      </View>

      {/* Welcome Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>Welcome to Swifter</Text>
        <Text style={styles.subtitle}>
          Nigeria’s smartest way to book safe, reliable rides and manage your journeys with ease.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonBlock}>
        <TouchableOpacity
          style={styles.getStartedButton}
          activeOpacity={0.92}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
          <Ionicons name="chevron-forward" size={22} color={COLORS.light} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.82}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Tagline */}
      <View style={styles.taglineBlock}>
        <Text style={styles.tagline}>Experience travel. The Swifter way.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 58,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  brandName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.secondary,
    letterSpacing: 1.2,
  },
  content: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 9,
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 16.5,
    color: COLORS.accent,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    maxWidth: 340,
  },
  buttonBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: 38,
    marginBottom: 10,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    paddingVertical: 15,
    paddingHorizontal: 32,
    width: '100%',
    marginBottom: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 3,
  },
  getStartedText: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    marginRight: 7,
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 16,
  },
  loginText: {
    color: COLORS.secondary,
    fontSize: 15.2,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
    opacity: 0.88,
  },
  taglineBlock: {
    marginTop: 18,
  },
  tagline: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.6,
    opacity: 0.78,
    textAlign: 'center',
  },
});

export default WelcomeScreen;