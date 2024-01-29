import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface LogoProps {
    width?: number;
    height?: number;
    style?: ImageStyle; // Allow for custom styles
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100, style }) => (
    <Image 
        source={require('../assets/img/logo.png')} 
        style={[{ width, height, resizeMode: 'contain' }, style]} // Combine default and custom styles
    />
);

export default Logo;
