// SkipExplanation.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SkipExplanationProps {
    title: string;
    onPress: () => void;
}

const SkipExplanation: React.FC<SkipExplanationProps> = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.skip}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    skip: {
        fontFamily: 'Rubik',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },
});

export default SkipExplanation;
