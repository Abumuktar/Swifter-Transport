import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  SafeAreaView,
  Platform,
  Keyboard,
  LogBox,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BRAND_PRIMARY = "#1D3557";
const BRAND_SECONDARY = "#4facfe";
const BRAND_ACCENT = "#457B9D";
const BRAND_BG = "#fff";
const BRAND_CARD = "#F8FBFF";
const BRAND_TEXT = "#222";
const BRAND_MUTED = "#A7B4C3";
const BRAND_SHADOW = "#e4eefa";

const { width } = Dimensions.get('window');

export default function TrackCourierScreen() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Suppress specific warning about useInsertionEffect
    LogBox.ignoreLogs(['useInsertionEffect']);
  }, []);

  const handleTrack = () => {
    Keyboard.dismiss();
    if (!trackingNumber.trim()) {
      Alert.alert('Tracking', 'Please enter a tracking number.');
      return;
    }
    navigation.navigate("TrackingDetailsScreen", { trackingNumber });
  };

  const handleBack = () => {
    if (navigation && navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Back Button */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={handleBack}
            activeOpacity={0.8}
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={26} color={BRAND_PRIMARY} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headerTitle}>Track Courier</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Main Content */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="shipping-fast" size={28} color={BRAND_PRIMARY} />
          </View>
          <Text style={styles.title}>Track Your Courier</Text>
          <Text style={styles.subtitle}>Stay updated with your delivery</Text>
        </View>

        {/* Tracking Input */}
        <View style={styles.inputSection}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="barcode-outline"
              size={22}
              color={BRAND_ACCENT}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Enter Tracking Number"
              placeholderTextColor={BRAND_MUTED}
              style={styles.input}
              value={trackingNumber}
              onChangeText={setTrackingNumber}
              keyboardType="default"
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="search"
              onSubmitEditing={handleTrack}
              blurOnSubmit
              accessibilityLabel="Tracking Number Input"
            />
          </View>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={handleTrack}
            activeOpacity={0.85}
            accessibilityLabel="Track Courier"
          >
            <Ionicons name="search" size={20} color={BRAND_PRIMARY} />
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>

        {/* Info / Help Section */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={22} color={BRAND_ACCENT} style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>
            Enter your tracking number to get real-time delivery status and updates. If you face any issues, please{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('HelpCentre')}>contact support</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND_BG,
  },
  scrollContent: {
    paddingBottom: 40,
    backgroundColor: BRAND_BG,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 18,
    paddingBottom: 6,
    backgroundColor: BRAND_BG,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    marginBottom: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F0F5FF",
    elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: BRAND_PRIMARY,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  iconCircle: {
    backgroundColor: "#EAF4FB",
    borderRadius: 30,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: BRAND_SHADOW,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BRAND_PRIMARY,
    marginTop: 10,
    letterSpacing: 0.2,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 15,
    color: BRAND_ACCENT,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center'
  },
  inputSection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#F4F8FC",
    borderRadius: 16,
    padding: 6,
    alignItems: 'center',
    shadowColor: BRAND_SHADOW,
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e2eafc"
  },
  input: {
    flex: 1,
    color: BRAND_TEXT,
    fontSize: 16,
    paddingVertical: 8,
    letterSpacing: 1,
  },
  trackButton: {
    backgroundColor: BRAND_SECONDARY,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  trackButtonText: {
    color: BRAND_PRIMARY,
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EAF4FB',
    borderRadius: 14,
    marginHorizontal: 18,
    marginTop: 15,
    padding: 14,
    elevation: 1,
  },
  infoText: {
    flex: 1,
    color: BRAND_TEXT,
    fontSize: 15,
    lineHeight: 21,
  },
  linkText: {
    color: BRAND_SECONDARY,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
