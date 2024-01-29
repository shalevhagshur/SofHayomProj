// AuthLinkTo.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AuthLinkToProps {
    title: string;
    onPress: () => void;
}

const AuthLinkTo: React.FC<AuthLinkToProps> = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    link: {
        fontFamily: 'Rubik',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
    },
});

export default AuthLinkTo;
