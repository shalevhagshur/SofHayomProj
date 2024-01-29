// ProductHistoryNav.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductHistoryScreen from '../../screens/business screens/ProductHistory/ProductHistoryScreen';
import SpecificProductHistoryScreen from '../../screens/business screens/ProductHistory/SpecificProductHistoryScreen';

const Stack = createStackNavigator();

const ProductHistoryNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductHistory" component={ProductHistoryScreen} />
      <Stack.Screen name="SpecificProductHistory" component={SpecificProductHistoryScreen} />
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
};

export default ProductHistoryNav;
