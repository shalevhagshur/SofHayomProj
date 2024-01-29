import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderHistoryScreen from '../../screens/user screens/OrderHistory/OrderHistoryScreen'; // main order history screen
import OrderDetailScreen from '../../screens/user screens/OrderHistory/OrderDetailScreen'; // individual order detail screen
// ... import other order history screens as needed ...

const OrderHistoryStack = createStackNavigator();

const OrderHistoryStackScreen = () => {
  return (
    <OrderHistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderHistoryStack.Screen name="OrderHistoryMain" component={OrderHistoryScreen} />
      <OrderHistoryStack.Screen name="OrderDetail" component={OrderDetailScreen} />
      {/* ... other order history screens ... */}
    </OrderHistoryStack.Navigator>
  );
};

export default OrderHistoryStackScreen;
