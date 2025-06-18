import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Alert,
  Modal, Animated, Dimensions, Pressable, Platform, KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BRAND_GRAD = ['#4facfe', '#00f2fe'];
const BRAND_BG = '#F8F8F8';
const BRAND_CARD = '#fff';
const BRAND_TEXT = '#1D3557';

const TwoFASetup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (modalVisible || successModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, successModal, slideAnim]);

  const handleSendCode = () => {
    if (!/^\d{11}$/.test(phoneNumber)) {
      Alert.alert('Validation', 'Please enter a valid 11-digit phone number.');
      return;
    }
    setCodeSent(true);
    setStep(2);
    setCooldown(60);
    setSessionId('2FA-' + Math.floor(100000 + Math.random() * 900000));
    setModalVisible(true);
  };

  // Now uses router.back() after modal closes
  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Validation', 'Please enter a 6-digit code.');
      return;
    }
    setSuccessModal(true);
    setModalVisible(false);
    setTimeout(() => {
      setSuccessModal(false);
      router.back(); // << use back instead of push/replace
    }, 1200);
  };

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else if (step === 2) {
      setVerificationCode('');
      setStep(1);
      setCodeSent(false);
      setModalVisible(false);
    }
  };

  const colors = {
    bg: BRAND_BG,
    card: BRAND_CARD,
    text: BRAND_TEXT,
    input: '#fff',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingTop: 30,
      paddingHorizontal: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 8,
      marginTop: 6,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 18,
      letterSpacing: 0.2,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 22,
      margin: 18,
      padding: 26,
      shadowColor: '#4facfe',
      shadowOpacity: 0.13,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },
    label: {
      fontSize: 16,
      color: '#457B9D',
      fontWeight: '600',
      marginBottom: 8,
      marginLeft: 2,
    },
    input: {
      backgroundColor: colors.input,
      height: 52,
      borderRadius: 15,
      paddingHorizontal: 18,
      fontSize: 16,
      color: colors.text,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: '#e7f1fa',
      fontWeight: '600',
      letterSpacing: 1.2,
    },
    phoneHint: {
      color: '#a8b3c9',
      fontSize: 12,
      marginBottom: 8,
      marginLeft: 2,
    },
    button: {
      borderRadius: 25,
      overflow: 'hidden',
      shadowColor: '#4facfe',
      shadowOpacity: 0.13,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      marginTop: 2,
    },
    btnContent: {
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 25,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 0.6,
      textAlign: 'center',
    },
    disabledBtn: {
      opacity: 0.55,
    },
    resendText: {
      color: '#4facfe',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 10,
      textDecorationLine: 'underline',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(40,57,83,0.17)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      width: '89%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 28,
      alignItems: 'center',
      elevation: 20,
      shadowColor: '#4facfe',
      shadowOpacity: 0.18,
      shadowRadius: 24,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1D3557',
      marginBottom: 8,
      marginTop: 2,
      letterSpacing: 0.2,
      textAlign: 'center',
    },
    modalDesc: {
      color: '#457B9D',
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 18,
      fontWeight: '600',
    },
    codeInputRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 14,
    },
    codeDigit: {
      width: 45,
      height: 55,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: '#bee3fa',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 7,
      backgroundColor: '#f4fafd',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1D3557',
      letterSpacing: 1.5,
    },
    modalBtn: {
      borderRadius: 25,
      overflow: 'hidden',
      marginTop: 14,
      width: '100%',
    },
    modalBtnContent: {
      paddingVertical: 13,
      alignItems: 'center',
      borderRadius: 25,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    closeIcon: {
      position: 'absolute',
      right: 12,
      top: 12,
      padding: 4,
      zIndex: 10,
    },
    session: {
      fontSize: 12,
      color: '#9cb9c7',
      marginTop: 10,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    successModalCard: {
      width: '87%',
      backgroundColor: '#fff',
      borderRadius: 26,
      padding: 32,
      alignItems: 'center',
      elevation: 22,
      shadowColor: '#4facfe',
      shadowOpacity: 0.22,
      shadowRadius: 32,
      justifyContent: 'center',
    },
    successIcon: {
      marginBottom: 20,
    },
    successText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#11b674',
      marginBottom: 8,
      textAlign: 'center',
    },
    successDesc: {
      color: '#457B9D',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 18,
      fontWeight: '600',
    },
  });

  const renderCodeInput = () => {
    const digits = (verificationCode + '').padEnd(6, ' ');
    return (
      <View style={styles.codeInputRow}>
        {digits.split('').map((char, idx) => (
          <View style={styles.codeDigit} key={idx}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1D3557' }}>
              {char.trim() !== '' ? char : ''}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={26} color={colors.text} onPress={handleBack} />
          <Text style={styles.headerTitle}>Two-Factor Authentication</Text>
        </View>

        {/* Step 1: Phone number entry */}
        {step === 1 && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.card}>
              <Text style={styles.label}>Secure your account with 2FA</Text>
              <Text style={styles.phoneHint}>
                Enter your registered phone number. We'll send an SMS with a verification code.
              </Text>
              <TextInput
                placeholder="e.g. 08012345678"
                placeholderTextColor="#a7b9cc"
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={text => {
                  if (/^\d{0,11}$/.test(text)) setPhoneNumber(text);
                }}
                style={styles.input}
                maxLength={11}
                autoFocus
              />
              <TouchableOpacity
                onPress={handleSendCode}
                disabled={cooldown > 0 || !/^\d{11}$/.test(phoneNumber)}
                style={[styles.button, (cooldown > 0 || !/^\d{11}$/.test(phoneNumber)) && styles.disabledBtn]}
              >
                <LinearGradient colors={BRAND_GRAD} style={styles.btnContent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>
                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Send Verification Code'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* Step 2: Modal for code entry */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={handleBack}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalCard, { transform: [{ translateX: slideAnim }] }]}>
              <Pressable style={styles.closeIcon} onPress={handleBack}>
                <Ionicons name="close-circle" size={26} color="#4facfe" />
              </Pressable>
              <Text style={styles.modalTitle}>Enter Verification Code</Text>
              <Text style={styles.modalDesc}>
                We sent a 6-digit code to {'\n'}
                <Text style={{ color: '#4facfe', fontWeight: 'bold' }}>{phoneNumber}</Text>
              </Text>
              {renderCodeInput()}
              <TextInput
                style={[styles.input, { letterSpacing: 16, textAlign: 'center', marginTop: 8, fontSize: 22 }]}
                placeholder="------"
                placeholderTextColor="#bee3fa"
                keyboardType="number-pad"
                maxLength={6}
                value={verificationCode}
                onChangeText={text => {
                  if (/^\d{0,6}$/.test(text)) setVerificationCode(text);
                }}
                autoFocus
                selectionColor="#4facfe"
              />
              <Text style={styles.session}>Session ID: {sessionId}</Text>
              <TouchableOpacity
                onPress={handleVerifyCode}
                style={[styles.modalBtn, (verificationCode.length !== 6) && styles.disabledBtn]}
                disabled={verificationCode.length !== 6}
              >
                <LinearGradient colors={BRAND_GRAD} style={styles.modalBtnContent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>Verify & Enable 2FA</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={handleSendCode}
                disabled={cooldown > 0}
              >
                <Text style={styles.resendText}>
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

        {/* Final Modal: Success */}
        <Modal visible={successModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.successModalCard, { transform: [{ translateX: slideAnim }] }]}>
              <Ionicons name="shield-checkmark" size={56} color="#11b674" style={styles.successIcon} />
              <Text style={styles.successText}>Two-Factor Authentication Enabled!</Text>
              <Text style={styles.successDesc}>
                Your account is now protected with extra security. 
                Keep your phone nearby for future logins.
              </Text>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TwoFASetup;