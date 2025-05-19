// app/app-version.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const AppVersionScreen = () => {
  // Fallback if Constants.manifest is undefined
  const version = Constants.expoConfig?.version || '1.0.0';
  const buildNumber = Constants.expoConfig?.runtimeVersion || '1';

  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={64} color="#4facfe" style={styles.icon} />
      <Text style={styles.title}>App Info</Text>
      <Text style={styles.label}>Version:</Text>
      <Text style={styles.value}>{version}</Text>
      <Text style={styles.label}>Build Number:</Text>
      <Text style={styles.value}>{buildNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4facfe',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AppVersionScreen;
