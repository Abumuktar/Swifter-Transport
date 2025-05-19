import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Checkbox, Text, Avatar, Title, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons

const CourierRegistrationScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleOptions] = useState([
    { label: 'Bike', value: 'bike' },
    { label: 'Car', value: 'car' },
    { label: 'Van', value: 'van' },
  ]);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);

  const pickImage = (setImage) => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response?.assets?.length > 0) {
        setImage(response.assets[0].uri || null);
      }
    });
  };

  const onSubmit = (data) => {
    if (!termsAccepted) {
      alert("Please accept the Terms and Conditions.");
      return;
    }
    const registrationData = {
      ...data,
      vehicleType,
      profilePhoto,
      idPhoto,
    };
    console.log('Courier Registration:', registrationData);
    // Submit to backend
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              activeOutlineColor="#1E90FF"
              left={<TextInput.Icon name={() => <Ionicons name="person-outline" size={20} color="#1E90FF" />} />}
            />
            {errors.fullName && <HelperText type="error">{errors.fullName.message}</HelperText>}
          </>
        )}
      />

      {/* Phone Number */}
      <Controller
        control={control}
        name="phone"
        defaultValue=""
        rules={{ required: 'Phone Number is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Phone Number"
              mode="outlined"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              outlineColor="#CED4DA"
              activeOutlineColor="#1E90FF"
              left={<TextInput.Icon name={() => <Ionicons name="call-outline" size={20} color="#1E90FF" />} />}
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
              activeOutlineColor="#1E90FF"
              left={<TextInput.Icon name={() => <Ionicons name="mail-outline" size={20} color="#1E90FF" />} />}
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
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Address"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            multiline
            outlineColor="#CED4DA"
            activeOutlineColor="#1E90FF"
            left={<TextInput.Icon name={() => <Ionicons name="location-outline" size={20} color="#1E90FF" />} />}
          />
        )}
      />

      {/* Vehicle Type */}
      <Text style={styles.label}>Vehicle Type</Text>
      <DropDownPicker
        open={vehicleTypeOpen}
        value={vehicleType}
        items={vehicleOptions}
        setOpen={setVehicleTypeOpen}
        setValue={setVehicleType}
        placeholder="Select your vehicle"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={1000}
        icon={<MaterialCommunityIcons name="car" size={24} color="#1E90FF" />} // Adding icon for dropdown
      />

      {/* Profile Photo */}
      <Text style={styles.label}>Profile Photo</Text>
      <TouchableOpacity onPress={() => pickImage(setProfilePhoto)} style={styles.uploadBox}>
        {profilePhoto ? (
          <Avatar.Image size={80} source={{ uri: profilePhoto }} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload</Text>
        )}
      </TouchableOpacity>

      {/* ID Photo */}
      <Text style={styles.label}>Government-issued ID</Text>
      <TouchableOpacity onPress={() => pickImage(setIdPhoto)} style={styles.uploadBox}>
        {idPhoto ? (
          <Avatar.Image size={80} source={{ uri: idPhoto }} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload</Text>
        )}
      </TouchableOpacity>

      {/* Terms and Conditions */}
      <View style={styles.termsRow}>
        <Checkbox
          status={termsAccepted ? 'checked' : 'unchecked'}
          onPress={() => setTermsAccepted(!termsAccepted)}
          color="#1E90FF"
        />
        <Text onPress={() => alert('Display Terms and Conditions')} style={styles.termsText}>
          I accept the Terms and Conditions
        </Text>
      </View>

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
        contentStyle={{ paddingVertical: 12 }}
        labelStyle={{ fontWeight: 'bold', color: '#FFF' }}
        icon="check-circle" // Adding icon to the button
      >
        Submit for Review
      </Button>
    </ScrollView>
  );
};

export default CourierRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E90FF',
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
    color: '#333',
    fontSize: 15,
  },
  dropdown: {
    marginBottom: 16,
    borderColor: '#CED4DA',
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 50,
  },
  dropdownContainer: {
    borderColor: '#CED4DA',
    backgroundColor: '#FFF',
    borderRadius: 10,
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
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 8,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
});
