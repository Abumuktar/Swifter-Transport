import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  LogBox,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

// Ignore harmless warning from underlying libraries in dev
LogBox.ignoreLogs(['useInsertionEffect must not schedule updates']);

const Ticket = () => {
  const navigation = useNavigation();
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableParks, setAvailableParks] = useState([]);

  const handleSearchParks = () => {
    if (!departure || !destination) {
      Alert.alert('Missing Fields', 'Please enter both departure and destination.');
      return;
    }

    if (departure.toLowerCase() === destination.toLowerCase()) {
      Alert.alert('Invalid Route', 'Departure and destination cannot be the same.');
      return;
    }

    const parks = [
      {
        id: 1,
        name: 'Evelight Motor Park',
        location: 'Lagos',
        destination: 'Abuja',
        operators: 'Evelight Express',
      },
      {
        id: 2,
        name: 'Unity Park Terminal',
        location: 'Lagos',
        destination: 'Abuja',
        operators: 'SpeedLink Transport',
      },
    ];

    const results = parks.filter(
      p =>
        p.location.toLowerCase() === departure.toLowerCase() &&
        p.destination.toLowerCase() === destination.toLowerCase()
    );

    if (results.length === 0) {
      Alert.alert('No Parks Found', 'No motor parks match your search.');
    }

    setAvailableParks(results);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F1FAEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Transport Parks</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleSearchParks}>
          <Ionicons name="search" size={20} color="#F1FAEE" />
          <Text style={styles.buttonText}>Search Parks</Text>
        </TouchableOpacity>
      </View>

      {/* Available Parks */}
      {availableParks.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Available Motor Parks</Text>
          {availableParks.map((park) => (
            <View key={park.id} style={styles.tripCard}>
              <Text style={styles.busName}>{park.name}</Text>
              <Text style={styles.tripDetails}>
                From: {park.location} → To: {park.destination}
              </Text>
              <Text style={styles.tripDetails}>Operator: {park.operators}</Text>
              <TouchableOpacity
                style={styles.purchaseBtn}
                onPress={() => navigation.navigate('BookingDetails', { park })}
              >
                <Text style={styles.purchaseText}>Select Park</Text>
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
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  header: {
    backgroundColor: '#4facfe',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerTitle: {
    color: '#F1FAEE',
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
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
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
    color: '#4facfe',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    padding: 15,
    borderRadius: 12,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    marginLeft: 8,
    color: '#F1FAEE',
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
    color: '#333',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  busName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D3557',
  },
  tripDetails: {
    marginTop: 4,
    fontSize: 14,
    color: '#777',
  },
  purchaseBtn: {
    marginTop: 12,
    backgroundColor: '#4facfe',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  purchaseText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default Ticket;