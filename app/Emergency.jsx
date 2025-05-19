import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const EmergencyScreen = () => {
  const navigation = useNavigation();

  const handleAction = (type) => {
    if (type === 'Call') {
      Linking.openURL('tel:112');
    } else {
      Alert.alert(`${type} Activated`, `Your ${type} request has been processed.`);
    }
  };

  return (
    <LinearGradient colors={['#ff4e50', '#f9d423']} style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="alarm-light-outline" size={60} color="#fff" />
          <Text style={styles.title}>Emergency Center</Text>
          <Text style={styles.subtitle}>Quick support when it matters most</Text>
        </View>

        {/* Location */}
        <View style={styles.locationBox}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.locationText}>Latitude: 12.989 | Longitude: 7.610 (Katsina)</Text>
        </View>

        {/* Emergency Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#4facfe' }]} onPress={() => handleAction('Call')}>
            <MaterialIcons name="local-phone" size={32} color="#fff" />
            <Text style={styles.cardText}>Call Emergency</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#d32f2f' }]} onPress={() => handleAction('SOS')}>
            <Ionicons name="alert-circle-outline" size={32} color="#fff" />
            <Text style={styles.cardText}>Activate SOS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#fbc02d' }]} onPress={() => handleAction('Alert Agents')}>
            <Ionicons name="flame-outline" size={32} color="#fff" />
            <Text style={styles.cardText}>Fire Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#8e24aa' }]} onPress={() => handleAction('Medical')}>
            <Ionicons name="medkit-outline" size={32} color="#fff" />
            <Text style={styles.cardText}>Medical Help</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Safety Tips</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipScroll}>
            {[
              { icon: 'medkit-outline', color: '#4facfe', text: 'Apply pressure to bleeding wounds.' },
              { icon: 'flame-outline', color: '#ff6a00', text: 'Crawl low in smoke.' },
              { icon: 'walk-outline', color: '#34c759', text: 'Stay calm and move to safety.' },
              { icon: 'call-outline', color: '#e53935', text: 'Contact emergency lines quickly.' },
            ].map((tip, index) => (
              <View key={index} style={styles.tipCard}>
                <Ionicons name={tip.icon} size={24} color={tip.color} />
                <Text style={styles.tipText}>{tip.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Requests</Text>
          <View style={styles.historyBox}>
            <Text style={styles.historyItem}>• SOS Activated - Apr 28, 3:20 PM 🚨</Text>
            <Text style={styles.historyItem}>• Medical Help - Apr 20, 10:20 AM 🏥</Text>
            <Text style={styles.historyItem}>• Call Placed - Apr 10, 4:10 PM 📞</Text>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Help Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => Alert.alert("Need Help?", "We're here for you.")}>
        <Ionicons name="help-circle" size={30} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    width: screenWidth * 0.42,
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  cardText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  tipScroll: {
    flexDirection: 'row',
  },
  tipCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    width: 180,
  },
  tipText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 13,
  },
  historyBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
  },
  historyItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  backText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#ff4e50',
    borderRadius: 30,
    padding: 14,
    elevation: 6,
  },
});

export default EmergencyScreen;
