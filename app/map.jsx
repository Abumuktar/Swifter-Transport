import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const deliveries = [
  {
    id: '45321',
    recipient: 'Amina Yusuf',
    address: '12 Unity Road, Kano',
    latitude: 12.0025,
    longitude: 8.5919,
    color: '#4facfe',
  },
  {
    id: '45333',
    recipient: 'James Okoro',
    address: '45 Western Ave, Gwarinpa',
    latitude: 9.1201,
    longitude: 7.4201,
    color: '#457B9D',
  },
  {
    id: '45337',
    recipient: 'Fatima Bello',
    address: 'Main Market, Kaduna',
    latitude: 10.5202,
    longitude: 7.4391,
    color: '#1D3557',
  },
];

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to view the map.');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  const handleMarkerPress = (d) => {
    setSelectedDelivery(d);
  };

  const handleLegendPress = (d) => {
    setSelectedDelivery(d);
  };

  const closeModal = () => {
    setSelectedDelivery(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#1D3557" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Map</Text>
      </View>

      <Card style={styles.mapCard} elevation={4}>
        {loading || !location ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4facfe" />
            <Text style={styles.loadingText}>Fetching your location...</Text>
          </View>
        ) : (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 2.5,
              longitudeDelta: 2.5,
            }}
            showsUserLocation
            customMapStyle={[
              { elementType: 'geometry', stylers: [{ color: '#F8F8F8' }] },
              { elementType: 'labels.text.stroke', stylers: [{ color: '#F1FAEE' }] },
              { elementType: 'labels.text.fill', stylers: [{ color: '#1D3557' }] },
            ]}
          >
            {/* User Marker */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You"
              description="Your current location"
              pinColor="#4facfe"
            >
              <Ionicons name="person" size={30} color="#4facfe" />
            </Marker>

            {/* Delivery Markers */}
            {deliveries.map((d) => (
              <Marker
                key={d.id}
                coordinate={{ latitude: d.latitude, longitude: d.longitude }}
                title={d.recipient}
                description={d.address}
                pinColor={d.color}
                onPress={() => handleMarkerPress(d)}
              >
                <Ionicons name="cube" size={26} color={d.color} />
              </Marker>
            ))}
          </MapView>
        )}
      </Card>

      {/* Delivery Legend */}
      <View style={styles.legendContainer}>
        {deliveries.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={styles.legendItem}
            onPress={() => handleLegendPress(d)}
          >
            <Ionicons name="cube" size={19} color={d.color} style={{ marginRight: 7 }} />
            <View style={styles.legendTextBlock}>
              <Text style={styles.legendRecipient}>{d.recipient}</Text>
              <Text style={styles.legendAddress}>{d.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for recipient details */}
      <Modal
        visible={!!selectedDelivery}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="cube" size={38} color={selectedDelivery?.color || "#4facfe"} style={{ marginBottom: 16 }} />
            <Text style={styles.modalRecipient}>{selectedDelivery?.recipient}</Text>
            <Text style={styles.modalAddress}>{selectedDelivery?.address}</Text>
            <Button
              style={styles.closeModalBtn}
              mode="contained"
              onPress={closeModal}
              labelStyle={{ color: "#FFF" }}
              icon="close"
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>

      <Button
        mode="contained"
        style={styles.refreshBtn}
        labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
        icon="refresh"
        onPress={() => {
          setLoading(true);
          Location.getCurrentPositionAsync({}).then(loc => {
            setLocation(loc.coords);
            setLoading(false);
          });
        }}
      >
        Refresh Location
      </Button>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 0,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 38,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 12,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D3557',
    letterSpacing: 0.5,
  },
  mapCard: {
    width: width - 28,
    height: 340,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 340,
  },
  loadingText: {
    color: '#457B9D',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  legendContainer: {
    width: width - 32,
    backgroundColor: '#F1FAEE',
    borderRadius: 16,
    marginHorizontal: 4,
    padding: 10,
    elevation: 2,
    marginBottom: 18,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  legendTextBlock: {
    flex: 1,
  },
  legendRecipient: {
    color: '#1D3557',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 1,
  },
  legendAddress: {
    color: '#457B9D',
    fontSize: 13,
    marginBottom: 3,
  },
  refreshBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 10,
    width: width - 32,
    alignSelf: 'center',
    marginBottom: 18,
    elevation: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40,57,83,0.13)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    width: width * 0.82,
    elevation: 18,
    shadowColor: '#1D3557',
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  modalRecipient: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 7,
    textAlign: "center",
  },
  modalAddress: {
    color: '#457B9D',
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeModalBtn: {
    backgroundColor: '#4facfe',
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 5,
    alignSelf: "center"
  }
});