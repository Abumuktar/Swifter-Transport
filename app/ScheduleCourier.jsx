// screens/ScheduleCourier.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const ScheduleCourier = () => {
  const navigation = useNavigation();
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSchedule = () => {
    if (!sender || !receiver || !pickup || !dropoff || !description) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    Alert.alert('Courier Scheduled', 'Your delivery has been scheduled successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Schedule Courier</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Sender Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={sender}
              onChangeText={setSender}
            />

            <Text style={styles.label}>Receiver Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Mary Jane"
              value={receiver}
              onChangeText={setReceiver}
            />

            <Text style={styles.label}>Pickup Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Lagos"
              value={pickup}
              onChangeText={setPickup}
            />

            <Text style={styles.label}>Dropoff Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Abuja"
              value={dropoff}
              onChangeText={setDropoff}
            />

            <Text style={styles.label}>Package Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Documents, electronics, food, etc."
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={styles.label}>Delivery Date</Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#0f52ba" />
              <Text style={styles.dateText}>{deliveryDate.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={deliveryDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDeliveryDate(selectedDate);
                }}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSchedule}>
              <Ionicons name="send-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Confirm & Schedule</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Updated to match the general background
  },
  container: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#4facfe', // Updated to match your color palette
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#4facfe', // Updated to match your color palette
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4facfe', // Updated to match your color palette
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScheduleCourier;
