import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

interface AuthInputProps {
  label?: string;
  icon?: string;
  iconSet?: 'FontAwesome' | 'Feather' | 'Fontisto';
  secureTextEntry?: boolean;
  toggleSecureEntry?: boolean; // Prop for password visibility toggle
  placeholder?: string;
  style?: ViewStyle;
  value?: string; // Added value prop
  onChangeText?: (text: string) => void; // Added onChangeText prop
}

const AuthInput: React.FC<AuthInputProps> = ({
  label = "Default Label",
  icon,
  iconSet = 'FontAwesome',
  secureTextEntry = false,
  toggleSecureEntry = false,
  placeholder,
  style,
  value, // Added value prop
  onChangeText, // Added onChangeText prop
}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);

  const renderIcon = () => {
    if (!icon) return null;

    switch (iconSet) {
      case 'FontAwesome':
        return <FontAwesomeIcon name={icon} size={20} />;
      case 'Feather':
        return <FeatherIcon name={icon} size={20} />;
      case 'Fontisto':
        return <FontistoIcon name={icon} size={20} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isSecureEntry}
          placeholder={placeholder}
          value={value} // Pass the value prop here
          onChangeText={onChangeText} // Pass the onChangeText prop here
          autoCapitalize={'none'}
        />
        {renderIcon()}
        {toggleSecureEntry && (
          <TouchableOpacity onPress={() => setIsSecureEntry(!isSecureEntry)} style={styles.icon}>
            <FeatherIcon name={isSecureEntry ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 301,
    height: 73,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    width: 301,
    height: 54,
    backgroundColor: '#E7E7E7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  label: {
    position: 'absolute',
    top: 0,
    right: 10,
    fontSize: 14,
    lineHeight: 17,
    color: 'rgba(73, 73, 73, 0.62)',
    marginTop: -7
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  icon: {
    padding: 10,
  },
});

export default AuthInput;
