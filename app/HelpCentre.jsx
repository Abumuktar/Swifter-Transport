import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Animated,
  Easing,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SudoBot from './SudoBot';

const { width } = Dimensions.get('window');

const PRIMARY_BLUE = '#4facfe';

const categories = [
  {
    name: 'Account & Profile',
    id: 1,
    topics: [
      'How to change your password?',
      'How to update your email?',
      'Account security tips',
    ],
  },
  {
    name: 'Payment & Billing',
    id: 2,
    topics: [
      'How to add a payment method?',
      'How to request a refund?',
      'Payment issues troubleshooting',
    ],
  },
  {
    name: 'App Issues',
    id: 3,
    topics: ['App crashing', 'Fixing bugs', 'App not loading'],
  },
  {
    name: 'Privacy & Security',
    id: 4,
    topics: [
      'How to secure your account?',
      'Privacy settings',
      'Data encryption & protection',
    ],
  },
];

const phoneNumber = '+2349023107077';

const HelpCentre = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [sudoBotVisible, setSudoBotVisible] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (text) => setSearchText(text);

  const handleCategoryClick = (category, topic) => {
    setSelectedCategory({ category, topic });
  };

  const handleSearchResultClick = (result) => {
    for (const category of categories) {
      for (const topic of category.topics) {
        if (topic === result) {
          setSelectedCategory({ category, topic });
          return;
        }
      }
    }
  };

  const handlePhoneCall = () => {
    const phoneNumberCall = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberCall);
  };

  const renderCategory = (category) => (
    <Animated.View key={category.id} style={[styles.categoryCard, { opacity: fadeAnim }]}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <View style={styles.topicsList}>
        {category.topics.map((topic, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.topicButton}
            onPress={() => handleCategoryClick(category, topic)}
            activeOpacity={0.8}
          >
            <Ionicons name="help-circle-outline" size={18} color={PRIMARY_BLUE} />
            <Text style={styles.topicText}>{topic}</Text>
            <Ionicons name="chevron-forward" size={18} color="#B0BEC5" />
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  const renderSearchResults = () => {
    if (!searchText) return null;

    const searchResults = categories.flatMap((category) =>
      category.topics.filter((topic) =>
        topic.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (searchResults.length > 0) {
      return (
        <ScrollView style={styles.resultsContainer} keyboardShouldPersistTaps="handled">
          {searchResults.map((result, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.searchResultButton}
              onPress={() => handleSearchResultClick(result)}
              activeOpacity={0.8}
            >
              <Ionicons name="document-text-outline" size={18} color="#7E57C2" />
              <Text style={styles.searchResultText}>{result}</Text>
              <Ionicons name="chevron-forward" size={18} color="#B0BEC5" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
    return (
      <View style={styles.noResultsContainer}>
        <Ionicons name="alert-circle-outline" size={24} color="#FF7043" />
        <Text style={styles.noResultsText}>No results found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Centre</Text>
        <View style={{ width: 32 }} />
      </Animated.View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color={PRIMARY_BLUE} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="How can we help you?"
          placeholderTextColor="#B0BEC5"
          value={searchText}
          onChangeText={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
        />
      </View>

      {/* Search Results */}
      {renderSearchResults()}

      {/* Categories */}
      {!searchText && (
        <ScrollView
          style={styles.categoriesContainer}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {categories.map(renderCategory)}
        </ScrollView>
      )}

      {/* Selected Topic Modal */}
      <Modal
        visible={!!selectedCategory}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCategory(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.selectedTopicModalCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.7}
              accessibilityLabel="Close topic details"
            >
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.selectedCategoryTitle}>
              {selectedCategory?.category.name}
            </Text>
            <Text style={styles.selectedTopicTitle}>
              {selectedCategory?.topic}
            </Text>
            <Text style={styles.selectedTopicInfo}>
              For detailed instructions, please refer to our official documentation or contact support.
            </Text>
          </View>
        </View>
      </Modal>

      {/* SudoBot Modal */}
      <Modal
        visible={sudoBotVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setSudoBotVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <SudoBot />
          <TouchableOpacity
            onPress={() => setSudoBotVisible(false)}
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 54 : 34,
              right: 18,
              backgroundColor: PRIMARY_BLUE,
              borderRadius: 20,
              padding: 8,
              elevation: 7,
            }}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Support Contact */}
      <Animated.View style={[styles.supportContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[styles.contactButton, styles.shadow]}
          onPress={() => setSudoBotVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="shield-outline" size={20} color="#fff" />
          <Text style={styles.contactText}>Chat with Sudo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contactButton, styles.shadow]}
          onPress={handlePhoneCall}
          activeOpacity={0.85}
        >
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY_BLUE,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    elevation: 5,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 24,
    elevation: 2,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#263238',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  categoriesContainer: {
    marginTop: 12,
    paddingHorizontal: 18,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  categoryTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  topicsList: {
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
    paddingTop: 12,
  },
  topicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#F4F8FB',
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  topicText: {
    fontSize: 16,
    color: PRIMARY_BLUE,
    fontWeight: '500',
    marginLeft: 10,
    flex: 1,
  },
  resultsContainer: {
    marginHorizontal: 28,
    marginTop: 12,
    marginBottom: 10,
    maxHeight: 200,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  searchResultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  searchResultText: {
    fontSize: 15,
    color: '#7E57C2',
    flex: 1,
    marginLeft: 8,
    fontWeight: '500',
  },
  noResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    marginTop: 14,
    backgroundColor: '#fff3e0',
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#FF7043',
    marginLeft: 8,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(23,40,60,0.21)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  selectedTopicModalCard: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 26,
    elevation: 8,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    zIndex: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 18,
    padding: 4,
    zIndex: 10,
  },
  selectedCategoryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    marginBottom: 10,
    marginTop: 14,
  },
  selectedTopicTitle: {
    fontSize: 20,
    color: '#263238',
    fontWeight: '700',
    marginBottom: 12,
  },
  selectedTopicInfo: {
    fontSize: 16,
    color: '#606060',
    marginTop: 6,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  supportContainer: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 28,
    marginHorizontal: 4,
    minWidth: width * 0.38,
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
  },
});

export default HelpCentre;