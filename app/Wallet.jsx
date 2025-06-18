import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const transactions = [
  { id: '1', title: 'Payment Received', amount: '+₦5,000', date: 'Apr 28, 2025', type: 'income' },
  { id: '2', title: 'Ride Payment', amount: '-₦2,500', date: 'Apr 27, 2025', type: 'expense' },
  { id: '3', title: 'Top-up', amount: '+₦10,000', date: 'Apr 26, 2025', type: 'income' },
];

const WalletScreen = () => {
  const navigation = useNavigation();
  const balance = 12500;

  // State for hiding/showing balance
  const [showBalance, setShowBalance] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Wallet Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>
              {showBalance ? `₦${balance.toLocaleString()}` : '••••••••'}
            </Text>
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowBalance((prev) => !prev)}
              accessibilityLabel={showBalance ? 'Hide balance' : 'Show balance'}
            >
              <Ionicons
                name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('DepositScreen')}
            >
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('WithdrawScreen')}
            >
              <Ionicons name="arrow-down-circle-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Ionicons
                name={item.type === 'income' ? 'arrow-down-circle' : 'arrow-up-circle'}
                size={28}
                color={item.type === 'income' ? '#4caf50' : '#f44336'}
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.type === 'income' ? '#4caf50' : '#f44336' },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default WalletScreen;

// Styles stay the same, plus new styles for balance row and eye icon
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fd',
  },
  scrollContainer: {
    padding: 20,
  },
  balanceCard: {
    backgroundColor: '#4facfe',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  balanceTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
    marginRight: 10,
  },
  eyeIcon: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    backgroundColor: '#6dd5fa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  transactionItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});