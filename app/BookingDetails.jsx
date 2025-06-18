import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { park } = route.params;

  const [carType, setCarType] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [groupSeats, setGroupSeats] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [fare, setFare] = useState(0);

  useEffect(() => {
    let baseFare = 3500;
    if (bookingType === 'group') {
      const seats = parseInt(groupSeats) || 0;
      setFare(seats * baseFare);
    } else if (bookingType === 'drop') {
      setFare(15000);
    } else if (bookingType === 'self') {
      setFare(baseFare);
    }
  }, [bookingType, groupSeats]);

  const handleProceed = () => {
    if (!carType || !departureTime || !bookingType) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    if (bookingType === 'group' && (!groupSeats || parseInt(groupSeats) <= 0)) {
      Alert.alert('Invalid Input', 'Please enter a valid number of seats.');
      return;
    }

    if (bookingType === 'drop' && pickupLocation.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a pickup location.');
      return;
    }

    // ✅ Navigate to PaymentScreen and pass data
    navigation.navigate('PaymentScreen', {
      park,
      carType,
      departureTime,
      bookingType,
      groupSeats,
      pickupLocation,
      fare,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F1FAEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subTitle}>{park.name}</Text>
        <Text style={styles.grayText}>From: {park.location} → To: {park.destination}</Text>
        <Text style={styles.grayText}>Operator: {park.operators}</Text>

        <Text style={styles.label}>Select Car Type</Text>
        <View style={styles.optionContainer}>
          {['Sienna', 'Hiace', 'Coaster'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.option,
                carType === type && styles.selectedOption,
              ]}
              onPress={() => setCarType(type)}
            >
              <Text style={carType === type ? styles.selectedText : styles.optionText}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Departure Time</Text>
        <View style={styles.optionContainer}>
          {['9:00 AM', '12:00 PM', '4:00 PM'].map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.option,
                departureTime === time && styles.selectedOption,
              ]}
              onPress={() => setDepartureTime(time)}
            >
              <Text style={departureTime === time ? styles.selectedText : styles.optionText}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Booking For</Text>
        <View style={styles.optionContainer}>
          {['self', 'group', 'drop'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.option,
                bookingType === type && styles.selectedOption,
              ]}
              onPress={() => {
                setBookingType(type);
                setGroupSeats('');
                setPickupLocation('');
              }}
            >
              <Text style={bookingType === type ? styles.selectedText : styles.optionText}>
                {type === 'self' ? 'Myself' : type === 'group' ? 'Group' : 'Drop'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {bookingType === 'group' && (
          <>
            <Text style={styles.label}>Number of Seats</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 3"
              keyboardType="numeric"
              value={groupSeats}
              onChangeText={setGroupSeats}
            />
          </>
        )}

        {bookingType === 'drop' && (
          <>
            <Text style={styles.label}>Pickup Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pickup address"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </>
        )}

        <View style={styles.fareBox}>
          <Text style={styles.fareLabel}>Total Fare</Text>
          <Text style={styles.fareAmount}>₦{fare.toLocaleString()}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Ionicons name="wallet-outline" size={20} color="#F1FAEE" />
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerTitle: {
    color: '#F1FAEE',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3557',
  },
  grayText: {
    color: '#777',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
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
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#4facfe',
    borderColor: '#4facfe',
  },
  optionText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  fareBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#eaf4ff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cde4f9',
  },
  fareLabel: {
    fontSize: 14,
    color: '#457B9D',
    fontWeight: '500',
  },
  fareAmount: {
    fontSize: 22,
    color: '#1D3557',
    fontWeight: '700',
    marginTop: 6,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
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
});

export default BookingDetails;
