import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const BRAND_PRIMARY = "#1D3557";
const BRAND_SECONDARY = "#4facfe";
const BRAND_ACCENT = "#457B9D";
const BRAND_BG = "#fff";
const BRAND_CARD = "#F8FBFF";
const BRAND_TEXT = "#222";
const BRAND_MUTED = "#A7B4C3";
const BRAND_SUCCESS = "#18C964";
const BRAND_SHADOW = "#e4eefa";

const { width } = Dimensions.get('window');

const TrackingDetailsScreen = ({ route, navigation }) => {
  const trackingId = route?.params?.trackingNumber || "N/A";
  const activeStep = 3; // "Out for Delivery"

  const [userLocation, setUserLocation] = useState(null);
  const [courierLocation, setCourierLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        setCourierLocation({
          latitude: loc.coords.latitude + 0.008,
          longitude: loc.coords.longitude + 0.012,
        });
      } else {
        setUserLocation({ latitude: 12.002, longitude: 8.530 });
        setCourierLocation({ latitude: 12.01, longitude: 8.545 });
      }
    })();
  }, []);

  // Robust back navigation
  const onBackPress = () => {
    if (navigation && navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Home'); // Replace 'Home' with your actual home screen name
    }
  };

  const navigateSupportSafe = () => {
    if (navigation && typeof navigation.navigate === "function") {
      navigation.navigate("SupportScreen");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={26} color={BRAND_PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery Details</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          <View style={styles.trackingIdRow}>
            <Text style={styles.trackingLabel}>Tracking ID</Text>
            <Text style={styles.trackingValue}>{trackingId}</Text>
          </View>
          <View style={styles.statusRow}>
            <Ionicons name="bicycle" size={28} color={BRAND_SECONDARY} />
            <Text style={styles.statusText}>Out for Delivery</Text>
          </View>
          <Text style={styles.deliveryDate}>
            Estimated Delivery: <Text style={{ color: BRAND_PRIMARY }}>May 5, 2025</Text>
          </Text>
          <View style={styles.deliveryInfoRow}>
            <FontAwesome5 name="shipping-fast" size={18} color={BRAND_ACCENT} />
            <Text style={styles.deliveryInfoLabel}>ISMEED Express</Text>
          </View>
          <View style={styles.addressBlock}>
            <Ionicons name="location" size={20} color={BRAND_PRIMARY} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.addrTitle}>Destination:</Text>
              <Text style={styles.addrDetails}>Aliyu Street, Kano, NG</Text>
            </View>
          </View>
        </View>

        {/* Map Card */}
        <View style={styles.mapCard}>
          <Text style={styles.mapLabel}>Live Locations</Text>
          <View style={styles.mapWrapper}>
            <MapView
              style={styles.map}
              region={
                userLocation
                  ? {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                      latitudeDelta: 0.022,
                      longitudeDelta: 0.022,
                    }
                  : {
                      latitude: 12.002,
                      longitude: 8.530,
                      latitudeDelta: 0.07,
                      longitudeDelta: 0.07,
                    }
              }
              showsUserLocation={!!userLocation}
              showsMyLocationButton={false}
            >
              {userLocation && (
                <Marker
                  coordinate={userLocation}
                  title="You"
                  description="Your Location"
                  pinColor={BRAND_SUCCESS}
                >
                  <Ionicons name="person" size={22} color={BRAND_SUCCESS} />
                </Marker>
              )}
              {courierLocation && (
                <Marker
                  coordinate={courierLocation}
                  title="Courier"
                  description="Courier Location"
                  pinColor={BRAND_SECONDARY}
                >
                  <FontAwesome5 name="shipping-fast" size={22} color={BRAND_SECONDARY} />
                </Marker>
              )}
            </MapView>
            <View style={styles.legendBar}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 18 }}>
                <View style={[styles.legendDot, { backgroundColor: BRAND_SUCCESS }]} />
                <Text style={styles.legendText}>You</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.legendDot, { backgroundColor: BRAND_SECONDARY }]} />
                <Text style={styles.legendText}>Courier</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.tracker}>
          {['Ordered', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'].map(
            (step, index) => (
              <React.Fragment key={index}>
                <View style={styles.stepContainer}>
                  <View
                    style={[
                      styles.circle,
                      index <= activeStep ? styles.activeStep : styles.inactiveStep,
                      index === activeStep && styles.currentStep,
                    ]}
                  >
                    {index < activeStep ? (
                      <Ionicons name="checkmark" size={16} color={BRAND_PRIMARY} />
                    ) : (
                      <Text
                        style={[
                          styles.stepNumber,
                          index === activeStep
                            ? styles.currentStepText
                            : index < activeStep
                            ? styles.activeStepText
                            : styles.inactiveText,
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      index <= activeStep
                        ? styles.activeStepText
                        : styles.inactiveText,
                      index === activeStep && {
                        fontWeight: 'bold',
                        color: BRAND_PRIMARY,
                      },
                    ]}
                  >
                    {step}
                  </Text>
                </View>
                {index < 4 && (
                  <View
                    style={[
                      styles.line,
                      index < activeStep
                        ? styles.activeLine
                        : styles.inactiveLine,
                    ]}
                  />
                )}
              </React.Fragment>
            )
          )}
        </View>

        {/* Timeline Updates */}
        <View style={styles.timeline}>
          <Text style={styles.timelineTitle}>Delivery Updates</Text>
          <View style={styles.updateItem}>
            <MaterialIcons name="delivery-dining" size={18} color={BRAND_SUCCESS} />
            <Text style={styles.updateText}>May 5, 8:00 AM – Out for delivery</Text>
          </View>
          <View style={styles.updateItem}>
            <MaterialIcons name="access-time" size={18} color={BRAND_PRIMARY} />
            <Text style={styles.updateText}>May 4, 2:30 PM – Arrived at hub</Text>
          </View>
          <View style={styles.updateItem}>
            <MaterialIcons name="local-shipping" size={18} color={BRAND_ACCENT} />
            <Text style={styles.updateText}>May 3, 10:00 AM – Picked up</Text>
          </View>
          <View style={styles.updateItem}>
            <Ionicons name="cube-outline" size={18} color={BRAND_ACCENT} />
            <Text style={styles.updateText}>May 2, 6:00 PM – Order processed</Text>
          </View>
        </View>

        {/* Support */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>Need help? </Text>
          <TouchableOpacity onPress={navigateSupportSafe}>
            <Text style={styles.helpLink}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND_BG,
  },
  scrollContent: {
    paddingBottom: 60,
    backgroundColor: BRAND_BG,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    color: BRAND_PRIMARY,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5FF",
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  mainCard: {
    backgroundColor: BRAND_CARD,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 18,
    elevation: 3,
    shadowColor: BRAND_SHADOW,
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
  },
  trackingIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trackingLabel: {
    color: BRAND_MUTED,
    fontSize: 15,
    fontWeight: '500',
  },
  trackingValue: {
    color: BRAND_PRIMARY,
    fontSize: 15.5,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  statusText: {
    color: BRAND_SECONDARY,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  deliveryDate: {
    color: BRAND_ACCENT,
    marginBottom: 10,
    fontSize: 13.5,
  },
  deliveryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryInfoLabel: {
    marginLeft: 8,
    color: BRAND_PRIMARY,
    fontWeight: '600',
    fontSize: 15,
  },
  addressBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: "#F4F8FC",
    borderRadius: 14,
    padding: 12,
    marginTop: 2,
    marginBottom: -2,
    elevation: 1,
  },
  addrTitle: {
    color: BRAND_MUTED,
    fontSize: 13.5,
    fontWeight: '600',
    marginBottom: 2,
  },
  addrDetails: {
    color: BRAND_TEXT,
    fontWeight: 'bold',
    fontSize: 15,
  },
  mapCard: {
    backgroundColor: "#EAF4FB",
    marginHorizontal: 16,
    marginTop: -8,
    marginBottom: 18,
    borderRadius: 18,
    elevation: 2,
    shadowColor: BRAND_SHADOW,
    shadowOpacity: 0.09,
    shadowRadius: 6,
    padding: 12,
    borderWidth: 1.2,
    borderColor: "#e6f2ff",
    alignItems: 'center',
  },
  mapLabel: {
    color: BRAND_ACCENT,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  mapWrapper: {
    width: width - 56,
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: "#fff",
    elevation: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  legendBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginTop: -36,
    alignSelf: 'flex-end',
    elevation: 4,
    shadowColor: BRAND_SHADOW,
    shadowOpacity: 0.14,
    shadowRadius: 7,
  },
  legendDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 6,
    marginLeft: 0,
  },
  legendText: {
    color: BRAND_PRIMARY,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
  },
  tracker: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 18,
    minHeight: 80,
    width: width - 32,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "#e2eafc"
  },
  activeStep: {
    backgroundColor: "#EAF4FB",
    borderColor: BRAND_SECONDARY,
  },
  inactiveStep: {
    backgroundColor: "#f0f2f8",
    borderColor: "#e2eafc",
  },
  currentStep: {
    backgroundColor: BRAND_SECONDARY,
    borderColor: BRAND_SECONDARY,
    shadowColor: "#4facfe",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 15,
    color: BRAND_ACCENT,
  },
  stepLabel: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
    maxWidth: 70,
  },
  activeStepText: {
    color: BRAND_ACCENT,
    fontWeight: 'bold',
  },
  currentStepText: {
    color: "#fff",
    fontWeight: 'bold',
  },
  inactiveText: {
    color: "#C0CBE4",
  },
  line: {
    height: 3,
    width: (width - 72) / 4,
    alignSelf: 'center',
    marginBottom: 18,
    marginLeft: -8,
    marginRight: -8,
    borderRadius: 2,
  },
  activeLine: {
    backgroundColor: BRAND_SECONDARY,
  },
  inactiveLine: {
    backgroundColor: "#f0f2f8",
  },
  timeline: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: BRAND_CARD,
    borderRadius: 16,
    padding: 16,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#e4eefa"
  },
  timelineTitle: {
    color: BRAND_PRIMARY,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  updateText: {
    color: BRAND_TEXT,
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
  helpSection: {
    marginTop: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  helpText: {
    color: BRAND_TEXT,
    fontSize: 15,
  },
  helpLink: {
    color: BRAND_SECONDARY,
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default TrackingDetailsScreen;