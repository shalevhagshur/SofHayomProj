// AccountImage.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface AccountImageProps {
    source: any; // Replace 'any' with the appropriate type for your image source
    size?: number;
}

const AccountImage: React.FC<AccountImageProps> = ({ source, size = 120 }) => (
    <Image source={source} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
);

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        // Add more styles as needed
    },
});

export default AccountImage;
