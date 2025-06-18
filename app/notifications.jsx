import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Divider, Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sample notifications data for demonstration
const sampleNotifications = [
  {
    id: 'n1',
    title: 'New Delivery Assigned',
    message: 'You have been assigned a new delivery to Amina Yusuf at 12 Unity Road, Kano.',
    time: '2 mins ago',
    type: 'assignment',
    icon: 'navigate',
    color: '#4facfe',
    isRead: false,
  },
  {
    id: 'n2',
    title: 'Payment Received',
    message: '₦2,500 has been credited to your Swifter wallet for parcel #45321.',
    time: '1 hour ago',
    type: 'payment',
    icon: 'cash',
    color: '#457B9D',
    isRead: false,
  },
  {
    id: 'n3',
    title: 'Delivery Completed',
    message: 'You successfully delivered parcel #45333 to James Okoro, Gwarinpa.',
    time: '3 hours ago',
    type: 'status',
    icon: 'checkmark-done',
    color: '#1D3557',
    isRead: true,
  },
  {
    id: 'n4',
    title: 'App Update',
    message: 'A new version of Swifter is available. Update now for the latest features.',
    time: 'Yesterday',
    type: 'info',
    icon: 'information-circle',
    color: '#FFA726',
    isRead: true,
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const router = useRouter();

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  // Dismiss a notification (for demo)
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#1D3557" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Button
          compact
          uppercase={false}
          style={styles.markReadBtn}
          labelStyle={{ color: '#4facfe', fontWeight: 'bold', fontSize: 13 }}
          onPress={markAllAsRead}
          disabled={notifications.every((n) => n.isRead)}
        >
          Mark all as read
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 ? (
          <View style={styles.emptyBlock}>
            <Ionicons name="notifications-off" size={48} color="#457B9D" />
            <Text style={styles.emptyText}>No notifications yet.</Text>
          </View>
        ) : (
          notifications.map((n) => (
            <Card
              key={n.id}
              style={[
                styles.notificationCard,
                !n.isRead && { borderColor: n.color, borderWidth: 1.3 },
              ]}
              elevation={n.isRead ? 1 : 3}
            >
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon
                  icon={n.icon}
                  size={40}
                  color="#fff"
                  style={[
                    styles.avatar,
                    { backgroundColor: n.color, opacity: n.isRead ? 0.7 : 1 },
                  ]}
                />
                <View style={styles.infoBlock}>
                  <View style={styles.topRow}>
                    <Text
                      style={[
                        styles.title,
                        { color: n.isRead ? '#457B9D' : '#1D3557' },
                      ]}
                    >
                      {n.title}
                    </Text>
                    {!n.isRead && (
                      <View style={styles.unreadDot} />
                    )}
                  </View>
                  <Text style={styles.message}>{n.message}</Text>
                  <View style={styles.timeRow}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color="#b0b8c1"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.time}>{n.time}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => dismissNotification(n.id)}
                  style={styles.dismissBtn}
                  accessibilityLabel="Dismiss notification"
                >
                  <Ionicons name="close" size={21} color="#b0b8c1" />
                </TouchableOpacity>
              </Card.Content>
              <Divider style={styles.divider} />
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 38,
    paddingBottom: 6,
    paddingHorizontal: 12,
    width: '100%',
    marginBottom: 5,
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
    flex: 1,
    letterSpacing: 0.5,
  },
  markReadBtn: {
    backgroundColor: 'transparent',
    elevation: 0,
    marginLeft: 3,
    marginTop: 3,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 15,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 2,
    borderWidth: 1.1,
    borderColor: '#F1FAEE',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 2,
  },
  avatar: {
    marginRight: 16,
    elevation: 2,
  },
  infoBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 15.5,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  unreadDot: {
    width: 10,
    height: 10,
    backgroundColor: '#4facfe',
    borderRadius: 8,
    alignSelf: 'center',
    marginLeft: 7,
    marginTop: 1,
  },
  message: {
    color: '#457B9D',
    fontSize: 14,
    marginBottom: 2,
    marginTop: 3,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  time: {
    color: '#b0b8c1',
    fontSize: 12,
    fontWeight: '600',
  },
  dismissBtn: {
    marginLeft: 10,
    marginTop: 3,
    padding: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1FAEE',
    marginTop: 8,
    borderRadius: 2,
  },
  emptyBlock: {
    alignItems: 'center',
    marginTop: 56,
  },
  emptyText: {
    color: '#457B9D',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
  },
});