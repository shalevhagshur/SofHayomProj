import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NoneAuthNavigator from './navigation/NoneAuthNavigator';
import UserNavigator from './navigation/UserNavigator';
import BusinessNavigator from './navigation/BusinessNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';
import { RootState } from './store/store';
import { setCredentials } from './store/slices/authSlice';
import api from './utils/api';

// Function to manually decode a JWT token
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Base64.atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

const NavigatorSelector = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = decodeToken(token);
          const userId = decoded.sub;
          const response = await api.get(`/users/${userId}`);
          const userRole = response.data.role_id;
          const isBusinessAuthorized = response.data.is_business_authorized === 1; // Check if the user is business authorized
          dispatch(setCredentials({ token, userRole, isBusinessAuthorized }));
          
        }
      } catch (error) {
        console.error('Error decoding token or fetching user data:', error);
      }
    };

    checkToken();
  }, [dispatch]);

  if (!isAuthenticated) {
    return <NoneAuthNavigator />;
  } else {
    return userRole === 1 ? <BusinessNavigator /> : <UserNavigator />;
  }
};

export default NavigatorSelector;
