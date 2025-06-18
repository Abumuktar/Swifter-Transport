import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const steps = [
  { id: 1, label: 'Order Received', time: '08:00 AM', completed: true },
  { id: 2, label: 'Courier Assigned', time: '09:00 AM', completed: true },
  { id: 3, label: 'Picked Up', time: '10:30 AM', completed: true },
  { id: 4, label: 'In Transit', time: '11:15 AM', completed: false },
  { id: 5, label: 'Out for Delivery', time: null, completed: false },
  { id: 6, label: 'Delivered', time: null, completed: false },
];

const CourierStatusScreen = ({ navigation }) => {
  // Example courier info - replace with real data from props or API
  const courierInfo = {
    courierName: 'John Doe',
    courierPhone: '+123 456 7890',
    vehicle: 'Honda Motorcycle',
    trackingId: 'CR123456789',
    currentStatus: 'In Transit',
    estimatedDelivery: 'Today, 2:00 PM',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Courier Status</Text>
        <View style={{ width: 28 }} /> 
        {/* placeholder for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tracking Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Tracking ID</Text>
          <Text style={styles.trackingId}>{courierInfo.trackingId}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="person-circle-outline" size={22} color="#4facfe" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Courier</Text>
              <Text style={styles.infoValue}>{courierInfo.courierName}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={22} color="#4facfe" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Contact</Text>
              <Text style={styles.infoValue}>{courierInfo.courierPhone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="bicycle-outline" size={22} color="#4facfe" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Vehicle</Text>
              <Text style={styles.infoValue}>{courierInfo.vehicle}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={22} color="#4facfe" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>{courierInfo.estimatedDelivery}</Text>
            </View>
          </View>
        </View>

        {/* Status Timeline */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Status Timeline</Text>
        <View style={styles.timelineContainer}>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <View key={step.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.circle,
                      step.completed ? styles.circleCompleted : styles.circlePending,
                    ]}
                  >
                    {step.completed && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                  {!isLast && <View style={styles.verticalLine} />}
                </View>
                <View style={styles.timelineRight}>
                  <Text
                    style={[
                      styles.stepLabel,
                      step.completed ? styles.stepCompleted : styles.stepPending,
                    ]}
                  >
                    {step.label}
                  </Text>
                  {step.time && <Text style={styles.stepTime}>{step.time}</Text>}
                </View>
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={22} color="#4facfe" />
            <Text style={styles.contactText}>Call Courier</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
            <Text style={styles.messageText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const circleSize = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4facfe',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    elevation: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  trackingId: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4facfe',
    marginBottom: 16,
    letterSpacing: 1.2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: '#777',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  timelineContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    width: circleSize,
    alignItems: 'center',
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: '#4facfe',
  },
  circlePending: {
    backgroundColor: '#ccc',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#4facfe',
    marginTop: 2,
  },
  timelineRight: {
    marginLeft: 16,
    flex: 1,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  stepCompleted: {
    color: '#4facfe',
  },
  stepPending: {
    color: '#aaa',
  },
  stepTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  contactButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4facfe',
    borderRadius: 30,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactText: {
    color: '#4facfe',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#4facfe',
    borderRadius: 30,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messageText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default CourierStatusScreen;
