// Helpers.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTokenInAsyncStorage = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error storing token in AsyncStorage:', error);
  }
};