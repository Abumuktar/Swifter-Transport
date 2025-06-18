import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Mock bookings data
const MOCK_BOOKINGS = [
  {
    id: '1',
    busName: 'Evelight Express',
    departure: 'Abuja',
    destination: 'Lagos',
    date: '2025-06-20',
    time: '09:30 AM',
    price: '15000',
    seat: 'A12',
    status: 'Confirmed',
    ticketNumber: 'EVL-2025-01',
  },
  {
    id: '2',
    busName: 'MegaRide',
    departure: 'Kano',
    destination: 'Ibadan',
    date: '2025-06-22',
    time: '07:00 AM',
    price: '20000',
    seat: 'B07',
    status: 'Pending',
    ticketNumber: 'MGR-2025-02',
  },
];

const Bookings = () => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const cardFade = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    setBookings(MOCK_BOOKINGS);
    Animated.timing(cardFade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleViewTicket = (booking) => {
    setSelectedTicket(booking);
    setModalVisible(true);
  };

  const handleCancelTicket = (bookingId) => {
    Alert.alert(
      "Cancel Ticket",
      "Are you sure you want to cancel this ticket?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
            if (selectedTicket && selectedTicket.id === bookingId) setModalVisible(false);
          }
        }
      ]
    );
  };

  const BookingCard = ({ booking }) => (
    <Animated.View style={[styles.card, { opacity: cardFade }]}>
      <LinearGradient
        colors={['#f0f5ffcc', '#e4ecfa99']}
        style={styles.cardBg}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="bus" size={22} color="#0f52ba" />
          <Text style={styles.tripName}>{booking.busName}</Text>
          <View style={styles.statusPill(booking.status)}>
            <Text style={styles.statusPillText(booking.status)}>{booking.status}</Text>
          </View>
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
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color="#787fa1" />
          <Text style={styles.detailText}>Seat: {booking.seat}</Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.viewTicketBtn}
            activeOpacity={0.8}
            onPress={() => handleViewTicket(booking)}
          >
            <Ionicons name="ticket-outline" size={16} color="#0f52ba" />
            <Text style={styles.ticketBtnText}>View Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.8}
            onPress={() => handleCancelTicket(booking.id)}
          >
            <Ionicons name="close-circle-outline" size={16} color="#ff4c4c" />
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const TicketModal = () => (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={styles.ticketModalCard}>
          <View style={styles.ticketHeader}>
            <Ionicons name="ticket-outline" size={32} color="#0f52ba" />
            <Text style={styles.ticketTitle}>Your Ticket</Text>
          </View>
          <View style={styles.ticketDetails}>
            <Text style={styles.ticketLabel}>Ticket Number</Text>
            <Text style={styles.ticketValue}>{selectedTicket?.ticketNumber}</Text>
            <Text style={styles.ticketLabel}>Bus</Text>
            <Text style={styles.ticketValue}>{selectedTicket?.busName}</Text>
            <Text style={styles.ticketLabel}>Route</Text>
            <Text style={styles.ticketValue}>{selectedTicket?.departure} ➜ {selectedTicket?.destination}</Text>
            <Text style={styles.ticketLabel}>Date & Time</Text>
            <Text style={styles.ticketValue}>{selectedTicket?.date} | {selectedTicket?.time}</Text>
            <Text style={styles.ticketLabel}>Seat</Text>
            <Text style={styles.ticketValue}>{selectedTicket?.seat}</Text>
            <Text style={styles.ticketLabel}>Status</Text>
            <Text style={[styles.ticketValue, selectedTicket?.status === 'Confirmed' ? styles.statusConfirmed : styles.statusPending]}>
              {selectedTicket?.status}
            </Text>
          </View>
          <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={22} color="#fff" />
            <Text style={styles.closeBtnText}>Close</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="calendar-clear-outline" size={60} color="#b6d0f7" />
          <Text style={styles.emptyText}>No bookings found</Text>
          <Text style={styles.emptyHint}>Start your journey by booking a trip!</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </ScrollView>
      )}
      {selectedTicket && <TicketModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f9fe',
    flex: 1,
  },
  headerGradient: {
    width: '100%',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55,
    paddingHorizontal: 22,
  },
  headerBack: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'System',
    textShadowColor: '#7fdfff55',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 8,
  },
  scrollContainer: {
    padding: 22,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 18,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#90caf980',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardBg: {
    borderRadius: 18,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f52ba',
    marginLeft: 11,
    flex: 1,
    letterSpacing: 0.2,
  },
  statusPill: (status) => ({
    backgroundColor: status === 'Confirmed' ? '#18e3a1' : '#ffe08a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 13,
    marginLeft: 3,
  }),
  statusPillText: (status) => ({
    color: status === 'Confirmed' ? '#fff' : '#b08804',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  }),
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 15,
    marginLeft: 9,
    color: '#3b4d6b',
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
    gap: 10,
  },
  viewTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#edf6ffcc',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#4facfe',
    shadowColor: '#4facfe',
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 2,
    marginRight: 10,
  },
  ticketBtnText: {
    color: '#0f52ba',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ffeaea',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4c4c',
  },
  cancelBtnText: {
    color: '#ff4c4c',
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 18,
    fontSize: 21,
    color: '#b1b7cc',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  emptyHint: {
    marginTop: 4,
    fontSize: 14,
    color: '#7f97c9',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 30, 60, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  ticketModalCard: {
    width: '100%',
    backgroundColor: '#f8fbff',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#4facfe',
    shadowOpacity: 0.21,
    shadowRadius: 18,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  ticketTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0f52ba',
    marginLeft: 8,
  },
  ticketDetails: {
    width: '100%',
    marginBottom: 24,
  },
  ticketLabel: {
    color: '#457B9D',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  ticketValue: {
    fontSize: 17,
    color: '#1D3557',
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  statusConfirmed: {
    color: '#18C964',
  },
  statusPending: {
    color: '#b08804',
  },
  closeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D3557',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 28,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 9,
    letterSpacing: 0.2,
  },
});

export default Bookings;