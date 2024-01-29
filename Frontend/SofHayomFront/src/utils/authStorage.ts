import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (e) {
    // reading error
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (e) {
    // remove error
  }
};
