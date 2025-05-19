import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-screenWidth))[0];

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const [userProfile] = useState({
    name: "Isma'il Sa'id",
    email: 'ismail@example.com',
    totalRides: 120,
    totalEarnings: '$5000',
    walletBalance: '$1500',
    tickets: 4,
    bookings: 7,
    couriers: 3,
  });

  const pulseAnimation = new Animated.Value(1);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([ 
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Slide-In Menu */}
      {menuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
      )}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('Ticket'); }} style={styles.menuItem}>
          <Ionicons name="ticket-outline" size={24} color="#4facfe" />
          <Text style={styles.menuText}>Buy Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('TrackCourier'); }} style={styles.menuItem}>
          <Ionicons name="bicycle-outline" size={24} color="#4facfe" />  {/* Updated icon */}
          <Text style={styles.menuText}>Track Courier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('CreateCourierAccount'); }} style={styles.menuItem}>
          <Ionicons name="person-add-outline" size={24} color="#4facfe" />
          <Text style={styles.menuText}>Create Courier Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate('Emergency'); }} style={styles.menuItem}>
          <Ionicons name="warning-outline" size={24} color="red" />  {/* Changed color to red */}
          <Text style={styles.menuText}>Emergency</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>ISMEED</Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notification')}
        >
          <Animated.View style={[styles.badgePulse, { transform: [{ scale: pulseAnimation }] }]} />
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={80} color="#4facfe" />
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileEmail}>{userProfile.email}</Text>
      </View>

      {/* Wallet & Tickets */}
      <View style={styles.quickAccessRow}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Wallet')}>
          <Ionicons name="wallet-outline" size={30} color="#4facfe" />
          <Text style={styles.quickText}>Wallet</Text>
          <Text style={styles.quickValue}>{userProfile.walletBalance}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Ticket')}>
          <Ionicons name="ticket-outline" size={30} color="#4facfe" />
          <Text style={styles.quickText}>Tickets</Text>
          <Text style={styles.quickValue}>{userProfile.tickets}</Text>
        </TouchableOpacity>
      </View>

      {/* Bookings & Courier */}
      <View style={styles.quickAccessRow}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Bookings')}>
          <Ionicons name="bookmarks-outline" size={30} color="#4facfe" />
          <Text style={styles.quickText}>Bookings</Text>
          <Text style={styles.quickValue}>{userProfile.bookings}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Courier')}>
          <Ionicons name="bicycle-outline" size={30} color="#4facfe" />
          <Text style={styles.quickText}>Courier</Text>
          <Text style={styles.quickValue}>{userProfile.couriers}</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#4facfe" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HelpCentre')}>
          <Ionicons name="help-circle-outline" size={24} color="#4facfe" />
          <Text style={styles.footerText}>Help Centre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#4facfe" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4facfe',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  badgePulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  quickCard: {
    backgroundColor: '#fff',
    width: '45%',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  quickText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  quickValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4facfe',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#4facfe',
    marginTop: 4,
  },
  // Slide-in Menu Styles
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 100,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Dashboard;
