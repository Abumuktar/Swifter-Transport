// screens/Bookings.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Bookings = () => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://your-api.com/api/bookings', {
        params: { userId: 'USER_ID' }, // Replace with actual user ID
      });
      setBookings(response.data || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const BookingCard = ({ booking }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="bus" size={22} color="#0f52ba" />
        <Text style={styles.tripName}>{booking.busName || 'Evelight Express'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={18} color="#555" />
        <Text style={styles.detailText}>{booking.departure} ➜ {booking.destination}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={18} color="#555" />
        <Text style={styles.detailText}>{booking.date} | {booking.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="pricetag-outline" size={18} color="#555" />
        <Text style={styles.detailText}>₦{booking.price}</Text>
      </View>
      <TouchableOpacity style={styles.viewTicketBtn}>
        <Ionicons name="ticket-outline" size={16} color="#0f52ba" />
        <Text style={styles.ticketBtnText}>View Ticket</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0f52ba" />
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="calendar-clear-outline" size={50} color="#aaa" />
          <Text style={styles.emptyText}>You have no bookings yet.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6f8',
    flex: 1,
  },
  header: {
    backgroundColor: '#4facfe',
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f52ba',
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#444',
  },
  viewTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#0f52ba',
    borderRadius: 8,
  },
  ticketBtnText: {
    color: '#0f52ba',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
  },
});

export default Bookings;
