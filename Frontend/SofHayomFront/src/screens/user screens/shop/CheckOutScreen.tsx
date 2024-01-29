// CheckOutScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigationTypes'; 
import Logo from '../../../components/Logo';

interface Item {
    id: number;
    title: string;
    quantity: number;
    price: number;
}

const mockData = [
  { id: 1, title: 'מוצר 1', quantity: 2, price: 9.99 },
  { id: 2, title: 'מוצר 2', quantity: 1, price: 19.99 },
  { id: 3, title: 'מוצר 1', quantity: 2, price: 9.99 },
  { id: 4, title: 'מוצר 2', quantity: 1, price: 19.99 },
  { id: 5, title: 'מוצר 1', quantity: 2, price: 9.99 },
  { id: 6, title: 'מוצר 2', quantity: 1, price: 19.99 },
  // Add more mock items here
];

const CheckOutScreen = () => { // Assuming you have navigation prop
  const [total, setTotal] = useState(mockData.reduce((acc, item) => acc + (item.quantity * item.price), 0));
  const navigation = useNavigation<RootStackParamList>();

  const renderItem = (item: Item) => (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemQuantity}>{`כמות: ${item.quantity}`}</Text>
        <Text style={styles.itemPrice}>{`${item.price.toFixed(2)} ש"ח`}</Text>
      </View>
      <Image source={require('../../../assets/img/productImage.png')} style={styles.itemImage} />
    </View>
  );

  return (
    <View style={styles.container}>
        <Logo style={styles.logo} />
        <ScrollView style={styles.itemsList}>
          {mockData.map(renderItem)}
        </ScrollView>
        <View style={styles.totalAndCheckout}>
          <Text style={styles.totalText}>{`סה"כ: ${total.toFixed(2)} ש"ח`}</Text>
          <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('BrainTree')}>
            <Text style={styles.checkoutButtonText}>לתשלום</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.backToShopButton}
          onPress={() => navigation.navigate('ShopMain')} // Assuming 'Shop' is the name of the screen in your navigation
        >
          <Text style={styles.backToShopButtonText}>חזרה לחנות</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemsList: {
    height: 300, // Fixed height
    marginBottom:100
    // Add width if needed
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: 'orange',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin:10
  },
  totalAndCheckout: {
    bottom: 80,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center', // Center the logo horizontally
    marginTop: 40, // Top margin
    marginBottom: 20, // Bottom margin
    // Adjust the size if needed
  },
  backToShopButton: {
    backgroundColor: 'orange', // Adjust the color as needed
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    top:-70,
    width:270
  },
  backToShopButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckOutScreen;
