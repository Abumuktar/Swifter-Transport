import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Button, Chip, Divider } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

// --- Move this array to a separate file for true reusability if needed
const allTasks = [
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

// --- Helper to get task by ID
const getTaskById = id => allTasks.find(t => String(t.id) === String(id));

const STATUS_COLORS = {
  Active: '#4facfe',
  Completed: '#1D3557',
  Pending: '#FFA726',
};

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // <- This grabs the URL param!
  const task = getTaskById(id);

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#457B9D', fontSize: 18, fontWeight: '700' }}>Task not found.</Text>
        <Button mode="contained" style={styles.returnBtn} onPress={() => router.push('/tasks')}>
          Return to Tasks
        </Button>
      </View>
    );
  }

  const isCompleted = task.status === 'Completed';
  const isStarted = !!task.started && !isCompleted;

  const handleStart = () =>
    Alert.alert('Start Delivery', 'Confirm you want to start this delivery?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Start',
        style: 'default',
        onPress: () => {
          Alert.alert('Started', 'Delivery started.');
        },
      },
    ]);
  const handleContinue = () => Alert.alert('Continue', 'Continue delivery process...');
  const handleMarkComplete = () =>
    Alert.alert('Complete Delivery', 'Mark this delivery as completed?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Complete',
        style: 'default',
        onPress: () => {
          Alert.alert('Completed', 'Delivery marked as completed.');
        },
      },
    ]);
  const handleFeedback = () => Alert.alert('Feedback', 'Leave feedback for this delivery.');
  const handleContact = () =>
    Alert.alert('Contact Recipient', `Call ${task.recipient} at ${task.phone}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Call',
        style: 'default',
        onPress: () => {},
      },
    ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/tasks')}>
          <Ionicons name="arrow-back" size={28} color="#1D3557" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <Chip
          style={[
            styles.statusChip,
            { backgroundColor: STATUS_COLORS[task.status] || '#e0e0e0' },
          ]}
          textStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}
          icon={isCompleted ? 'check-circle-outline' : 'walk'}
        >
          {task.status}
        </Chip>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.detailCard} elevation={2}>
          <Card.Content>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={22} color="#4facfe" />
              <Text style={styles.infoLabel}>Recipient</Text>
              <Text style={styles.infoValue}>{task.recipient}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={22} color="#457B9D" />
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{task.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="cube-outline" size={22} color="#1D3557" />
              <Text style={styles.infoLabel}>Parcel</Text>
              <Text style={styles.infoValue}>{task.parcel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={22} color="#4facfe" />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{task.phone}</Text>
              <TouchableOpacity style={styles.contactBtn} onPress={handleContact}>
                <MaterialIcons name="phone" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons
                  name={isCompleted ? 'checkmark-done' : 'time-outline'}
                  size={16}
                  color="#457B9D"
                />
                <Text style={styles.metaText}>
                  {isCompleted ? 'Delivered' : 'ETA'}: {task.eta}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={16} color="#1D3557" />
                <Text style={styles.metaText}>
                  {isCompleted
                    ? `Completed: ${task.completedAt || task.lastUpdated}`
                    : `Updated: ${task.lastUpdated}`}
                </Text>
              </View>
            </View>
            {task.notes ? (
              <View style={styles.notesBlock}>
                <Ionicons name="information-circle-outline" size={17} color="#4facfe" />
                <Text style={styles.notesText}>{task.notes}</Text>
              </View>
            ) : null}
            {isCompleted && task.proof && (
              <View style={styles.proofBlock}>
                <Ionicons name="document-text-outline" size={18} color="#1D3557" />
                <Text style={styles.proofText}>
                  {task.proof.type === 'signature'
                    ? `Signed: ${task.proof.value}`
                    : 'Proof of delivery available.'}
                </Text>
              </View>
            )}
            {isCompleted && task.feedback && (
              <View style={styles.feedbackBlock}>
                <Ionicons name="chatbox-ellipses-outline" size={18} color="#457B9D" />
                <Text style={styles.feedbackText}>Feedback: {task.feedback}</Text>
              </View>
            )}
            {/* Actions Section */}
            <View style={styles.buttonRow}>
              {!isCompleted && !isStarted && (
                <Button
                  mode="contained"
                  style={styles.actionBtn}
                  onPress={handleStart}
                  labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                  contentStyle={{ height: 44 }}
                  icon="play"
                >
                  Start
                </Button>
              )}
              {!isCompleted && isStarted && (
                <>
                  <Button
                    mode="contained"
                    style={[styles.actionBtn, { backgroundColor: '#FFA726' }]}
                    onPress={handleContinue}
                    labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                    contentStyle={{ height: 44 }}
                    icon="walk"
                  >
                    Continue
                  </Button>
                  <Button
                    mode="contained"
                    style={[styles.actionBtn, { backgroundColor: '#1D3557' }]}
                    onPress={handleMarkComplete}
                    labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                    contentStyle={{ height: 44 }}
                    icon="check"
                  >
                    Complete
                  </Button>
                </>
              )}
              {isCompleted && (
                <Button
                  mode="contained"
                  style={[styles.actionBtn, { backgroundColor: '#1D3557', flex: 1 }]}
                  onPress={handleFeedback}
                  labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                  contentStyle={{ height: 44 }}
                  icon="star"
                >
                  Leave Feedback
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 42,
    paddingBottom: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  backBtn: {
    padding: 4,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D3557',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
    marginLeft: -32,
  },
  statusChip: {
    height: 30,
    elevation: 0,
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 34,
    paddingTop: 2,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#F1FAEE',
    marginTop: 2,
    paddingTop: 2,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 7,
  },
  infoLabel: {
    color: '#457B9D',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
    marginRight: 2,
  },
  infoValue: {
    fontSize: 15.5,
    color: '#1D3557',
    fontWeight: '600',
    marginLeft: 2,
    flexShrink: 1,
  },
  contactBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 24,
    marginLeft: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 4,
    marginTop: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    marginLeft: 3,
    color: '#1D3557',
    fontSize: 12.5,
    fontWeight: '500',
  },
  notesBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 8,
    marginVertical: 6,
    gap: 7,
  },
  notesText: {
    color: '#1D3557',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  proofBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    gap: 7,
  },
  proofText: {
    color: '#457B9D',
    fontSize: 13.5,
    fontWeight: '500',
    flex: 1,
  },
  feedbackBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1FAEE',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    gap: 7,
  },
  feedbackText: {
    color: '#1D3557',
    fontSize: 13.5,
    fontStyle: 'italic',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 14,
    marginBottom: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actionBtn: {
    borderRadius: 10,
    backgroundColor: '#4facfe',
    minWidth: 128,
    elevation: 2,
    marginRight: 0,
    paddingHorizontal: 0,
    flex: 1,
  },
  centered: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnBtn: {
    marginTop: 18,
    backgroundColor: '#4facfe',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
});