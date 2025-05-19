import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpCentre = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: 'Account & Profile', id: 1, topics: ['How to change your password?', 'How to update your email?', 'Account security tips'] },
    { name: 'Payment & Billing', id: 2, topics: ['How to add a payment method?', 'How to request a refund?', 'Payment issues troubleshooting'] },
    { name: 'App Issues', id: 3, topics: ['App crashing', 'Fixing bugs', 'App not loading'] },
    { name: 'Privacy & Security', id: 4, topics: ['How to secure your account?', 'Privacy settings', 'Data encryption & protection'] },
  ];

  const phoneNumber = '+2349023107077';  // Phone number for chat support (can use WhatsApp or SMS)

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const renderCategory = (category) => {
    return (
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <ScrollView style={styles.topics}>
          {category.topics.map((topic, index) => (
            <TouchableOpacity key={index} onPress={() => handleCategoryClick(category, topic)}>
              <Text style={styles.topic}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const handleCategoryClick = (category, topic) => {
    setSelectedCategory({ category, topic });
  };

  const renderSearchResults = () => {
    if (!searchText) return null;

    const searchResults = categories.flatMap((category) =>
      category.topics.filter((topic) => topic.toLowerCase().includes(searchText.toLowerCase()))
    );

    if (searchResults.length > 0) {
      return (
        <ScrollView>
          {searchResults.map((result, index) => (
            <TouchableOpacity key={index} onPress={() => handleSearchResultClick(result)}>
              <Text style={styles.searchResult}>{result}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return <Text style={styles.noResults}>No results found</Text>;
    }
  };

  const handleSearchResultClick = (result) => {
    const [categoryName, topic] = result.split(' - '); // Just a simple example
    setSelectedCategory({ category: categories.find((cat) => cat.name === categoryName), topic });
  };

  const handlePhoneCall = () => {
    const phoneNumberCall = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberCall);
  };

  const handleChatSupport = () => {
    const chatUrl = `https://wa.me/${phoneNumber}`; // WhatsApp link (adjust to the format you need for your chat service)
    Linking.openURL(chatUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Centre</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#4facfe" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Search Results */}
      {renderSearchResults()}

      {/* Categories */}
      {!searchText && (
        <ScrollView style={styles.categoriesContainer}>
          {categories.map((category) => renderCategory(category))}
        </ScrollView>
      )}

      {/* Selected Topic Details */}
      {selectedCategory && (
        <View style={styles.selectedTopic}>
          <Text style={styles.selectedCategory}>{selectedCategory.category.name}</Text>
          <Text style={styles.selectedTopicText}>{selectedCategory.topic}</Text>
        </View>
      )}

      {/* Support Contact */}
      <View style={styles.supportContainer}>
        <TouchableOpacity style={styles.contactButton} onPress={handleChatSupport}>
          <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
          <Text style={styles.contactText}>Chat with Support</Text>
        </TouchableOpacity>

        {/* Phone Support */}
        <TouchableOpacity style={styles.contactButton} onPress={handlePhoneCall}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4facfe',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  iconButton: { padding: 8 },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  searchInput: { flex: 1, padding: 8, fontSize: 16 },
  searchIcon: { marginRight: 10 },
  categoriesContainer: { marginTop: 20, paddingHorizontal: 20 },
  category: { marginBottom: 20 },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  topics: { marginTop: 10 },
  topic: { fontSize: 16, color: '#4facfe', marginBottom: 10 },
  searchResult: { fontSize: 16, color: '#4facfe', marginVertical: 5 },
  noResults: { fontSize: 16, color: '#777', textAlign: 'center' },
  selectedTopic: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  selectedCategory: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  selectedTopicText: { fontSize: 16, color: '#777', marginTop: 10 },
  supportContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4facfe',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  contactText: { fontSize: 16, color: '#fff', marginLeft: 10 },
});

export default HelpCentre;
