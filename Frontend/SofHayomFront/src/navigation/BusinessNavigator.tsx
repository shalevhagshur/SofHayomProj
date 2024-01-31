import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import AccountScreen from '../screens/business screens/Account/AccountScreen';
import ProductManagementNav from './BusinessNavStack/ProductManagmentStack';
import ProductHistoryNav from './BusinessNavStack/ProductHistoryStack';
import BusinessNotAuthorized from '../screens/business screens/BusinessNotAutherized';
import CustomTabBar from '../components/CustomTabBar';

interface AuthState {
  isAuthenticated: boolean;
  userRole: number | null;
  token: string | null;
  isBusinessAuthorized: boolean | null;
  loading: boolean;
  error: string | null;
}

const Tab = createBottomTabNavigator();

const BusinessNavigator = () => {
  const { userRole, isBusinessAuthorized } = useSelector((state: { auth: AuthState }) => state.auth);

  useEffect(() => {
    
  }, [isBusinessAuthorized]);

  if (userRole === 1 && isBusinessAuthorized === false) {
    return <BusinessNotAuthorized />;
  }
  
  else{
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
}
};

export default BusinessNavigator;
