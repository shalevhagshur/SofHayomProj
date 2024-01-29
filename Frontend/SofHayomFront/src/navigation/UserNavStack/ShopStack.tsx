import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopScreen from '../../screens/user screens/shop/ShopScreen'; // main shop screen
import CheckOutScreen from '../../screens/user screens/shop/CheckOutScreen';
import BrainTreeScreen from '../../screens/user screens/shop/BrainTreeScreen';  // individual shop detail screen
// ... import other shop screens as needed ...

const ShopStack = createStackNavigator();

const ShopStackScreen = () => {
  return (
    <ShopStack.Navigator screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="ShopMain" component={ShopScreen} />
      <ShopStack.Screen name="CheckOut" component={CheckOutScreen} />
      <ShopStack.Screen name="BrainTree" component={BrainTreeScreen} />
      {/* ... other shop screens ... */}
      
    </ShopStack.Navigator>
  );
};

export default ShopStackScreen;
