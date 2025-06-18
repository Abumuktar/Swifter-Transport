import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  FlatList,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Checkbox,
  Text,
  Avatar,
  Title,
  HelperText,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const CustomSelectModal = ({
  visible,
  data,
  value,
  setValue,
  onClose,
  labelKey = 'label',
  valueKey = 'value',
  title = 'Select Option',
}) => {
  const [searchText, setSearchText] = useState('');
  const filtered = data.filter(
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
          <TextInput
            placeholder="Search..."
            style={styles.modalSearch}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
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

const CourierRegistrationScreen = () => {
  const { control, getValues, formState: { errors } } = useForm();
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Custom Select for Vehicle Type
  const [vehicleTypeModal, setVehicleTypeModal] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const vehicleOptions = [
    { label: 'Bike', value: 'bike' },
    { label: 'Car', value: 'car' },
    { label: 'Van', value: 'van' },
  ];

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);

  // Face verification modal state
  const [faceModalVisible, setFaceModalVisible] = useState(false);
  const [facePhoto, setFacePhoto] = useState(null);

  const logoAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  // Image Picker Modal for Profile & ID
  const [imagePickerModal, setImagePickerModal] = useState({ visible: false, setImage: null });

  const openImagePickerOptions = (setImage) => {
    setImagePickerModal({ visible: true, setImage });
  };

  const handleImagePickerOption = async (option) => {
    const setImage = imagePickerModal.setImage;
    let result;
    if (option === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setImagePickerModal({ visible: false, setImage: null });
  };

  const pickFacePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setFacePhoto(result.assets[0].uri);
    }
  };

  const removeImage = (setImage) => {
    setImage(null);
  };

  // Validation for enabling face verification
  const allRequiredFilled = () => {
    const values = getValues();
    return (
      values.fullName &&
      values.phone &&
      /^\d{11}$/.test(values.phone) &&
      values.email &&
      values.address &&
      vehicleType &&
      profilePhoto &&
      idPhoto &&
      termsAccepted
    );
  };

  const handleFaceModalSubmit = () => {
    setFaceModalVisible(false);
    setTimeout(() => {
      Alert.alert("Success", "Registration submitted successfully.", [
        {
          text: "OK",
          onPress: () => navigation.navigate('CourierDashboard'),
        },
      ]);
    }, 200);
  };

  // Show face modal if all details filled, else show errors
  const tryShowFaceModal = () => {
    if (!allRequiredFilled()) {
      Alert.alert(
        "Incomplete Details",
        "Please ensure all required fields, photo, ID, and terms are completed before verifying your face."
      );
      return;
    }
    setFaceModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image
        source={require('../assets/images/1.png')}
        style={[styles.logo, { opacity: logoAnim, transform: [{ scale: logoAnim }] }]}
        resizeMode="contain"
      />
      <Title style={styles.header}>Courier Registration</Title>

      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        defaultValue=""
        rules={{ required: 'Full Name is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Full Name"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              outlineColor="#CED4DA"
              activeOutlineColor="#4facfe"
              left={<TextInput.Icon icon={() => <Ionicons name="person-outline" size={20} color="#4facfe" />} />}
            />
            {errors.fullName && <HelperText type="error">{errors.fullName.message}</HelperText>}
          </>
        )}
      />

      {/* Phone */}
      <Controller
        control={control}
        name="phone"
        defaultValue=""
        rules={{
          required: 'Phone Number is required',
          pattern: {
            value: /^\d{11}$/,
            message: 'Phone number must be exactly 11 digits',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Phone Number"
              mode="outlined"
              keyboardType="number-pad"
              value={value}
              onChangeText={text => {
                if (/^\d{0,11}$/.test(text)) onChange(text);
              }}
              maxLength={11}
              style={styles.input}
              outlineColor="#CED4DA"
              activeOutlineColor="#4facfe"
              left={<TextInput.Icon icon={() => <Ionicons name="call-outline" size={20} color="#4facfe" />} />}
            />
            {errors.phone && <HelperText type="error">{errors.phone.message}</HelperText>}
          </>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        defaultValue=""
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              outlineColor="#CED4DA"
              activeOutlineColor="#4facfe"
              left={<TextInput.Icon icon={() => <Ionicons name="mail-outline" size={20} color="#4facfe" />} />}
            />
            {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
          </>
        )}
      />

      {/* Address */}
      <Controller
        control={control}
        name="address"
        defaultValue=""
        rules={{ required: 'Address is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Address"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              multiline
              style={styles.input}
              outlineColor="#CED4DA"
              activeOutlineColor="#4facfe"
              left={<TextInput.Icon icon={() => <Ionicons name="location-outline" size={20} color="#4facfe" />} />}
            />
            {errors.address && <HelperText type="error">{errors.address.message}</HelperText>}
          </>
        )}
      />

      {/* Vehicle Type */}
      <Text style={styles.label}>Vehicle Type</Text>
      <Pressable
        style={styles.selectInput}
        onPress={() => setVehicleTypeModal(true)}
      >
        <Text style={[styles.selectText, !vehicleType && { color: '#b0b9c8' }]}>
          {vehicleOptions.find(v => v.value === vehicleType)?.label || 'Select your vehicle'}
        </Text>
        <Ionicons name="chevron-down" size={22} color="#4facfe" />
      </Pressable>
      <CustomSelectModal
        visible={vehicleTypeModal}
        data={vehicleOptions}
        value={vehicleType}
        setValue={setVehicleType}
        onClose={() => setVehicleTypeModal(false)}
        title="Select Vehicle Type"
      />

      {/* Profile Photo */}
      <Text style={styles.label}>Profile Photo</Text>
      <TouchableOpacity onPress={() => openImagePickerOptions(setProfilePhoto)} style={styles.uploadBox}>
        {profilePhoto ? (
          <TouchableOpacity onLongPress={() => removeImage(setProfilePhoto)}>
            <Avatar.Image size={80} source={{ uri: profilePhoto }} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.uploadText}>Tap to upload</Text>
        )}
      </TouchableOpacity>

      {/* Government-issued ID */}
      <Text style={styles.label}>Government-issued ID</Text>
      <TouchableOpacity onPress={() => openImagePickerOptions(setIdPhoto)} style={styles.uploadBox}>
        {idPhoto ? (
          <TouchableOpacity onLongPress={() => removeImage(setIdPhoto)}>
            <Avatar.Image size={80} source={{ uri: idPhoto }} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.uploadText}>Tap to upload</Text>
        )}
      </TouchableOpacity>

      {/* Terms */}
      <View style={styles.termsRow}>
        <Checkbox
          status={termsAccepted ? 'checked' : 'unchecked'}
          onPress={() => setTermsAccepted(!termsAccepted)}
          color="#457B9D"
        />
        <Text onPress={() => alert('Display Terms and Conditions')} style={styles.termsText}>
          I accept the Terms and Conditions
        </Text>
      </View>

      {/* Face Verification Button */}
      <Button
        mode="contained"
        style={[
          styles.submitButton,
          !allRequiredFilled() && { backgroundColor: '#b0b9c8' }
        ]}
        contentStyle={{ paddingVertical: 12 }}
        labelStyle={{ fontWeight: 'bold', color: '#FFF' }}
        icon="face-recognition"
        disabled={!allRequiredFilled()}
        onPress={tryShowFaceModal}
      >
        Face Verification
      </Button>

      {/* Face Verification Modal */}
      <Modal
        visible={faceModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFaceModalVisible(false)}
      >
        <View style={styles.faceModalOverlay}>
          <View style={styles.faceModalContent}>
            <Ionicons name="person-circle-outline" size={52} color="#4facfe" style={{marginBottom: 8}} />
            <Text style={styles.faceModalHeader}>Face Verification</Text>
            <Text style={styles.faceModalSubtext}>
              For your security, please verify your face before submitting your registration for review.
            </Text>
            {facePhoto ? (
              <Image
                source={{ uri: facePhoto }}
                style={styles.faceImage}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={styles.faceCaptureButton}
                onPress={pickFacePhoto}
              >
                <Ionicons name="camera" size={34} color="#4facfe" />
                <Text style={styles.faceCaptureText}>Capture Face</Text>
              </TouchableOpacity>
            )}
            <Button
              mode="contained"
              style={[
                styles.faceModalSubmitButton,
                !facePhoto && { backgroundColor: '#b0b9c8' }
              ]}
              icon="check-decagram"
              disabled={!facePhoto}
              onPress={handleFaceModalSubmit}
            >
              Verify & Submit
            </Button>
            <Button
              mode="text"
              style={styles.faceModalCancelButton}
              onPress={() => {
                setFaceModalVisible(false);
                setFacePhoto(null);
              }}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal */}
      <Modal
        visible={imagePickerModal.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setImagePickerModal({ visible: false, setImage: null })}
      >
        <Pressable
          style={styles.optionModalOverlay}
          onPress={() => setImagePickerModal({ visible: false, setImage: null })}
        >
          <View style={styles.optionModalContent}>
            <Text style={styles.optionModalTitle}>Select Photo Option</Text>
            <Button
              icon="camera"
              mode="contained"
              style={styles.optionModalBtn}
              onPress={() => handleImagePickerOption('camera')}
            >
              Take Photo
            </Button>
            <Button
              icon="image"
              mode="contained"
              style={styles.optionModalBtn}
              onPress={() => handleImagePickerOption('gallery')}
            >
              Choose from Gallery
            </Button>
            <Button
              mode="text"
              style={styles.optionModalCancelBtn}
              onPress={() => setImagePickerModal({ visible: false, setImage: null })}
            >
              Cancel
            </Button>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default CourierRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F8F8F8',
    flexGrow: 1,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4facfe',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#1D3557',
    fontSize: 15,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CED4DA',
    paddingHorizontal: 18,
    height: 50,
    marginBottom: 16,
    elevation: 2,
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  uploadBox: {
    height: 80,
    width: 80,
    backgroundColor: '#EFF2F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 8,
    color: '#457B9D',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#4facfe',
    borderRadius: 10,
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
    minHeight: 260,
    maxHeight: '60%',
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

  // Face Verification Modal
  faceModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(25,30,48,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    elevation: 18,
    shadowColor: '#1D3557',
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  faceModalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 7,
    textAlign: "center",
  },
  faceModalSubtext: {
    color: '#457B9D',
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  faceCaptureButton: {
    height: 100,
    width: 100,
    backgroundColor: '#EFF2F5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1.7,
    borderColor: '#4facfe',
    elevation: 3,
  },
  faceCaptureText: {
    marginTop: 7,
    color: '#4facfe',
    fontWeight: '700',
    fontSize: 13.5,
  },
  faceImage: {
    height: 110,
    width: 110,
    borderRadius: 55,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#4facfe',
  },
  faceModalSubmitButton: {
    backgroundColor: '#4facfe',
    borderRadius: 10,
    minWidth: 180,
    marginBottom: 7,
  },
  faceModalCancelButton: {
    marginTop: 2,
  },
  // Option Modal (Camera or Gallery)
  optionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30,36,58,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionModalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    width: '80%',
    elevation: 10,
  },
  optionModalTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#1D3557',
    marginBottom: 14,
    textAlign: 'center',
  },
  optionModalBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 8,
    marginVertical: 4,
    minWidth: 170,
  },
  optionModalCancelBtn: {
    marginTop: 6,
  }
});