import React from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Divider, Avatar, Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Replace DeliveryContext with local state for demonstration.
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
  const [availableDeliveries, setAvailableDeliveries] = React.useState(initialDeliveries);
  const [snackbar, setSnackbar] = React.useState({ visible: false, text: '' });
  const [modal, setModal] = React.useState({ visible: false, delivery: null });

  const handleShowDetails = (delivery) => {
    setModal({ visible: true, delivery });
  };

  const handleHideModal = () => setModal({ visible: false, delivery: null });

  const handleStart = (delivery) => {
    setAvailableDeliveries((prev) => prev.filter((d) => d.id !== delivery.id));
    setSnackbar({ visible: true, text: `Delivery for ${delivery.recipient} has started!` });
    handleHideModal();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Start New Delivery</Text>
      <Text style={styles.subtitle}>Select a delivery below to get started.</Text>

      <View style={styles.listContainer}>
        {availableDeliveries.length === 0 ? (
          <Text style={styles.emptyText}>No available deliveries.</Text>
        ) : (
          availableDeliveries.map((delivery) => (
            <Card key={delivery.id} style={styles.deliveryCard} elevation={3}>
              <TouchableOpacity
                style={{flex: 1}}
                activeOpacity={0.7}
                onPress={() => handleShowDetails(delivery)}
              >
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
                    onPress={() => handleShowDetails(delivery)}
                    contentStyle={{ height: 38 }}
                  >
                    Start
                  </Button>
                </Card.Content>
              </TouchableOpacity>
              <Divider style={styles.divider} />
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

      {/* Professional Modal for Delivery Details */}
      <Modal
        visible={modal.visible}
        transparent
        animationType="fade"
        onRequestClose={handleHideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Avatar.Text
              size={62}
              label={
                modal.delivery
                  ? modal.delivery.recipient.split(' ').map(n => n[0]).join('')
                  : ''
              }
              style={[
                styles.modalAvatar,
                { backgroundColor: modal.delivery?.avatarColor || '#4facfe' },
              ]}
              color="#fff"
            />
            <Text style={styles.modalRecipient}>
              {modal.delivery?.recipient}
            </Text>
            <Text style={styles.modalAddress}>
              {modal.delivery?.address}
            </Text>
            <View style={styles.modalDetailRow}>
              <Ionicons name="cube-outline" size={19} color="#4facfe" />
              <Text style={styles.modalDetailText}>
                {modal.delivery?.parcel}
              </Text>
            </View>
            <View style={styles.modalMetaRow}>
              <View style={styles.modalMetaItem}>
                <Ionicons name="location-outline" size={17} color="#457B9D" />
                <Text style={styles.modalMetaText}>
                  {modal.delivery?.distance}
                </Text>
              </View>
              <View style={styles.modalMetaItem}>
                <Ionicons name="time-outline" size={17} color="#1D3557" />
                <Text style={styles.modalMetaText}>
                  {modal.delivery?.eta}
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              style={styles.modalStartButton}
              onPress={() => handleStart(modal.delivery)}
              contentStyle={{ paddingVertical: 6, minHeight: 38 }}
              labelStyle={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}
              icon="play-circle-outline"
            >
              Start Delivery
            </Button>
            <Button
              mode="text"
              style={styles.modalCancelButton}
              onPress={handleHideModal}
              labelStyle={{ color: "#457B9D", fontWeight: "600" }}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
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
  listContainer: {
    gap: 18,
    marginTop: 2,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30,36,58,0.17)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    paddingTop: 25,
    alignItems: 'center',
    width: '85%',
    elevation: 18,
    shadowColor: '#1D3557',
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  modalAvatar: {
    marginBottom: 10,
    elevation: 3,
  },
  modalRecipient: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 3,
    textAlign: "center",
  },
  modalAddress: {
    color: '#457B9D',
    fontSize: 15,
    marginBottom: 11,
    textAlign: "center",
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    gap: 7,
  },
  modalDetailText: {
    marginLeft: 5,
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 15,
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 18,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 10,
  },
  modalMetaText: {
    marginLeft: 2,
    color: '#1D3557',
    fontSize: 14,
    fontWeight: '600',
  },
  modalStartButton: {
    backgroundColor: '#4facfe',
    borderRadius: 9,
    marginTop: 4,
    marginBottom: 2,
    elevation: 2,
    minWidth: 150,
  },
  modalCancelButton: {
    marginTop: 4,
  },
});

export default StartDelivery;