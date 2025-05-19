// app/terms-of-service.jsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TermsOfServiceScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="document-text-outline" size={64} color="#4facfe" style={styles.icon} />
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.paragraph}>
        Welcome to ISMEED. By using this app, you agree to the following:
      </Text>
      <Text style={styles.listItem}>• Do not misuse our services.</Text>
      <Text style={styles.listItem}>• Respect privacy and security policies.</Text>
      <Text style={styles.listItem}>• You consent to our data handling practices.</Text>
      <Text style={styles.paragraph}>
        These terms are subject to updates. Please check back regularly.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4facfe',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    marginBottom: 12,
    width: '100%',
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    width: '100%',
  },
});

export default TermsOfServiceScreen;
