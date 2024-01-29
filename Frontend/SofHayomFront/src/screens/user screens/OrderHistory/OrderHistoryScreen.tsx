import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes'; // Adjust the import path as needed

const mockOrders = [
  {
    id: 1,
    date: '15/01/2024',
    total: '150.90 ש”ח',
    items: [
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' },
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' },
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' },
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' },
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' },
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' }
    ]
  },
  {   
    id: 2,
    date: '10/01/2024',
    total: '200.30 ש”ח',
    items: [
      { name: 'תפוחים', quantity: 5, price: '25.00 ש”ח', image: 'apple.png' },
      { name: 'לחם', quantity: 1, price: '12.00 ש”ח', image: 'bread.png' }
    ]
  },
  {
    id: 3,
    date: '15/01/2024',
    total: '150.90 ש”ח',
    items: [
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' }
    ]
  },
  {   
    id: 4,
    date: '10/01/2024',
    total: '200.30 ש”ח',
    items: [
      { name: 'תפוחים', quantity: 5, price: '25.00 ש”ח', image: 'apple.png' },
      { name: 'לחם', quantity: 1, price: '12.00 ש”ח', image: 'bread.png' }
    ]
  },
  {
    id: 5,
    date: '15/01/2024',
    total: '150.90 ש”ח',
    items: [
      { name: 'עגבניות', quantity: 2, price: '10.50 ש”ח', image: 'tomato.png' },
      { name: 'מלפפונים', quantity: 3, price: '15.75 ש”ח', image: 'cucumber.png' }
    ]
  },
  {   
    id: 6,
    date: '10/01/2024',
    total: '200.30 ש”ח',
    items: [
      { name: 'תפוחים', quantity: 5, price: '25.00 ש”ח', image: 'apple.png' },
      { name: 'לחם', quantity: 1, price: '12.00 ש”ח', image: 'bread.png' }
    ]
  },
  // Add more orders as needed
];
const getImage = (imageName: any) => {
    switch(imageName) {
      case 'tomato.png':
        return require('../../../assets/img/tomato.png');
      case 'cucumber.png':
        return require('../../../assets/img/cucumber.png');
      case 'apple.png':
        return require('../../../assets/img/apple.png');
      case 'bread.png':
        return require('../../../assets/img/bread.png');
      // Add other cases as needed
      default:
        return ; // default image if not found
    }
  };

const OrderHistoryScreen = () => {
    const navigation = useNavigation<RootStackParamList>();
  
    const navigateToOrderDetail = (orderId: number) => {
      navigation.navigate('OrderDetail', { orderId });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>היסטורית רכישות</Text>
        <ScrollView style={styles.orderList} showsVerticalScrollIndicator={false}>
          {mockOrders.map((order) => (
            <TouchableOpacity 
              key={order.id} 
              style={styles.orderCard} 
              onPress={() => navigateToOrderDetail(order.id)}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name="receipt" size={24} color="white" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <Text style={styles.orderTotal}>{order.total}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    marginTop:60
  },
  orderList: {
    height: 550,
    marginBottom:75,
  },
  orderCard: {
    width: 343,
    height: 95,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.09)',
    borderRadius: 9,
    marginBottom: 15,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:30,
    marginLeft:15
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'row', // Arrange text side by side
    alignItems: 'center',
  },
  orderDate: {
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 10, // Space between date and total
  },
  orderTotal: {
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 10, // Space between date and total
    // Additional styling if needed
  },
});

export {mockOrders,getImage}
export default OrderHistoryScreen;
