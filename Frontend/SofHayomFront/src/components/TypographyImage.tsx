// TypographyImage.tsx
import React from 'react';
import { Image } from 'react-native';

interface TypographyImageProps {
    source: any;  // Replace 'any' with the appropriate type for your image source
    width: number;
    height: number;
}

const TypographyImage: React.FC<TypographyImageProps> = ({ source, width, height }) => (
    <Image source={require('../assets/img/TypographyImage.png')} style={{ width, height, resizeMode: 'contain' }} />
);

export default TypographyImage;
