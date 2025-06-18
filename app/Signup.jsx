import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import countryData from '../assets/country_state.json';

const CustomSelectModal = ({
  visible,
  data,
  value,
  setValue,
  onClose,
  labelKey = 'label',
  valueKey = 'value',
  title = 'Select Option',
  search = false,
}) => {
  const [searchText, setSearchText] = useState('');
  const filtered = !search
    ? data
    : data.filter(
        (item) =>
          item[labelKey]
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
      );

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalSheet}>
          <Text style={styles.modalTitle}>{title}</Text>
          {search && (
            <TextInput
              placeholder="Search..."
              style={styles.modalSearch}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          )}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item[valueKey].toString()}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.modalItem,
                  value === item[valueKey] && styles.selectedModalItem,
                ]}
                onPress={() => {
                  setValue(item[valueKey]);
                  onClose();
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  value === item[valueKey] && styles.selectedModalItemText,
                ]}>
                  {item[labelKey]}
                </Text>
                {value === item[valueKey] && (
                  <Ionicons name="checkmark" size={18} color="#4facfe" />
                )}
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', color: '#7b8ca6', marginTop: 30 }}>
                No options found
              </Text>
            }
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const SignupScreen = () => {
  const router = useRouter();

  const [avatar, setAvatar] = useState(null);
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [phoneCode, setPhoneCode] = useState('');
  const [statesList, setStatesList] = useState([]);

  // Custom dropdown modals
  const [genderModal, setGenderModal] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const countryItems = countryData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(item => ({
      label: `${item.emoji || ''} ${item.name}`,
      value: item.name,
      phone: item.phone,
      stateProvinces: item.stateProvinces,
    }));

  const stateItems = statesList
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(item => ({
      label: item.name,
      value: item.name,
    }));

  useEffect(() => {
    if (country) {
      const selected = countryData.find(c => c.name === country);
      if (selected) {
        setPhoneCode(selected.phone || '');
        setStatesList(selected.stateProvinces || []);
        setState(null); // reset state on country change
      }
    }
  }, [country]);

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permission denied', 'Camera roll access is required');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = () => {
    if (!givenName || !surname || !gender || !email || !phoneNumber || !country || !state || !address || !password || !confirmPassword) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    if (!validateEmail(email)) {
      return Alert.alert('Error', 'Please enter a valid email address');
    }

    if (phoneNumber.length !== 11) {
      return Alert.alert('Error', 'Phone number must be exactly 11 digits');
    }

    if (password.length !== 6 || isNaN(password)) {
      return Alert.alert('Error', 'Password must be exactly 6 digits');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    const userData = {
      avatar,
      givenName,
      surname,
      gender,
      email,
      phoneNumber,
      country,
      state,
      address,
      password,
    };

    // API submission logic...
    Alert.alert('Success', 'Account created!');
    router.push('/Login');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* --- LOGO --- */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Create Your Account</Text>

      {/* Avatar Picker */}
      <TouchableOpacity onPress={pickAvatar} style={styles.avatarWrapper}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Ionicons name="camera-outline" size={40} color="#4facfe" />
        )}
      </TouchableOpacity>

      {/* Given Name */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          placeholder="Given Name"
          value={givenName}
          onChangeText={setGivenName}
          style={styles.input}
        />
      </View>

      {/* Surname */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
          style={styles.input}
        />
      </View>

      {/* Gender */}
      <Text style={styles.inputLabel}>Gender</Text>
      <Pressable
        style={styles.selectInput}
        onPress={() => setGenderModal(true)}
      >
        <Text style={[styles.selectText, !gender && { color: '#b0b9c8' }]}>
          {genderOptions.find(g => g.value === gender)?.label || 'Select Gender'}
        </Text>
        <Ionicons name="chevron-down" size={22} color="#4facfe" />
      </Pressable>
      <CustomSelectModal
        visible={genderModal}
        data={genderOptions}
        value={gender}
        setValue={setGender}
        onClose={() => setGenderModal(false)}
        title="Select Gender"
      />

      {/* Country */}
      <Text style={styles.inputLabel}>Country</Text>
      <Pressable
        style={styles.selectInput}
        onPress={() => setCountryModal(true)}
      >
        <Text style={[styles.selectText, !country && { color: '#b0b9c8' }]}>
          {countryItems.find(c => c.value === country)?.label || 'Select Country'}
        </Text>
        <Ionicons name="chevron-down" size={22} color="#4facfe" />
      </Pressable>
      <CustomSelectModal
        visible={countryModal}
        data={countryItems}
        value={country}
        setValue={setCountry}
        onClose={() => setCountryModal(false)}
        title="Select Country"
        search
      />

      {/* State */}
      <Text style={styles.inputLabel}>State</Text>
      <Pressable
        style={[
          styles.selectInput,
          !statesList.length && { backgroundColor: '#f3f6fa' },
        ]}
        onPress={() => statesList.length && setStateModal(true)}
        disabled={!statesList.length}
      >
        <Text style={[styles.selectText, !state && { color: '#b0b9c8' }]}>
          {stateItems.find(s => s.value === state)?.label || 'Select State'}
        </Text>
        <Ionicons name="chevron-down" size={22} color="#4facfe" />
      </Pressable>
      <CustomSelectModal
        visible={stateModal}
        data={stateItems}
        value={state}
        setValue={setState}
        onClose={() => setStateModal(false)}
        title="Select State"
        search
      />

      {/* Address */}
      <View style={styles.inputWrapper}>
        <Ionicons name="home-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          placeholder="Home Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          multiline
        />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Phone */}
      <View style={styles.phoneContainer}>
        <View style={styles.inputWrapperSmall}>
          <Ionicons name="call-outline" size={20} color="#4facfe" style={styles.iconSmall} />
          <TextInput style={styles.inputSmall} value={phoneCode} editable={false} />
        </View>
        <View style={styles.inputWrapperLarge}>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={11}
          />
        </View>
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          placeholder="Password (6 digits)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={22} color="#4facfe" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!confirmVisible}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
          <Ionicons
            name={confirmVisible ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  logo: {
    width: 74,
    height: 74,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4facfe',
    shadowColor: '#4facfe',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#E5E5E5',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 18,
    height: 50,
    marginBottom: 13,
    elevation: 2,
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  inputLabel: {
    marginBottom: 6,
    color: '#333',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 4,
    marginTop: 6,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  inputWrapperSmall: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 50,
    elevation: 2,
  },
  inputWrapperLarge: {
    flex: 0.7,
  },
  inputSmall: {
    flex: 1,
    fontSize: 16,
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
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#777',
    fontSize: 15,
  },
  loginButton: {
    color: '#4facfe',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(45,52,70,0.16)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    minHeight: 320,
    maxHeight: '70%',
    shadowColor: '#4facfe',
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 16,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSearch: {
    backgroundColor: '#f7f9fc',
    borderRadius: 17,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eaf0f7',
    color: '#222e44',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#f2f4fa',
    borderRadius: 15,
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  modalItemText: {
    fontSize: 16,
    color: '#222e44',
    flex: 1,
  },
  selectedModalItem: {
    backgroundColor: '#eaf7fd',
  },
  selectedModalItemText: {
    color: '#1987d2',
    fontWeight: '700',
  },
});

export default SignupScreen;