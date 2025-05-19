import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const dummyNotifications = [
  { id: '1', message: 'Your booking has been confirmed!', time: '2 mins ago', read: false },
  { id: '2', message: 'New ride request received.', time: '10 mins ago', read: false },
  { id: '3', message: 'Wallet topped up with $100.', time: '1 hour ago', read: true },
  { id: '4', message: 'Your ticket has been used.', time: '2 hours ago', read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications from API
    setTimeout(() => {
      setNotifications(dummyNotifications);
    }, 1000);
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.notificationItem, item.read ? styles.read : styles.unread]}>
      <Ionicons
        name={item.read ? 'checkmark-done-outline' : 'notifications'}
        size={22}
        color={item.read ? '#aaa' : '#4facfe'}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={clearNotifications} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      {/* Notifications List or Empty State */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={60} color="#bbb" />
          <Text style={styles.emptyText}>You're all caught up!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  clearText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#fff',
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
  },
  read: {
    borderLeftWidth: 4,
    borderLeftColor: '#ccc',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 10,
  },
});

export default Notifications;
