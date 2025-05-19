// app/Signup.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios'; // Import axios for HTTP requests
import countryData from '../assets/country_state.json';

DropDownPicker.setListMode('MODAL');

const SignupScreen = () => {
  const router = useRouter();

  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [statesList, setStatesList] = useState([]);

  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);

  const countryItems = countryData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(item => ({
      label: `${item.emoji || ''} ${item.name}`,
      value: item.name
    }));

  const stateItems = statesList
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(item => ({
      label: item.name,
      value: item.name
    }));

  useEffect(() => {
    if (country) {
      const selected = countryData.find(c => c.name === country);
      if (selected) {
        setPhoneCode(selected.phone || '');
        setStatesList(selected.stateProvinces || []);
      }
    }
  }, [country]);

  const handleSignup = async () => {
    if (!givenName || !surname || !email || !phoneNumber || !country || !state || !address || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (phoneNumber.length !== 11) {
      Alert.alert('Error', 'Phone number must be exactly 11 digits');
      return;
    }
    if (password.length !== 6 || isNaN(password)) {
      Alert.alert('Error', 'Password must be exactly 6 digits');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Prepare user data
      const userData = {
        givenName,
        surname,
        email,
        phoneNumber,
        country,
        state,
        address,
        password
      };

       // Define your backend URL (this might change based on your actual API endpoint)
const API_URL = 'http://192.168.152.134:5000/api/users/signup'; // Update with your actual IP address


      // Handle success or error
      if (response.data.success) {
        Alert.alert('Success', 'Account created successfully');
        router.push('/Login');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Your Account</Text>

      {/* Given Name */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Given Name"
          value={givenName}
          onChangeText={setGivenName}
        />
      </View>

      {/* Surname */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
        />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Country */}
      <View style={{ marginBottom: 15 }}>
        <DropDownPicker
          open={openCountry}
          value={country}
          items={countryItems}
          setOpen={setOpenCountry}
          setValue={setCountry}
          placeholder="Select Country"
          searchable
          searchPlaceholder="Search country..."
          style={styles.dropdown}
          listMode="MODAL"
          modalContentContainerStyle={{ backgroundColor: '#f8f8f8' }}
        />
      </View>

      {/* State */}
      <View style={{ marginBottom: 15 }}>
        <DropDownPicker
          open={openState}
          value={state}
          items={stateItems}
          setOpen={setOpenState}
          setValue={setState}
          placeholder="Select State"
          searchable
          searchPlaceholder="Search state..."
          disabled={statesList.length === 0}
          style={styles.dropdown}
          listMode="MODAL"
          modalContentContainerStyle={{ backgroundColor: '#f8f8f8' }}
        />
      </View>

      {/* Address */}
      <View style={styles.inputWrapper}>
        <Ionicons name="home-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Home Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      {/* Phone */}
      <View style={styles.phoneContainer}>
        <View style={styles.inputWrapperSmall}>
          <Ionicons name="call-outline" size={20} color="#4facfe" style={styles.iconSmall} />
          <TextInput
            style={styles.inputSmall}
            placeholder="+Code"
            value={phoneCode}
            editable={false}
          />
        </View>
        <View style={styles.inputWrapperLarge}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
            maxLength={11}
          />
        </View>
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password (6 digits)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      {/* Sign Up */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#ddd',
    height: 50,
    paddingHorizontal: 15,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  iconSmall: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputSmall: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  phoneContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  inputWrapperSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginRight: 10,
    paddingHorizontal: 10,
    height: 50,
    flex: 0.3,
    elevation: 2,
  },
  inputWrapperLarge: {
    flex: 0.7,
  },
  button: {
    height: 50,
    backgroundColor: '#4facfe',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4facfe',
  },
});

export default SignupScreen;
