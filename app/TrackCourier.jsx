import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const TrackCourierScreen = () => {
  const handleTrack = () => {
    Alert.alert("Tracking", "Fetching courier details...");
    // Implement API integration here
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome5 name="shipping-fast" size={30} color="#fff" />
          <Text style={styles.title}>Track Your Courier</Text>
          <Text style={styles.subtitle}>Stay updated with your delivery</Text>
        </View>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Tracking Number"
            placeholderTextColor="#ccc"
            style={styles.input}
          />
          <TouchableOpacity style={styles.trackButton} onPress={handleTrack}>
            <Ionicons name="search" size={20} color="#fff" />
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>

        {/* Tracking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.status}>🟢 In Transit</Text>
          <Text style={styles.courierInfo}>Courier: ISMEED Express</Text>
          <Text style={styles.eta}>Estimated Delivery: May 5, 2025</Text>
        </View>

        {/* Progress Tracker */}
        <View style={styles.tracker}>
          {['Ordered', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={[styles.circle, index <= 2 ? styles.activeStep : {}]}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={[styles.stepLabel, index <= 2 ? styles.activeText : {}]}>{step}</Text>
              {index < 4 && <View style={[styles.line, index < 2 ? styles.activeLine : {}]} />}
            </View>
          ))}
        </View>

        {/* Delivery Updates */}
        <View style={styles.timeline}>
          <Text style={styles.timelineTitle}>Delivery Updates</Text>
          <View style={styles.updateItem}>
            <MaterialIcons name="access-time" size={18} color="#fff" />
            <Text style={styles.updateText}>May 2, 3:00 PM – Package arrived at hub</Text>
          </View>
          <View style={styles.updateItem}>
            <MaterialIcons name="local-shipping" size={18} color="#fff" />
            <Text style={styles.updateText}>May 1, 10:00 AM – Picked up by courier</Text>
          </View>
          <View style={styles.updateItem}>
            <Ionicons name="cube-outline" size={18} color="#fff" />
            <Text style={styles.updateText}>Apr 30, 6:00 PM – Order processed</Text>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>Need help? </Text>
          <TouchableOpacity onPress={() => Alert.alert("Support", "Contacting support...")}>
            <Text style={styles.helpLink}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  trackButton: {
    backgroundColor: '#ff4e50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  summaryCard: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: 15,
  },
  status: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  courierInfo: {
    color: '#ddd',
    fontSize: 14,
  },
  eta: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  tracker: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    backgroundColor: '#ccc',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#00f2fe',
  },
  stepNumber: {
    color: '#000',
    fontWeight: 'bold',
  },
  stepLabel: {
    color: '#999',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
  },
  line: {
    height: 2,
    backgroundColor: '#aaa',
    position: 'absolute',
    top: 14,
    left: '50%',
    right: '-50%',
    zIndex: -1,
  },
  activeLine: {
    backgroundColor: '#00f2fe',
  },
  timeline: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: 15,
  },
  timelineTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateText: {
    color: '#eee',
    marginLeft: 10,
    fontSize: 14,
  },
  helpSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  helpText: {
    color: '#fff',
    fontSize: 14,
  },
  helpLink: {
    color: '#f9d423',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default TrackCourierScreen;
