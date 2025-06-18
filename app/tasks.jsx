import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Static mock data (should match the IDs in [id].jsx)
const tasks = [
  {
    id: '45321',
    recipient: 'Amina Yusuf',
    address: '12 Unity Road, Kano',
    status: 'Active',
    parcel: 'Envelope',
    eta: '15 mins',
    avatarColor: '#4facfe',
    started: true,
    notes: 'Please call upon arrival.',
    phone: '+2348012345678',
    lastUpdated: '2025-05-28 11:12',
  },
  {
    id: '45333',
    recipient: 'James Okoro',
    address: '45 Western Ave, Gwarinpa',
    status: 'Active',
    parcel: 'Medium Box',
    eta: '25 mins',
    avatarColor: '#457B9D',
    started: false,
    notes: '',
    phone: '+2348022245678',
    lastUpdated: '2025-05-28 09:45',
  },
  {
    id: '45337',
    recipient: 'Fatima Bello',
    address: 'Main Market, Kaduna',
    status: 'Completed',
    parcel: 'Small Parcel',
    eta: 'Delivered',
    avatarColor: '#1D3557',
    started: false,
    notes: 'Leave at reception.',
    phone: '+2348033345678',
    lastUpdated: '2025-05-27 18:37',
    completedAt: '2025-05-27 18:30',
    proof: { type: 'signature', value: 'Signed by F. Bello' },
    feedback: 'Smooth delivery. No issues.',
  },
];

export default function TasksScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            onPress={() => router.push(`/${task.id}`)}
            style={styles.cardWrapper}
            activeOpacity={0.85}
          >
            <Card style={[styles.card, { borderLeftColor: task.avatarColor }]} elevation={2}>
              <Card.Content>
                <Text style={styles.recipient}>{task.recipient}</Text>
                <Text style={styles.address}>{task.address}</Text>
                <Text>Status: {task.status}</Text>
                <Text style={styles.eta}>{task.eta}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: 0 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4facfe",
    padding: 24,
    paddingBottom: 10,
    letterSpacing: 0.3,
  },
  list: { paddingBottom: 30, paddingHorizontal: 12 },
  cardWrapper: { marginBottom: 16 },
  card: {
    borderRadius: 16,
    borderLeftWidth: 7,
    backgroundColor: "#fff",
  },
  recipient: { fontWeight: 'bold', fontSize: 17, color: '#1D3557' },
  address: { color: '#457B9D', marginBottom: 4 },
  eta: { color: '#FFA726', fontWeight: '600', marginTop: 4 },
});