// SplitScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from '../../../components/Logo';
import AuthButton from '../../../components/AuthButton';
import { RootStackParamList } from '../navigationTypes'; // Set this path


type SplitScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Split'>;

const SplitScreen: React.FC = () => {
  const navigation = useNavigation<SplitScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Logo width={163} height={163} style={{ marginBottom: 40, marginTop: 80 }}/>
      <Text style={styles.title}>ברוכים הבאים</Text>
      <Text style={styles.title2}>לסוף היום!</Text>

      <AuthButton
        title="היכנס"
        onPress={() => navigation.navigate('SignIn')}
        style={styles.buttonStyle}
      />
      <AuthButton
        title="הירשם"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.buttonStyle}
      />
      <Text 
        style={styles.termsText}
        onPress={() => navigation.navigate('TermsAndConditions')}
      >
        תקנון האפליקציה
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 0,
    fontWeight: '900'
  },
  title2: {
    fontSize: 28,
    marginBottom: 25,
    fontWeight: '900'
  },
  termsText: {
    marginTop: 20,
    color: 'black',
  },
  buttonStyle: {
    marginTop: 20, // Margin top for spacing between buttons
  },
});

export default SplitScreen;