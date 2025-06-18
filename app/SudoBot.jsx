import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_BLUE = '#4facfe';

// Example Swifter knowledge base (replace/extend with real data or APIs)
const swifterKnowledge = [
  {
    keywords: ['book ride', 'how to book', 'request ride'],
    answer:
      "To book a ride on Swifter, open the app, enter your pickup and destination locations, choose your preferred ride type, and tap 'Book Ride.'",
  },
  {
    keywords: ['cancel ride', 'cancel my ride'],
    answer:
      "To cancel a Swifter ride, go to 'My Rides', select the ride, and tap 'Cancel'. Note: Cancellation fees may apply based on Swifter's policy.",
  },
  {
    keywords: ['payment', 'pay', 'add card', 'billing'],
    answer:
      "You can manage your payments in Swifter by going to Wallet > Add Payment Method. Swifter accepts cards and other local payment methods.",
  },
  {
    keywords: ['driver', 'contact driver', 'call driver'],
    answer:
      "To contact your Swifter driver, go to your active ride screen and tap the 'Call Driver' or 'Message Driver' button.",
  },
  {
    keywords: ['fare', 'price', 'estimate'],
    answer:
      "You can view your fare estimate before booking a ride. After your trip, you'll receive a detailed receipt. For disputes, use the 'Help' section in your trip details.",
  },
  {
    keywords: ['refund', 'money back'],
    answer:
      "To request a refund, go to your trip history, select the trip, and tap 'Request Refund'. Refunds are processed in 3-5 business days if eligible.",
  },
  {
    keywords: ['late', 'driver late', 'delay'],
    answer:
      "We're sorry your driver is late! Please check the driver's live location in the app or contact them directly. If the driver doesn't show up, you can cancel and rebook.",
  },
  {
    keywords: ['support', 'human', 'agent', 'help'],
    answer:
      "I'm Sudo, your 24/7 Swifter AI assistant. If you need to talk to a human, type 'escalate' and I'll connect you.",
  },
  {
    keywords: ['privacy', 'secure', 'data'],
    answer:
      "Swifter values your privacy. All your data is encrypted and protected according to our privacy policy. You can review and adjust your privacy settings in the app.",
  },
  {
    keywords: ['app not loading', 'crash', 'bug'],
    answer:
      "If Swifter isn't loading, try closing and reopening the app, checking your internet connection, or updating to the latest version. If issues persist, report a bug through the app.",
  },
  {
    keywords: ['promo', 'discount', 'coupon'],
    answer:
      "To use a promo code on Swifter, go to Wallet > Promo Codes, enter your code, and apply it before booking a ride.",
  },
  {
    keywords: ['how are you', 'hello', 'hi'],
    answer:
      "Hello! I'm Sudo, Swifter's AI support bot. How can I help you today?",
  },
];

// Dynamic actions (examples, expand as needed)
const handleAction = async (userMessage) => {
  const lower = userMessage.toLowerCase();
  if (lower.includes('open website')) {
    Linking.openURL('https://www.swifter.com');
    return "I've opened Swifter's official website for you.";
  }
  if (lower.includes('call support')) {
    Linking.openURL('tel:+2349023107077');
    return "Calling Swifter support for you now...";
  }
  if (lower.includes('escalate')) {
    return "I've escalated your request to a human agent. Our support team will contact you shortly.";
  }
  return null;
};

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text:
      "Hi, I'm Sudo, Swifter's extremely powerful AI assistant. I can answer anything about rides, payments, policies, and more. You can even ask about live features, and I'll help or connect you with a human agent if needed.",
    time: new Date(),
  },
];

const SudoBot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  // Extremely powerful Swifter-aware AI logic
  const getBotReply = async (userMessage) => {
    // First: check if user asks for a dynamic action (like open, call)
    const actionResult = await handleAction(userMessage);
    if (actionResult) return actionResult;

    // Second: search knowledge base for best match
    const lower = userMessage.toLowerCase();
    for (const item of swifterKnowledge) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return item.answer;
      }
    }

    // Third: fallback to generic bot or escalate
    return (
      "I'm Sudo, Swifter's AI bot. I couldn't find an exact answer. Please rephrase your question or type 'escalate' if you need human support."
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate typing delay
    setTimeout(async () => {
      const reply = await getBotReply(userMsg.text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: reply,
          time: new Date(),
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, loading]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
    >
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={26} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Sudo AI for Swifter</Text>
      </View>
      <ScrollView
        style={styles.messagesList}
        contentContainerStyle={{ paddingBottom: 16 }}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user'
                ? styles.userBubble
                : styles.botBubble,
            ]}
          >
            <Text style={msg.sender === 'user' ? styles.userText : styles.botText}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={[styles.messageBubble, styles.botBubble]}>
            <ActivityIndicator size="small" color={PRIMARY_BLUE} />
            <Text style={[styles.botText, { marginLeft: 6 }]}>Sudo is thinking...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask Swifter anything..."
          placeholderTextColor="#b0b9c8"
          editable={!loading}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={handleSend}
          style={styles.sendButton}
          disabled={loading || !input.trim()}
        >
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fb' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_BLUE,
    paddingTop: Platform.OS === 'ios' ? 54 : 34,
    paddingBottom: 16,
    paddingHorizontal: 18,
    elevation: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  messageBubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 5,
    alignSelf: 'flex-start',
    shadowColor: '#b0b9c8',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBubble: {
    backgroundColor: '#4facfe',
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  botBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#e5e7ef',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 21,
  },
  botText: {
    color: '#37474F',
    fontSize: 16,
    lineHeight: 21,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f2f5',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#f7f9fd',
    marginRight: 8,
    color: '#263238',
  },
  sendButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 22,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});

export default SudoBot;