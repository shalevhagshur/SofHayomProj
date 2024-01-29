import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/business screens/Account/AccountScreen'; // Adjust the path as per your folder structure
import ProductManagementNav from './BusinessNavStack/ProductManagmentStack'; // Ensure the path is correct
import ProductHistoryNav from './BusinessNavStack/ProductHistoryStack'; // Ensure the path is correct
import CustomTabBar from '../components/CustomTabBar'; // Ensure the path is correct
import BusinessNotAuthorized from '../screens/business screens/BusinessNotAuthorized';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const BusinessNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ headerShown: false }} 
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="ProductManagement"
    >
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="ProductManagement" component={ProductManagementNav} />
      <Tab.Screen name="ProductHistory" component={ProductHistoryNav} />
    </Tab.Navigator>
  );
};

export default BusinessNavigator;
