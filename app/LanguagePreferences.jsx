// app/LanguagePreferences.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LanguagePreferences = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'es', label: 'Spanish' },
    { code: 'de', label: 'German' },
    { code: 'it', label: 'Italian' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ar', label: 'Arabic' },
  ];

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    // Here, you can add logic to change the language globally using a library like react-i18next
    alert(`Language changed to ${language}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#333" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Language Preferences</Text>
      </View>

      {/* Description */}
      <Text style={styles.info}>Choose your preferred language for the app.</Text>

      {/* Language List */}
      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem,
              selectedLanguage === language.label && styles.selectedLanguage,
            ]}
            onPress={() => handleSelectLanguage(language.label)}
          >
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language.label && styles.selectedLanguageText,
              ]}
            >
              {language.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Language saved')}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  languageList: {
    marginBottom: 30,
  },
  languageItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLanguage: {
    backgroundColor: '#4facfe',
    elevation: 5,
  },
  selectedLanguageText: {
    color: '#fff',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguagePreferences;
