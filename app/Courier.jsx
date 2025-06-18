import React, { useState } from 'react';
import {
  View, ScrollView, Text, StyleSheet, TextInput, Alert, Modal, TouchableOpacity
} from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const couriers = [
  {
    name: "Musa Bello",
    status: "On a delivery",
    rating: 4.8,
    comment: "Very friendly and professional!",
    image: { uri: 'https://i.pravatar.cc/100?img=10' },
  },
  {
    name: "Fatima Hassan",
    status: "Nearby",
    rating: 5.0,
    comment: "Prompt and efficient service.",
    image: { uri: 'https://i.pravatar.cc/100?img=20' },
  },
  {
    name: "Idris Ibrahim",
    status: "On a delivery",
    rating: 4.6,
    comment: "Reliable and punctual.",
    image: { uri: 'https://i.pravatar.cc/100?img=30' },
  },
];

export default function CourierScreen() {
  const [selectedSort, setSelectedSort] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourier, setSelectedCourier] = useState(null);

  const filteredCouriers = couriers.filter(courier =>
    courier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    courier.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCouriers = [...filteredCouriers].sort((a, b) => {
    if (selectedSort === "highest") return b.rating - a.rating;
    if (selectedSort === "lowest") return a.rating - b.rating;
    return 0;
  });

  const handleChat = (name) => {
    Alert.alert('Chat', `Initiating chat with ${name}...`);
  };

  const handleCall = (name) => {
    Alert.alert('Call', `Calling ${name}...`);
  };

  const handleRequest = (name) => {
    Alert.alert('Request Sent', `You have requested ${name} as your courier.`);
    setSelectedCourier(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connect with Couriers</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={22} color="#7D8DA6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or status"
            placeholderTextColor="#B0B9C8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSort}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSort(itemValue)}
          >
            <Picker.Item label="Sort" value="none" />
            <Picker.Item label="Highest Rating" value="highest" />
            <Picker.Item label="Lowest Rating" value="lowest" />
          </Picker>
        </View>
      </View>

      <ScrollView>
        {sortedCouriers.map((courier, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedCourier(courier)}>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Avatar.Image size={56} source={courier.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{courier.name}</Text>
                  <Text style={styles.status}>{courier.status}</Text>
                  <View style={styles.ratingRow}>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="star"
                        size={16}
                        color={i < Math.floor(courier.rating) ? '#F2C94C' : '#D3D3D3'}
                      />
                    ))}
                    <Text style={styles.ratingText}>{courier.rating}</Text>
                  </View>
                  <Text style={styles.comment}>{courier.comment}</Text>
                </View>
                <View style={styles.buttons}>
                  <Button icon="message" onPress={() => handleChat(courier.name)} style={styles.chatBtn} />
                  <Button icon="phone" onPress={() => handleCall(courier.name)} style={styles.callBtn} />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={selectedCourier !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedCourier(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCourier?.name}</Text>
            <Text style={styles.modalText}>Status: {selectedCourier?.status}</Text>
            <Text style={styles.modalText}>Rating: {selectedCourier?.rating}</Text>
            <Text style={styles.modalText}>Comment: {selectedCourier?.comment}</Text>

            <Button
              mode="contained"
              onPress={() => handleRequest(selectedCourier?.name)}
              style={styles.requestBtn}
              labelStyle={{ color: '#fff' }}
            >
              Request Courier
            </Button>

            <Button
              mode="outlined"
              onPress={() => setSelectedCourier(null)}
              style={styles.closeBtn}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1D3557',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 2,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#333',
    fontSize: 15,
  },
  pickerWrapper: {
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: 140,
    color: '#1D3557',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D3557',
  },
  status: {
    fontSize: 13,
    color: '#4facfe',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    color: '#333',
    fontSize: 13,
  },
  comment: {
    marginTop: 6,
    fontSize: 13,
    color: '#777',
  },
  buttons: {
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  chatBtn: {
    backgroundColor: '#F1FAEE',
    marginBottom: 6,
  },
  callBtn: {
    backgroundColor: '#F1FAEE',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    color: '#444',
    marginVertical: 4,
  },
  requestBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 20,
    marginTop: 20,
  },
  closeBtn: {
    marginTop: 10,
    borderColor: '#4facfe',
    borderWidth: 1,
    borderRadius: 20,
  },
});
