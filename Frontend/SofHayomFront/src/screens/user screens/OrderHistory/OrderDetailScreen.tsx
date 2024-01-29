import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { mockOrders, getImage } from './OrderHistoryScreen';

const OrderDetailScreen = () => {
  const { orderId } = useRoute().params as { orderId: number };
  const navigation = useNavigation();
  const orderDetails = mockOrders.find(order => order.id === orderId);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={34} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>פרטי ההזמנה</Text>
      </View>

      {orderDetails ? (
        <View>
          <Text style={styles.orderInfo}>תאריך ההזמנה: {orderDetails.date}</Text>
          <Text style={styles.orderInfo}>סכ"ה: {orderDetails.total}</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.itemsList}>
            {orderDetails.items.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <Text style={styles.itemDetails}>
                  {`כמות: ${item.quantity} | מחיר: ${item.quantity > 1 ? (item.quantity * parseFloat(item.price.replace(' ש”ח', ''))).toFixed(2) : item.price}`}
                </Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Image source={getImage(item.image)} style={styles.itemImage} />
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text>Order not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    marginTop:60,
    marginRight:50
  },
  itemDetails: {
    marginRight: 10,
    fontSize: 14,
    // Additional styling as needed
  },    
  orderInfo: {
    marginBottom: 10, // Add margin between order date and total
    fontSize: 16,
    fontWeight: '500',
    alignSelf:'center'
    // Additional styling as needed
  },
  itemCard: {
    flexDirection: 'row', // Arrange items horizontally
    backgroundColor: '#F5F5F5', // Background color for the card
    padding: 10, // Padding inside the card
    marginBottom: 10, // Space between each card
    alignItems: 'center', // Align items vertically center
    borderRadius: 8, // Rounded corners for the card
  },
  itemName: {
    flex: 1, // Take available space
    marginRight: 10, // Space between name and image
    fontSize: 16,
    fontWeight: '500',
    // Additional styling as needed
  },
  itemImage: {
    width: 50,
    height: 50,
    // Other styling for the image
    borderRadius: 25, // Round the image
  },
  itemsList: {
    height: 420, // Set a specific height for the ScrollView
    marginBottom: 20, // Space from the bottom
    marginTop:10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  backIcon: {
   paddingRight:30,
   paddingTop:30
  },
  // Add more styles if needed
});

export default OrderDetailScreen;
