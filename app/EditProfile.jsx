import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

// Profile Brand Colors
const BRAND_ACCENT = '#4facfe';
const PLACEHOLDER_IMG = require('../assets/icon.png');

const EditProfile = () => {
  const router = useRouter();

  // Profile state
  const [profileImage, setProfileImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [saving, setSaving] = useState(false);

  // Image picker handler with permission check
  const pickImage = async () => {
    try {
      setLoadingImage(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your photos for profile update.');
        setLoadingImage(false);
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to pick image.');
    }
    setLoadingImage(false);
  };

  // Basic email and phone validation
  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidPhone = (val) => /^\+?\d{7,15}$/.test(val);

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Missing Fields', 'Please complete all required fields.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!isValidPhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Success', 'Your profile has been updated successfully!');
      router.back();
    }, 1200); // simulate save
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color={BRAND_ACCENT} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
            <View>
              <Image
                source={profileImage ? { uri: profileImage } : PLACEHOLDER_IMG}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <View style={styles.editIcon}>
                {loadingImage ? (
                  <ActivityIndicator color="#fff" size={18} />
                ) : (
                  <Ionicons name="camera" size={18} color="white" />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.imageHint}>Tap to change photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#b0b9c8"
            autoCorrect={false}
            autoCapitalize="words"
          />

          {/* Bio */}
          <Text style={styles.label}>Bio <Text style={{ color: "#b0b9c8", fontSize: 13 }}>(optional)</Text></Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Let others know you better"
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={160}
            placeholderTextColor="#b0b9c8"
          />
          <Text style={styles.charCount}>{bio.length}/160</Text>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#b0b9c8"
          />

          {/* Phone */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            autoCapitalize="none"
            placeholderTextColor="#b0b9c8"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!name || !email || !phone || saving) && styles.disabledBtn,
          ]}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={!name || !email || !phone || saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    marginTop: 10,
  },
  backBtn: {
    padding: 2,
    borderRadius: 22,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#222e44',
    marginLeft: 16,
    letterSpacing: 0.2,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 65,
    backgroundColor: '#e3e8ee',
    borderWidth: 3,
    borderColor: '#eaf7fd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    backgroundColor: '#4facfe',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHint: {
    color: '#a2b9c7',
    fontSize: 13,
    marginTop: 8,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#457B9D',
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222e44',
    borderWidth: 1.2,
    borderColor: '#e3e8ee',
    marginBottom: 2,
    fontWeight: '500',
    shadowColor: '#4facfe',
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  bioInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#b0b9c8',
    fontSize: 12,
    marginBottom: 4,
    marginTop: -2,
    marginRight: 3,
  },
  saveButton: {
    borderRadius: 30,
    marginTop: 12,
    overflow: 'hidden',
    elevation: 6,
    backgroundColor: '#4facfe',
    shadowColor: '#4facfe',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    alignItems: 'center',
    paddingVertical: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
});

export default EditProfile;