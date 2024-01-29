// LogoutLink.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface LogoutLinkProps {
    onPress: () => void;
}

const LogoutLink: React.FC<LogoutLinkProps> = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.logout}>התנתקות</Text>
        {/* Include the sign-out icon as needed */}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // Adjust positioning as needed
    },
    logout: {
        fontFamily: 'Rubik',
        fontSize: 16,
        fontWeight: '500',
        color: '#F22F27',
        textAlign: 'center',
    },
});

export default LogoutLink;
