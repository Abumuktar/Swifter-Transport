import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const Ticket = () => {
  const navigation = useNavigation();
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableTrips, setAvailableTrips] = useState([]);

  const handleFindTrips = () => {
    if (!departure || !destination) {
      Alert.alert('Missing Fields', 'Please enter both departure and destination.');
      return;
    }

    const trips = [
      {
        id: 1,
        busName: 'Evelight Express',
        time: '9:00 AM',
        price: '₦3,500',
        duration: '6h',
      },
      {
        id: 2,
        busName: 'SpeedLink',
        time: '12:30 PM',
        price: '₦4,000',
        duration: '5h 30m',
      },
    ];

    setAvailableTrips(trips);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F1FAEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Trip Ticket</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Departure</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lagos"
          value={departure}
          onChangeText={setDeparture}
        />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Abuja"
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Travel Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#457B9D" />
          <Text style={styles.dateText}>{travelDate.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={travelDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setTravelDate(selectedDate);
            }}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleFindTrips}>
          <Ionicons name="search" size={20} color="#F1FAEE" />
          <Text style={styles.buttonText}>Find Trips</Text>
        </TouchableOpacity>
      </View>

      {/* Available Trips */}
      {availableTrips.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Available Trips</Text>
          {availableTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <Text style={styles.busName}>{trip.busName}</Text>
              <Text style={styles.tripDetails}>
                🕒 {trip.time} | {trip.duration} | 💰 {trip.price}
              </Text>
              <TouchableOpacity
                style={styles.purchaseBtn}
                onPress={() => Alert.alert('Buy Ticket', 'This feature is coming soon!')}
              >
                <Text style={styles.purchaseText}>Buy Ticket</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8', // Light gray, clean background
    flex: 1,
  },
  header: {
    backgroundColor: '#4facfe', // Primary Brand Blue
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#F1FAEE', // White text
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
    color: '#333', // Text Dark
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff', // White background
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#4facfe', // Text color for date picker
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4facfe', // Button color
    padding: 15,
    borderRadius: 12,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    marginLeft: 8,
    color: '#F1FAEE', // White text
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333', // Text Dark
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#fff', // Clean white for cards
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee', // Border color for cards
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  busName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D3557', // Dark text for bus name
  },
  tripDetails: {
    marginTop: 4,
    fontSize: 14,
    color: '#777', // Text Grey for details
  },
  purchaseBtn: {
    marginTop: 10,
    backgroundColor: '#4facfe', // Primary Brand Blue
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  purchaseText: {
    color: '#fff', // White text for purchase button
    fontWeight: '600',
  },
});

export default Ticket;
