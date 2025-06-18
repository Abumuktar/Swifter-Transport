import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const goToDashboard = () => navigation.navigate('Dashboard');
  const goToWallet = () => navigation.navigate('Wallet');
  const handleSupport = () => navigation.navigate('HelpCentre');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Hi, Isma'il 👋</Text>
        <Text style={styles.bannerSubtitle}>Let’s manage your deliveries smarter</Text>
      </View>

      {/* Primary Actions */}
      <View style={styles.primaryActions}>
        <ActionButton icon="grid-outline" label="Dashboard" onPress={goToDashboard} />
        <ActionButton icon="wallet-outline" label="Wallet" onPress={goToWallet} />
      </View>

      {/* Deliveries Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚚 Ongoing Deliveries</Text>
        <DeliveryCard
          courier="Idris Ibrahim"
          status="In Transit"
          eta="Today, 3:00 PM"
        />
        <DeliveryCard
          courier="Fatima Hassan"
          status="Out for Delivery"
          eta="ETA: 5:45 PM"
        />
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 Recent Activity</Text>
        <ActivityItem icon="location-outline" text="Picked up from Zaria" />
        <ActivityItem icon="cash-outline" text="₦350 credited to wallet" />
        <ActivityItem icon="checkmark-done-outline" text="Delivered to Kaduna" />
      </View>

      {/* Support CTA */}
      <TouchableOpacity style={styles.supportBox} onPress={handleSupport}>
        <MaterialIcons name="support-agent" size={24} color="#fff" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>Our team is available 24/7</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Components
const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#fff" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

const DeliveryCard = ({ courier, status, eta }) => (
  <View style={styles.card}>
    <Ionicons name="bicycle-outline" size={24} color="#4facfe" />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.deliveryTitle}>Courier: {courier}</Text>
      <Text style={styles.deliveryStatus}>{status}</Text>
      <Text style={styles.deliveryETA}>{eta}</Text>
    </View>
  </View>
);

const ActivityItem = ({ icon, text }) => (
  <View style={styles.activityItem}>
    <Ionicons name={icon} size={20} color="#4facfe" />
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  banner: {
    marginBottom: 30,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1D3557',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#457B9D',
    marginTop: 4,
  },
  primaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4facfe',
    marginHorizontal: 5,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    marginTop: 6,
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffffee',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D3557',
  },
  deliveryStatus: {
    color: '#2D9CDB',
    fontSize: 13,
    marginTop: 2,
  },
  deliveryETA: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  supportBox: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  supportTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  supportText: {
    color: '#f1f1f1',
    fontSize: 13,
  },
});

export default Home;