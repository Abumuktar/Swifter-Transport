import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // <<< ADD THIS

const WithdrawToBankScreen = () => {
  const navigation = useNavigation(); // <<< INIT NAVIGATION
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = () => {
    if (!bankName || !accountNumber || !amount) {
      alert('Missing Fields: Please fill all fields.');
      return;
    }

    // Instead of Alert, navigate to another screen
    navigation.navigate('WithdrawSuccessScreen', {
      bankName,
      accountNumber,
      amount,
    });

    // Clear the form after navigating
    setBankName('');
    setAccountNumber('');
    setAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.header}>Withdraw to Bank</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="business-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            value={bankName}
            onChangeText={setBankName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            keyboardType="number-pad"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={20} color="#4facfe" />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Withdrawal</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafe', padding: 20 },
  header: { fontSize: 26, fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  button: {
    backgroundColor: '#4facfe',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default WithdrawToBankScreen;
