// BusinessProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface BusinessProductCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const BusinessProductCard: React.FC<BusinessProductCardProps> = ({ title, description, imageUrl }) => (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
);

const styles = StyleSheet.create({
    card: {
        width: 343,
        height: 95,
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.09,
        shadowRadius: 3,
        elevation: 3,
        flexDirection: 'row',
        padding: 10,
    },
    title: {
        fontFamily: 'Rubik',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.72)',
        // Add more styles as needed
    },
    description: {
        fontFamily: 'Rubik',
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.72)',
        // Add more styles as needed
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default BusinessProductCard;
