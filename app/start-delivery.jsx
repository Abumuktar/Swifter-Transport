import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider, Avatar, Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const initialDeliveries = [
  {
    id: '90001',
    recipient: 'Amina Yusuf',
    address: '12 Unity Road, Kano',
    parcel: 'Envelope',
    distance: '2.1km',
    eta: '12 mins',
    avatarColor: '#4facfe',
  },
  {
    id: '90002',
    recipient: 'James Okoro',
    address: '45 Western Ave, Gwarinpa',
    parcel: 'Medium Box',
    distance: '4.5km',
    eta: '22 mins',
    avatarColor: '#457B9D',
  },
  {
    id: '90003',
    recipient: 'Fatima Bello',
    address: 'Main Market, Kaduna',
    parcel: 'Small Parcel',
    distance: '3.0km',
    eta: '16 mins',
    avatarColor: '#1D3557',
  },
];

const StartDelivery = () => {
  const [availableDeliveries, setAvailableDeliveries] = useState(initialDeliveries);
  const [startedDeliveries, setStartedDeliveries] = useState([]);
  const [snackbar, setSnackbar] = useState({ visible: false, text: '' });

  const handleStart = (delivery) => {
    setAvailableDeliveries(deliveries => deliveries.filter(d => d.id !== delivery.id));
    setStartedDeliveries(tasks => [delivery, ...tasks]);
    setSnackbar({ visible: true, text: `Delivery for ${delivery.recipient} has started!` });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Start New Delivery</Text>
      <Text style={styles.subtitle}>Select a delivery below to get started.</Text>

      {/* AVAILABLE DELIVERIES */}
      <Text style={styles.sectionTitle}>Available Deliveries</Text>
      <View style={styles.listContainer}>
        {availableDeliveries.length === 0 ? (
          <Text style={styles.emptyText}>No available deliveries.</Text>
        ) : (
          availableDeliveries.map((delivery) => (
            <Card key={delivery.id} style={styles.deliveryCard} elevation={3}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Text
                  size={48}
                  label={delivery.recipient.split(' ').map(n => n[0]).join('')}
                  style={[styles.avatar, { backgroundColor: delivery.avatarColor }]}
                  color="#fff"
                />
                <View style={styles.deliveryInfo}>
                  <Text style={styles.recipient}>{delivery.recipient}</Text>
                  <Text style={styles.address}>{delivery.address}</Text>
                  <View style={styles.parcelRow}>
                    <Ionicons name="cube-outline" size={18} color="#4facfe" />
                    <Text style={styles.parcel}>{delivery.parcel}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="location-outline" size={16} color="#457B9D" />
                      <Text style={styles.metaText}>{delivery.distance}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={16} color="#1D3557" />
                      <Text style={styles.metaText}>{delivery.eta}</Text>
                    </View>
                  </View>
                </View>
                <Button
                  mode="contained"
                  style={styles.startButton}
                  labelStyle={{ fontWeight: 'bold' }}
                  onPress={() => handleStart(delivery)}
                  contentStyle={{ height: 38 }}
                >
                  Start
                </Button>
              </Card.Content>
              <Divider style={styles.divider} />
            </Card>
          ))
        )}
      </View>

      {/* STARTED DELIVERIES */}
      <Text style={styles.sectionTitle}>Started Deliveries</Text>
      <View style={styles.listContainer}>
        {startedDeliveries.length === 0 ? (
          <Text style={styles.emptyText}>No started deliveries yet.</Text>
        ) : (
          startedDeliveries.map((delivery) => (
            <Card key={delivery.id} style={styles.startedCard} elevation={2}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Text
                  size={48}
                  label={delivery.recipient.split(' ').map(n => n[0]).join('')}
                  style={[styles.avatar, { backgroundColor: delivery.avatarColor }]}
                  color="#fff"
                />
                <View style={styles.deliveryInfo}>
                  <Text style={styles.recipient}>{delivery.recipient}</Text>
                  <Text style={styles.address}>{delivery.address}</Text>
                  <Text style={styles.inProgress}>In Progress</Text>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </View>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={1300}
      >
        {snackbar.text}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    backgroundColor: '#F8F8F8',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#457B9D',
    marginBottom: 18,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 17,
    color: '#1D3557',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    gap: 18,
    marginBottom: 20,
  },
  deliveryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 2,
    borderWidth: 1.1,
    borderColor: '#F1FAEE',
  },
  startedCard: {
    backgroundColor: '#EAF4FB',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 2,
    borderWidth: 1.1,
    borderColor: '#C9E7FB',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
  },
  avatar: {
    marginRight: 16,
    elevation: 2,
  },
  deliveryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  inProgress: {
    color: '#457B9D',
    fontSize: 12,
    marginTop: 3,
    fontWeight: '600',
  },
  recipient: {
    color: '#1D3557',
    fontWeight: '700',
    fontSize: 16.5,
    marginBottom: 2,
  },
  address: {
    color: '#457B9D',
    fontSize: 14,
    marginBottom: 3,
  },
  parcelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 3,
  },
  parcel: {
    marginLeft: 5,
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 13.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 10,
  },
  metaText: {
    marginLeft: 2,
    color: '#1D3557',
    fontSize: 13,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#4facfe',
    borderRadius: 8,
    marginLeft: 14,
    marginRight: 2,
    minWidth: 72,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1FAEE',
    marginTop: 8,
    borderRadius: 2,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default StartDelivery;