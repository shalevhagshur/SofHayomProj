// AuthButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface AuthButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;  // Allow for custom styles to be passed
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: 174,
        height: 48,
        backgroundColor: '#FEA019',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // default styling
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default AuthButton;
