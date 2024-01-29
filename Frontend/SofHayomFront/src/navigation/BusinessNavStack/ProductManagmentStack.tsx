// ProductManagementNav.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductManagementScreen from '../../screens/business screens/ProductManagment/ProductManagementScreen';
import AddProductScreen from '../../screens/business screens/ProductManagment/AddProductScreen';
import EditProductScreen from '../../screens/business screens/ProductManagment/EditProductScreen';

const Stack = createStackNavigator();

const ProductManagementNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductManagement" component={ProductManagementScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
};

export default ProductManagementNav;
