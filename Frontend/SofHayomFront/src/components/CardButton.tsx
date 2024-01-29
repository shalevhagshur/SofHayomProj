// CardButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface CardButtonProps {
  buttontitle: string;
  iconName: string;
  onPress: () => void;
  iconLibrary?: 'FontAwesome' | 'Feather' | 'Fontisto';
}

const CardButton: React.FC<CardButtonProps> = ({ buttontitle, iconName, onPress, iconLibrary = 'FontAwesome' }) => {
  let IconComponent;
  switch (iconLibrary) {
    case 'Feather':
      IconComponent = Feather;
      break;
    case 'Fontisto':
      IconComponent = Fontisto;
      break;
    default:
      IconComponent = FontAwesome;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.text}>{buttontitle}</Text>
        <IconComponent name={iconName} size={20} color="#000" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 337,
    height: 73,
    backgroundColor: '#FFFFFF',
    borderRadius: 70,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-end', // Align items to the right
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default CardButton;
