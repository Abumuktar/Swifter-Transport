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
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    park,
    carType,
    departureTime,
    bookingType,
    groupSeats,
    pickupLocation,
    fare,
  } = route.params;

  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [transferPin, setTransferPin] = useState('');

  const handlePayment = () => {
    if (paymentMethod === 'Credit Card') {
      if (!cardNumber || !expiryDate || !cvv || !name) {
        Alert.alert('Incomplete Details', 'Please fill all card details.');
        return;
      }
    }

    if (paymentMethod === 'Bank Transfer') {
      if (!transferPin || transferPin.length !== 4 || isNaN(transferPin)) {
        Alert.alert('Invalid PIN', 'Please enter a valid 4-digit transfer PIN.');
        return;
      }
    }

    Alert.alert('Payment Successful', 'Your booking has been confirmed!');
    navigation.navigate('ReceiptScreen', {
      park,
      carType,
      departureTime,
      bookingType,
      groupSeats,
      pickupLocation,
      fare,
      paymentMethod,
      passengerName: name || 'John Doe',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F1FAEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Choose Payment Method</Text>

        <View style={styles.methodRow}>
          {['Bank Transfer', 'Credit Card'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodButton,
                paymentMethod === method && styles.selectedMethod,
              ]}
              onPress={() => {
                setPaymentMethod(method);
                setTransferPin('');
              }}
            >
              <Text style={paymentMethod === method ? styles.selectedText : styles.methodText}>
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transfer PIN */}
        {paymentMethod === 'Bank Transfer' && (
          <>
            <Text style={styles.label}>4-Digit Transfer PIN</Text>
            <TextInput
              style={styles.input}
              placeholder="••••"
              maxLength={4}
              keyboardType="numeric"
              secureTextEntry
              value={transferPin}
              onChangeText={setTransferPin}
            />
          </>
        )}

        {/* Credit Card Fields */}
        {paymentMethod === 'Credit Card' && (
          <>
            <Text style={styles.label}>Name on Card</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <View style={styles.row}>
              <View style={[styles.inputContainer, { marginRight: 10 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>
          </>
        )}

        {/* Fare Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <Text style={styles.summaryText}>Park: {park.name}</Text>
          <Text style={styles.summaryText}>Route: {park.location} → {park.destination}</Text>
          <Text style={styles.summaryText}>Car: {carType}</Text>
          <Text style={styles.summaryText}>Time: {departureTime}</Text>
          <Text style={styles.summaryText}>Booking: {bookingType}</Text>
          {bookingType === 'group' && (
            <Text style={styles.summaryText}>Seats: {groupSeats}</Text>
          )}
          {bookingType === 'drop' && (
            <Text style={styles.summaryText}>Pickup: {pickupLocation}</Text>
          )}
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Total Fare</Text>
            <Text style={styles.amount}>₦{fare.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#F1FAEE" />
          <Text style={styles.payButtonText}>Confirm & Pay</Text>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
  },
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedMethod: {
    backgroundColor: '#4facfe',
    borderColor: '#4facfe',
  },
  methodText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  summaryCard: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  amountBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#457B9D',
    fontWeight: '500',
  },
  amount: {
    fontSize: 22,
    color: '#1D3557',
    fontWeight: '700',
    marginTop: 4,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  payButtonText: {
    marginLeft: 8,
    color: '#F1FAEE',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentScreen;
