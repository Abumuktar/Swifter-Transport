import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const toggleMenu = () => {
    menuVisible ? closeMenu() : openMenu();
  };

  const [userProfile] = useState({
    name: "Isma'il Sa'id",
    email: 'ismeed@gmail.com',
    totalRides: 120,
    totalEarnings: '$5000',
    walletBalance: '$1500',
    tickets: 4,
    bookings: 7,
    couriers: 3,
  });

  useEffect(() => {
    Animated.loop(
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
    ).start();

    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1000,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {menuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
      )}

      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity onPress={() => { closeMenu(); navigation.navigate('Ticket'); }} style={styles.menuItem}>
          <Ionicons name="ticket-outline" size={24} color="#4facfe" />
          <Text style={styles.menuText}>Buy Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { closeMenu(); navigation.navigate('TrackCourier'); }} style={styles.menuItem}>
          <Ionicons name="bicycle-outline" size={24} color="#4facfe" />
          <Text style={styles.menuText}>Track Courier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { closeMenu(); navigation.navigate('CreateCourierAccount'); }} style={styles.menuItem}>
          <Ionicons name="person-add-outline" size={24} color="#4facfe" />
          <Text style={styles.menuText}>Courier Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { closeMenu(); navigation.navigate('Emergency'); }} style={styles.menuItem}>
          <Ionicons name="warning-outline" size={24} color="red" />
          <Text style={styles.menuText}>Emergency</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoAbsoluteContainer}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoAnim,
                transform: [{ scale: logoAnim }],
              },
            ]}
          >
            <Image
              source={require('../assets/images/3.png')}
              style={styles.logo}
            />
          </Animated.View>
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notification')}
        >
          <Animated.View style={[styles.badgePulse, { transform: [{ scale: pulseAnimation }] }]} />
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={80} color="#4facfe" />
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileEmail}>{userProfile.email}</Text>
      </View>

      {/* QUICK ACCESS */}
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

      {/* FOOTER */}
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
    zIndex: 100,
    minHeight: 80,
  },
  logoAbsoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70, // Match logo height or slightly larger
    top: 20,
    zIndex: 0,
    pointerEvents: 'none', // Ensures no interference with side icons
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 70,
  },
  logo: {
    width: 250,
    height: 70,
    resizeMode: 'contain',
  },
  iconButton: {
    padding: 8,
    zIndex: 101,
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 199,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 200,
    elevation: 15,
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
});

export default Dashboard;