import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { Text, Avatar, Card, Button, Title, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const initialDeliveries = [
  {
    id: '45321',
    title: 'Delivery to: Aliyu Street',
    subtitle: 'Parcel #45321 • ETA: 15 mins',
    delivered: false,
  },
  {
    id: '45333',
    title: 'Delivery to: Katsina Plaza',
    subtitle: 'Parcel #45333 • ETA: 25 mins',
    delivered: false,
  },
];

const CourierDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [location, setLocation] = useState(null);
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [blockedIds, setBlockedIds] = useState([]); // to block routing after delivered
  const [showDeliveredModal, setShowDeliveredModal] = useState(false); // modal state
  const router = useRouter();

  const toggleOnlineStatus = () => setIsOnline((prev) => !prev);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Professional Alert for location
        setShowDeliveredModal(true);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleMarkDelivered = (id) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, delivered: true } : d
      )
    );
    setBlockedIds(prev => [...prev, id]);
  };

  // Routing is only allowed if not delivered
  const handleTaskCardPress = (id, delivered) => {
    if (delivered) {
      setShowDeliveredModal(true);
    } else {
      router.push(`/dashboard/task/${id}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>Isma'il Sa'id</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile & Online Status */}
      <View style={styles.profileCard}>
        <Avatar.Image source={require('../assets/images/profile.png')} size={60} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.statusLabel}>Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
            <Switch
              value={isOnline}
              onValueChange={toggleOnlineStatus}
              thumbColor={isOnline ? '#4facfe' : '#ccc'}
            />
          </View>
        </View>
      </View>

      {/* Real-time Map */}
      <Text style={styles.sectionTitle}>Your Current Location</Text>
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
          >
            <Marker coordinate={location} title="You" />
          </MapView>
        ) : (
          <Text style={{ textAlign: 'center', color: '#777' }}>Fetching location...</Text>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="cube-outline" size={24} color="#4facfe" />
            <Text style={styles.statLabel}>Deliveries</Text>
            <Title>12</Title>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="cash-outline" size={24} color="#4facfe" />
            <Text style={styles.statLabel}>Earnings</Text>
            <Title>$124.50</Title>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Ionicons name="star-outline" size={24} color="#4facfe" />
            <Text style={styles.statLabel}>Rating</Text>
            <Title>4.8</Title>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('start-delivery')}
        >
          <Ionicons name="navigate-outline" size={30} color="#4facfe" />
          <Text style={styles.actionText}>Start Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('map')}
        >
          <Ionicons name="map-outline" size={30} color="#4facfe" />
          <Text style={styles.actionText}>View Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('tasks')}
        >
          <Ionicons name="clipboard-outline" size={30} color="#4facfe" />
          <Text style={styles.actionText}>My Tasks</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <Text style={styles.sectionTitle}>Active Deliveries</Text>
      {deliveries.map((d) => (
        <Card
          key={d.id}
          style={styles.taskCard}
          onPress={() => handleTaskCardPress(d.id, d.delivered)}
        >
          <Card.Content>
            <Text style={styles.taskTitle}>{d.title}</Text>
            <Text style={styles.taskSubtitle}>{d.subtitle}</Text>
            <Divider style={{ marginVertical: 10 }} />
            <Button
              mode="contained"
              style={[
                styles.deliverButton,
                d.delivered && styles.deliveredButton,
              ]}
              disabled={d.delivered}
              onPress={() => handleMarkDelivered(d.id)}
              icon={d.delivered ? "check-circle-outline" : undefined}
            >
              {d.delivered ? 'Delivered' : 'Mark as Delivered'}
            </Button>
          </Card.Content>
        </Card>
      ))}

      {/* Professional Modal for Already Delivered */}
      <Modal
        visible={showDeliveredModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowDeliveredModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-done-circle" size={54} color="#11b674" style={{ marginBottom: 16 }} />
            <Text style={styles.modalTitleText}>Already Delivered</Text>
            <Text style={styles.modalDescText}>
              This delivery has already been marked as delivered.
            </Text>
            <Button
              mode="contained"
              style={styles.modalBtn}
              onPress={() => setShowDeliveredModal(false)}
              labelStyle={{ color: "#FFF" }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CourierDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#4facfe',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  statusLabel: {
    color: '#888',
    fontSize: 14,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1D3557',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  taskCard: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557',
  },
  taskSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  deliverButton: {
    backgroundColor: '#4facfe',
    borderRadius: 10,
    marginTop: 10,
  },
  deliveredButton: {
    backgroundColor: '#11b674',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40,57,83,0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    width: '80%',
    elevation: 18,
    shadowColor: '#1D3557',
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  modalTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#11b674',
    marginBottom: 7,
    textAlign: "center",
  },
  modalDescText: {
    color: '#457B9D',
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 6,
    alignSelf: "center"
  }
});