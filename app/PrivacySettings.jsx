// app/PrivacySettings.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PrivacySettings = () => {
  const router = useRouter();

  const [profileVisible, setProfileVisible] = useState(true);
  const [lastSeenVisible, setLastSeenVisible] = useState(false);
  const [searchableByEmail, setSearchableByEmail] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#333" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Privacy Settings</Text>
      </View>

      {/* Settings Items */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Profile Visible to Others</Text>
        <Switch
          value={profileVisible}
          onValueChange={setProfileVisible}
          trackColor={{ false: '#ccc', true: '#4facfe' }}
          thumbColor={profileVisible ? '#4facfe' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Show Last Seen</Text>
        <Switch
          value={lastSeenVisible}
          onValueChange={setLastSeenVisible}
          trackColor={{ false: '#ccc', true: '#4facfe' }}
          thumbColor={lastSeenVisible ? '#4facfe' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Searchable by Email</Text>
        <Switch
          value={searchableByEmail}
          onValueChange={setSearchableByEmail}
          trackColor={{ false: '#ccc', true: '#4facfe' }}
          thumbColor={searchableByEmail ? '#4facfe' : '#f4f3f4'}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrivacySettings;
