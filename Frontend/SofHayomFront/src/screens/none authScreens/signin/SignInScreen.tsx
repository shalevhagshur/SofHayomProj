    // SignInScreen.tsx
    import React, { useState } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
    import { NativeStackNavigationProp } from '@react-navigation/native-stack';
    import { useNavigation } from '@react-navigation/native';
    import { useDispatch } from 'react-redux';
    import { signIn } from '../../../store/slices/authSlice'; // Adjust the import path
    import { RootStackParamList } from '../navigationTypes'; // Adjust the path as needed
    import Logo from '../../../components/Logo';
    import AuthButton from '../../../components/AuthButton';
    import AuthInput from '../../../components/AuthInput';

    type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

    const SignInScreen: React.FC = () => {
    const navigation = useNavigation<SignInScreenNavigationProp>();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        dispatch(signIn({ email, password }) as any);
    };
    
    return (
        <View style={styles.container}>
        <Logo width={105} height={105} style={styles.logo} />

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
            style={styles.authInputStyle}
            toggleSecureEntry={true}
        />
        
        <AuthButton 
            title="התחברות" 
            onPress={handleSignIn} 
            style={styles.buttonStyle}
        />

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.navigationText}>אין לכם חשבון? אנא הרשמו</Text>
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
        marginBottom: 60,
        marginTop: 30,
    },
    authInputStyle: {
        marginTop: 30,
        width: '85%',
    },
    buttonStyle: {
        marginTop: 20,
    },
    navigationText: {
        fontSize: 16,
        lineHeight: 19,
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        marginTop: 20,
    },
    });

    export default SignInScreen;
