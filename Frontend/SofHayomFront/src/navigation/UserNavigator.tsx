import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/user screens/Account/AccountScreen';
import ShopStackScreen from './UserNavStack/ShopStack';
import OrderHistoryStackScreen from './UserNavStack/OrderHistoryStack';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const UserNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ headerShown: false }} 
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Shop" // Set the initial route to 'Shop'
    >
      <Tab.Screen name="Account" component={AccountScreen}/>
      <Tab.Screen name="Shop" component={ShopStackScreen} />
      <Tab.Screen name="OrderHistory" component={OrderHistoryStackScreen} />
    </Tab.Navigator>
  );
};

export default UserNavigator;
