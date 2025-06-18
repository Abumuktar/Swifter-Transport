import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
  Animated,
  Share,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Dummy bank lookup function (replace with your API logic)
const fetchBanksByAccount = async (accountNumber) => {
  await new Promise((res) => setTimeout(res, 1100));
  if (accountNumber === "0000000000") return [];
  return [
    { name: "Access Bank", code: "044" },
    { name: "GTBank", code: "058" },
    { name: "Zenith Bank", code: "057" },
  ];
};

// Dummy account name lookup (replace with your API logic)
const fetchAccountName = async (bank, accountNumber) => {
  await new Promise((res) => setTimeout(res, 900));
  return `${bank.name} User`;
};

const WithdrawToBankScreen = () => {
  const navigation = useNavigation();

  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountError, setAccountError] = useState('');
  const [searchingBanks, setSearchingBanks] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bankModal, setBankModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountName, setAccountName] = useState('');
  const [accountNameLoading, setAccountNameLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [txnReference, setTxnReference] = useState('');

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleVerifyAccount = async () => {
    setAccountError('');
    if (!/^\d{10}$/.test(accountNumber)) {
      setAccountError('Account number must be 10 digits.');
      return;
    }
    setSearchingBanks(true);
    const foundBanks = await fetchBanksByAccount(accountNumber);
    setSearchingBanks(false);
    if (!foundBanks.length) {
      setAccountError('No banks found for this account number.');
      return;
    }
    setBanks(foundBanks);
    setBankModal(true);
  };

  const handleSelectBank = async (bank) => {
    setSelectedBank(bank);
    setBankModal(false);
    setAccountNameLoading(true);
    const name = await fetchAccountName(bank, accountNumber);
    setAccountName(name);
    setAccountNameLoading(false);
    setStep(2);
  };

  const handleProceedToAmount = () => setStep(3);

  const handleProceedToPin = () => {
    if (!amount || isNaN(amount) || +amount <= 0) {
      setAmountError("Enter a valid amount.");
      return;
    }
    setAmountError('');
    setStep(4);
  };

  const handleProceedToSubmit = () => {
    if (!/^\d{4}$/.test(pin)) {
      setPinError("Enter your 4-digit transaction PIN.");
      return;
    }
    setPinError('');
    setProcessing(true);

    const ref = "TRX" + accountNumber + Math.floor(100000 + Math.random() * 900000);
    setTxnReference(ref);

    setTimeout(() => {
      setProcessing(false);
      setSuccessModal(true);
    }, 1100);
  };

  const resetAll = () => {
    setStep(1);
    setAccountNumber('');
    setAccountError('');
    setBanks([]);
    setBankModal(false);
    setSelectedBank(null);
    setAccountName('');
    setAccountNameLoading(false);
    setAmount('');
    setAmountError('');
    setPin('');
    setPinError('');
    setProcessing(false);
    setSuccessModal(false);
    setReceiptModal(false);
    setTxnReference('');
  };

  const transactionDescription = `You have successfully withdrawn ₦${amount} to ${accountName} (${selectedBank?.name}), Account Number: ${accountNumber}.`;

  const handleShareAsImage = async () => {
    await Share.share({ message: "Receipt shared as image (demo only)." });
  };
  const handleShareAsPdf = async () => {
    await Share.share({ message: "Receipt shared as PDF (demo only)." });
  };

  const handleViewReceipt = () => {
    setSuccessModal(false);
    setReceiptModal(true);
  };

  // Add more prototype details to the receipt
  const receiptDetails = [
    { label: "Status", value: "Successful" },
    { label: "Amount", value: amount ? `₦${amount}` : '-' },
    { label: "Bank", value: selectedBank?.name || '-' },
    { label: "Account Name", value: accountName || '-' },
    { label: "Account Number", value: accountNumber || '-' },
    { label: "Date", value: new Date().toLocaleString() },
    { label: "Description", value: amount ? "Bank withdrawal" : '-' },
    { label: "Reference", value: txnReference || '-' },
    // Additional prototype details
    { label: "Sender", value: "Ismeed Wallet" },
    { label: "Channel", value: "Mobile App" },
    { label: "Fee", value: "₦52.50" },
    { label: "Narration", value: "Withdrawal to personal account" },
    { label: "Session ID", value: "S-" + Math.floor(10000000 + Math.random() * 90000000) },
    { label: "Processed By", value: "Prototype Service" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.header}>Withdraw to Bank</Text>

        {/* Step 1: Enter Account Number */}
        {step === 1 && (
          <View>
            <Text style={styles.label}>Enter Account Number</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={22} color="#4facfe" />
              <TextInput
                style={styles.input}
                placeholder="Account Number"
                keyboardType="number-pad"
                maxLength={10}
                value={accountNumber}
                onChangeText={txt => {
                  setAccountNumber(txt.replace(/[^0-9]/g, ''));
                  setAccountError('');
                }}
                onSubmitEditing={handleVerifyAccount}
                editable={!searchingBanks}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.inputAction} onPress={handleVerifyAccount} disabled={searchingBanks}>
                {searchingBanks ? (
                  <ActivityIndicator size="small" color="#4facfe" />
                ) : (
                  <Ionicons name="chevron-forward" size={22} color="#4facfe" />
                )}
              </TouchableOpacity>
            </View>
            {accountError ? <Text style={styles.errorText}>{accountError}</Text> : null}
          </View>
        )}

        {/* Step 2: Select Bank Modal */}
        <Modal
          visible={bankModal}
          transparent
          animationType="slide"
          onRequestClose={() => setBankModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Your Bank</Text>
              <FlatList
                data={banks}
                keyExtractor={item => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.bankItem,
                      selectedBank && selectedBank.code === item.code && styles.selectedBank,
                    ]}
                    onPress={() => handleSelectBank(item)}
                  >
                    <Text style={styles.bankName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeModalBtn} onPress={() => setBankModal(false)}>
                <Ionicons name="close" size={26} color="#4facfe" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Step 2: Show Account Name */}
        {step === 2 && (
          <View>
            <Text style={styles.label}>Bank</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={22} color="#4facfe" />
              <Text style={[styles.input, { color: "#1D3557" }]}>
                {selectedBank ? selectedBank.name : ''}
              </Text>
            </View>
            <Text style={styles.label}>Account Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={22} color="#4facfe" />
              {accountNameLoading ? (
                <ActivityIndicator size="small" color="#4facfe" style={{ marginLeft: 10 }} />
              ) : (
                <Text style={[styles.input, { color: "#1D3557" }]}>{accountName}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleProceedToAmount}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Proceed to Payment</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Enter Amount */}
        {step === 3 && (
          <View>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="cash-outline" size={22} color="#4facfe" />
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={txt => {
                  setAmount(txt.replace(/[^0-9.]/g, ''));
                  setAmountError('');
                }}
                returnKeyType="done"
                onSubmitEditing={handleProceedToPin}
              />
            </View>
            {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleProceedToPin}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4: Enter Transaction PIN */}
        {step === 4 && (
          <View>
            <Text style={styles.label}>Transaction PIN</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="keypad-outline" size={22} color="#4facfe" />
              <TextInput
                style={styles.input}
                placeholder="Enter 4-digit PIN"
                keyboardType="number-pad"
                maxLength={4}
                value={pin}
                onChangeText={txt => {
                  setPin(txt.replace(/[^0-9]/g, ''));
                  setPinError('');
                }}
                secureTextEntry={true}
                returnKeyType="done"
                onSubmitEditing={handleProceedToSubmit}
              />
            </View>
            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
            <TouchableOpacity
              style={[styles.primaryButton, processing && styles.disabledButton]}
              activeOpacity={0.85}
              onPress={handleProceedToSubmit}
              disabled={processing}
            >
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                {processing ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Withdraw</Text>}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Payment Success Modal */}
        <Modal
          visible={successModal}
          transparent
          animationType="slide"
          onRequestClose={() => setSuccessModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { alignItems: 'center', justifyContent: 'center' }]}>
              <Ionicons name="checkmark-circle" size={64} color="#4facfe" style={{ marginBottom: 18 }} />
              <Text style={styles.successTitle}>Payment Successful</Text>
              <Text style={styles.successDesc}>{transactionDescription}</Text>
              <TouchableOpacity style={styles.successBtn} activeOpacity={0.9} onPress={handleViewReceipt}>
                <Ionicons name="document-text-outline" size={20} color="#4facfe" />
                <Text style={styles.successBtnText}>View Receipt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Receipt Modal - Modern Professional */}
        <Modal
          visible={receiptModal}
          transparent
          animationType="fade"
          onRequestClose={() => setReceiptModal(false)}
        >
          <View style={[styles.modalOverlay, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={styles.receiptCard}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.receiptHeader}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Ionicons name="receipt-outline" size={36} color="#fff" />
                <Text style={styles.receiptTitle}>Payment Receipt</Text>
              </LinearGradient>
              <ScrollView style={{ maxHeight: 360 }}>
                {receiptDetails.map((item) => (
                  <View style={styles.receiptRow} key={item.label}>
                    <Text style={styles.receiptLabel}>{item.label}</Text>
                    <Text style={[
                      styles.receiptValue,
                      item.label === 'Status' ? { color: "#11b674", fontWeight: 'bold' } : null
                    ]}>{item.value}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.receiptButtonRow}>
                <TouchableOpacity style={styles.receiptShareBtn} onPress={handleShareAsImage}>
                  <Ionicons name="image-outline" size={20} color="#4facfe" />
                  <Text style={styles.receiptShareBtnText}>Share as Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.receiptShareBtnAlt} onPress={handleShareAsPdf}>
                  <Ionicons name="document-outline" size={20} color="#fff" />
                  <Text style={styles.receiptShareBtnTextAlt}>Share as PDF</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeReceiptBtn} onPress={() => { setReceiptModal(false); resetAll(); }}>
                <Ionicons name="close-circle" size={30} color="#4facfe" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1D3557',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  label: {
    fontSize: 16,
    color: '#457B9D',
    fontWeight: '600',
    marginLeft: 2,
    marginBottom: 5,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 18,
    height: 52,
    marginBottom: 4,
    marginTop: 2,
    shadowColor: '#4facfe',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1D3557',
    fontWeight: '500',
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  inputAction: {
    padding: 3,
    marginLeft: 6,
    borderRadius: 11,
    backgroundColor: '#f1f5f9',
  },
  errorText: {
    color: '#e63946',
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 8,
    fontWeight: '500',
  },
  primaryButton: {
    borderRadius: 30,
    marginTop: 22,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#4facfe',
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.55,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40,57,83,0.18)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: 24,
    shadowColor: '#1D3557',
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 18,
    minHeight: 280,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  bankItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 17,
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  selectedBank: {
    backgroundColor: '#bee3fa',
  },
  bankName: {
    fontSize: 16,
    color: '#1D3557',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  closeModalBtn: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 25,
  },
  successTitle: {
    fontSize: 22,
    color: '#1D3557',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 15,
    color: '#457B9D',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 4,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  successBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5f4fd',
    borderRadius: 19,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginHorizontal: 6,
    marginTop: 14,
    elevation: 3,
  },
  successBtnText: {
    color: '#4facfe',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  // Receipt Modal
  receiptCard: {
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingBottom: 12,
    paddingTop: 0,
    shadowColor: '#4facfe',
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  receiptHeader: {
    width: '100%',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 26,
    marginBottom: 10,
  },
  receiptTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 14,
    letterSpacing: 0.3,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 30,
  },
  receiptLabel: {
    color: '#888',
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
  },
  receiptValue: {
    color: '#151e29',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
  receiptButtonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  receiptShareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5f4fd',
    borderRadius: 19,
    paddingVertical: 11,
    paddingHorizontal: 19,
    marginHorizontal: 6,
    elevation: 2,
  },
  receiptShareBtnText: {
    color: '#4facfe',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 7,
  },
  receiptShareBtnAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27A0B6',
    borderRadius: 19,
    paddingVertical: 11,
    paddingHorizontal: 19,
    marginHorizontal: 6,
    elevation: 2,
  },
  receiptShareBtnTextAlt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 7,
  },
  closeReceiptBtn: {
    alignSelf: 'center',
    marginTop: 8,
    padding: 4,
  },
});

export default WithdrawToBankScreen;