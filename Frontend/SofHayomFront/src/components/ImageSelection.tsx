import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

type UserType = 'business' | 'user';

interface ImageSelectionProps {
    onUserTypeSelect: (type: UserType) => void;
  }

const ImageSelection: React.FC<ImageSelectionProps> = ({ onUserTypeSelect }) => {
    const [selected, setSelected] = useState<UserType | null>(null);
  

    const handleSelection = (type:UserType) => {
      setSelected(type);
      onUserTypeSelect(type); // Pass the selected type to the parent component
      };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSelection('user')} style={styles.selection}>
        <Image
          source={require('../assets/img/user.png')}
          style={[styles.image, selected === 'user' && styles.selected]}
        />
        <Text style={styles.text}>אני משתמש פרטי</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleSelection('business')} style={styles.selection}>
        <Image
          source={require('../assets/img/business.png')}
          style={[styles.image, selected === 'business' && styles.selected]}
        />
        <Text style={styles.text}>אני עסק</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  selection: {
    alignItems: 'center', // Center the image and text vertically
    marginHorizontal: 20,
  },
  image: {
    width: 61,
    height: 61,
  },
  selected: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  text: {
    marginTop: 5, // Spacing between image and text
    fontSize: 12, // Smaller text size
    textAlign: 'center', // Center the text
  },
});

export default ImageSelection;
