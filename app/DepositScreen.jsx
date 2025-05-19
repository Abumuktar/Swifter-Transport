import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Clipboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


const DepositScreen = () => {
  const accountName = "Ismeed Ride User";
  const accountNumber = "1234567890";
  const bankName = "ISMEED RIDE";

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Account details copied to clipboard!');
  };

  const shareAccountDetails = async () => {
    try {
      await Share.share({
        message: `Bank: ${bankName}\nAccount Name: ${accountName}\nAccount Number: ${accountNumber}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share account details.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Deposit Funds</Text>

      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Bank Name:</Text>
          <Text style={styles.value}>{bankName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Name:</Text>
          <Text style={styles.value}>{accountName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account Number:</Text>
          <Text style={styles.value}>{accountNumber}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => copyToClipboard(`${bankName}\n${accountName}\n${accountNumber}`)}>
            <Ionicons name="copy-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={shareAccountDetails}>
            <Ionicons name="share-social-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#111',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
