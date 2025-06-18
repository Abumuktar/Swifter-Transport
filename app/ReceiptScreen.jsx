import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';

const ReceiptScreen = () => {
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
    paymentMethod,
    passengerName = 'John Doe',
    receiptId = `REC-${Date.now().toString().slice(-6)}`,
  } = route.params;

  const [pdfPath, setPdfPath] = useState(null);

  const generatePDF = async () => {
    const htmlContent = `
      <h2 style="text-align: center; color: #4facfe;">ISMEED RIDE - Payment Receipt</h2>
      <p><strong>Receipt ID:</strong> ${receiptId}</p>
      <p><strong>Passenger:</strong> ${passengerName}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Total Paid:</strong> ₦${fare.toLocaleString()}</p>
      <hr/>
      <h3 style="color: #1D3557;">Trip Information</h3>
      <p><strong>Operator:</strong> ${park.operators}</p>
      <p><strong>From:</strong> ${park.location}</p>
      <p><strong>To:</strong> ${park.destination}</p>
      <p><strong>Car Type:</strong> ${carType}</p>
      <p><strong>Departure Time:</strong> ${departureTime}</p>
      <p><strong>Booking Type:</strong> ${bookingType}</p>
      ${
        bookingType === 'group'
          ? `<p><strong>Seats:</strong> ${groupSeats}</p>`
          : bookingType === 'drop'
          ? `<p><strong>Pickup Location:</strong> ${pickupLocation}</p>`
          : ''
      }
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (!uri) {
        Alert.alert('Error', 'Failed to generate the PDF file.');
        return;
      }

      setPdfPath(uri);

      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission Denied', 'Storage permission is required to save the receipt.');
        return;
      }

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('PDF Saved', 'Receipt has been saved to your device.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while generating or saving the PDF.');
    }
  };

  const handleShare = async () => {
    if (!pdfPath) {
      Alert.alert('Generate PDF First', 'Please generate the PDF before sharing.');
      return;
    }

    try {
      await Sharing.shareAsync(pdfPath);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while sharing the PDF.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="checkmark-circle-outline" size={32} color="#F1FAEE" />
        <Text style={styles.headerTitle}>Payment Successful</Text>
        <Text style={styles.subTitle}>Thank you for your purchase</Text>
      </View>

      {/* Receipt Content */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Receipt Details</Text>
        <View style={styles.detailRow}><Text style={styles.label}>Receipt ID</Text><Text style={styles.value}>{receiptId}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Passenger</Text><Text style={styles.value}>{passengerName}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Payment Method</Text><Text style={styles.value}>{paymentMethod}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Total Paid</Text><Text style={styles.value}>₦{fare.toLocaleString()}</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Trip Info</Text>
        <View style={styles.detailRow}><Text style={styles.label}>Operator</Text><Text style={styles.value}>{park.operators}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>From</Text><Text style={styles.value}>{park.location}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>To</Text><Text style={styles.value}>{park.destination}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Car Type</Text><Text style={styles.value}>{carType}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Departure Time</Text><Text style={styles.value}>{departureTime}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Booking Type</Text><Text style={styles.value}>{bookingType}</Text></View>
        {bookingType === 'group' && (
          <View style={styles.detailRow}><Text style={styles.label}>Seats</Text><Text style={styles.value}>{groupSeats}</Text></View>
        )}
        {bookingType === 'drop' && (
          <View style={styles.detailRow}><Text style={styles.label}>Pickup</Text><Text style={styles.value}>{pickupLocation}</Text></View>
        )}
      </View>

      {/* PDF Actions */}
      <TouchableOpacity style={styles.actionBtn} onPress={generatePDF}>
        <Ionicons name="document-outline" size={20} color="#F1FAEE" />
        <Text style={styles.actionText}>Generate & Save PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
        <Ionicons name="share-social-outline" size={20} color="#F1FAEE" />
        <Text style={styles.actionText}>Share PDF</Text>
      </TouchableOpacity>

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={20} color="#F1FAEE" />
        <Text style={styles.doneText}>Back to Home</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#F1FAEE',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitle: {
    color: '#F1FAEE',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  label: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  doneButton: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    marginTop: 30,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  doneText: {
    color: '#F1FAEE',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: '#457B9D',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  actionText: {
    color: '#F1FAEE',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ReceiptScreen;
