import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EllipseBackground from './EllipseBackground';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const ELLIPSE_WIDTH = 136; // Width of the ellipse
const ICON_SIZE = 30;
const FOCUSED_ICON_SIZE = 35;
const ICON_BACKGROUND_SIZE = 55; // Size of the circular background

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const getEllipsePosition = (index: number) => {
        const tabWidth = windowWidth / state.routes.length;
        let leftOffset = tabWidth * index + (tabWidth / 2) - (ELLIPSE_WIDTH / 2);

        // Adjust the left offset for different tabs if necessary
        if (index === 0) { // First tab (OrderHistory)
            leftOffset -= 25; // Adjust this value as needed
        
        }
        else if (index === 1) { // Shop
            leftOffset += -160; // Adjust as needed for Shop
        }
            else if (index === state.routes.length - 1) { // Last tab (Account)
            leftOffset += -300; // Adjust this value as needed
        }
        // No adjustment for the middle tab (Shop)

        return leftOffset;
    };

    return (
        <View style={styles.container}>
  {state.routes.map((route, index) => {
    const isFocused = state.index === index;
    const onPress = () => navigation.navigate(route.name); // Define onPress here
    let IconComponent;
    let iconName;
    let iconStyle = null;
    let highlightStyle = null;

    switch (route.name) {
        case 'ProductManagement':
            IconComponent = MaterialIcons;
            iconName = 'add-to-photos';
            if (isFocused) {
                iconStyle = styles.productManagementIcon;
                highlightStyle = styles.productManagementHighlight;
            }
            break;
        case 'ProductHistory':
            IconComponent = MaterialCommunityIcons;
            iconName = 'history';
            if (isFocused) {
                iconStyle = styles.orderHistoryIcon;
                highlightStyle = styles.orderHistoryHighlight;
            }
        case 'OrderHistory':
            IconComponent = MaterialCommunityIcons;
            iconName = 'history';
            if (isFocused) {
                iconStyle = styles.orderHistoryIcon;
                highlightStyle = styles.orderHistoryHighlight;
            }
            break;
        case 'Shop':
            IconComponent = MaterialCommunityIcons;
            iconName = 'cart';
            if (isFocused) {
                iconStyle = styles.shopIcon;
                highlightStyle = styles.shopHighlight;
            }
            break;
        case 'Account':
            IconComponent = FontAwesome;
            iconName = 'user';
            if (isFocused) {
                iconStyle = styles.focusedIcon;
                highlightStyle = styles.iconBackground;
            }
            break;
        default:
            IconComponent = FeatherIcon;
            iconName = 'question';
    }

    return (
        <TouchableOpacity 
            key={route.key} 
            onPress={onPress} 
            style={[styles.tabButton, isFocused ? styles.focusedTab : styles.unfocusedTab]}
        >
            {isFocused && <EllipseBackground left={getEllipsePosition(index)} />}
            {isFocused && <View style={highlightStyle} />}
            <IconComponent 
                name={iconName} 
                size={isFocused ? FOCUSED_ICON_SIZE : ICON_SIZE} 
                color={isFocused ? 'orange' : 'white'} 
                style={iconStyle}
            />
        </TouchableOpacity>
    );
})}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#1E1E1E',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 0
    },
    tabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    focusedTab: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    unfocusedTab: {
        // Styles for unfocused tabs
    },
    iconBackground: {
        position: 'absolute',
        width: ICON_BACKGROUND_SIZE,
        height: ICON_BACKGROUND_SIZE,
        borderRadius: ICON_BACKGROUND_SIZE / 2,
        backgroundColor: '#1E1E1E',
        top: '50%',
        marginTop: -50,
        left: 1
    
    },
    focusedIcon: {
        position: 'absolute',
        top: '70%',
        marginTop: -50,
        left: 15.7,
        
    },
    orderHistoryIcon: {
        position: 'absolute',
        top: '70%',
        marginTop: -50,
        left: -25,
        
    },
    orderHistoryHighlight: {
        position: 'absolute',
        width: ICON_BACKGROUND_SIZE,
        height: ICON_BACKGROUND_SIZE,
        borderRadius: ICON_BACKGROUND_SIZE / 2,
        backgroundColor: '#1E1E1E',
        top: '50%',
        marginTop: -50,
        left: -34
    },

    // Styles for Shop Icon and Highlight
    shopIcon: {
        position: 'absolute',
        top: '70%',
        marginTop: -50,
        left: -2,
    },
    shopHighlight: {
        position: 'absolute',
        width: ICON_BACKGROUND_SIZE,
        height: ICON_BACKGROUND_SIZE,
        borderRadius: ICON_BACKGROUND_SIZE / 2,
        backgroundColor: '#1E1E1E',
        top: '50%',
        marginTop: -50,
        left: -14
    },
    productManagementIcon: {
        position: 'absolute',
        top: '70%', // Adjust the vertical position
        marginTop: -50, // Adjust the margin
        left: -3, // Adjust the horizontal position
    },
    productManagementHighlight: {
        position: 'absolute',
        width: ICON_BACKGROUND_SIZE,
        height: ICON_BACKGROUND_SIZE,
        borderRadius: ICON_BACKGROUND_SIZE / 2,
        backgroundColor: '#1E1E1E',
        top: '50%', // Adjust the vertical position
        marginTop: -50, // Adjust the margin
        left: -13, // Adjust the horizontal position
    },
    // Additional styles...
});

export default CustomTabBar;
