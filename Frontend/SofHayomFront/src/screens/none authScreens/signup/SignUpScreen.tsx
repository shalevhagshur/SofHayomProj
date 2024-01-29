// SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { registerUser, registerBusiness } from '../../../store/slices/authSlice';
import { RootStackParamList } from '../navigationTypes';
import Logo from '../../../components/Logo';
import AuthButton from '../../../components/AuthButton';
import AuthInput from '../../../components/AuthInput';
import ImageSelection from '../../../components/ImageSelection';
import { AppDispatch } from '../../../store/store';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [userType, setUserType] = useState<'business' | 'user' | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = () => {
    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation
    };

    if (userType === 'user') {
      dispatch(registerUser(userData));
    } else if (userType === 'business') {
      dispatch(registerBusiness(userData));
    } else {
      alert('Please select a user type');
    }
  };

  return (
    <View style={styles.container}>
      <Logo width={63} height={63} style={styles.logo} />
      <Text style={styles.title}>סוג משתמש</Text>
      <ImageSelection onUserTypeSelect={setUserType} />

      <AuthInput 
        label="שם" 
        placeholder="שם משתמש" 
        value={username}
        onChangeText={setUsername}
        style={styles.authInputStyle} 
        icon='user'
        iconSet='Feather'
      />

      <AuthInput 
        label="דואר אלקטרוני" 
        placeholder="מייל" 
        value={email}
        onChangeText={setEmail}
        style={styles.authInputStyle} 
        icon='mail'
        iconSet='Feather'
      />

      <AuthInput 
        label="סיסמה"
        placeholder="סיסמה" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
        toggleSecureEntry={true}
        style={styles.authInputStyle}
      />

      <AuthInput 
        label="אישור סיסמה"
        placeholder="אישור סיסמה" 
        secureTextEntry 
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        toggleSecureEntry={true}
        style={styles.authInputStyle}
      />

      <AuthButton 
        title="הירשם" 
        onPress={handleSignUp} 
        style={styles.buttonStyle}  
      />

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.navigationText}>יש לכם חשבון? התחברו</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  logo: {
    marginBottom: 15,
  },
  authInputStyle: {
    marginTop: 5,
    width: '85%',
  },
  buttonStyle: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 0,
    fontWeight: '600',
  },
  navigationText: {
    fontSize: 16,
    lineHeight: 19,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
