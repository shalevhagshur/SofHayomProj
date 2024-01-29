import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Keyboard,} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigationTypes'; 

//we need to create a filtering by cllicking the banner rows instead of creating a seperate page
type BusinessType = {
    id: number;
    name: string;
    imageUrl: any; // Ideally, this should be a more specific type, like ImageSourcePropType
  };    
// Counter Component
const Counter = ({ initialCount = 0 }) => {
    const [count, setCount] = useState(initialCount);
  
    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const handleDecrement = () => {
      if (count > 0) {
        setCount(prevCount => prevCount - 1);
      }
    };
  
    return (
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterNumber}>{count}</Text>
        <TouchableOpacity onPress={handleIncrement} style={styles.counterButton}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

const ShopScreen = () => {
    const [bagItemCount, setBagItemCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<RootStackParamList>();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const businessData = [
        { id: 1, name: 'שופרסל', imageUrl: require('../../../assets/img/image1.png') },
        { id: 2, name: 'רולדין', imageUrl: require('../../../assets/img/image2.png') },
        { id: 3, name: 'שופרסל', imageUrl: require('../../../assets/img/image1.png') },
        { id: 4, name: 'רולדין', imageUrl: require('../../../assets/img/image2.png') },
        { id: 5, name: 'שופרסל', imageUrl: require('../../../assets/img/image1.png') },
        { id: 6, name: 'רולדין', imageUrl: require('../../../assets/img/image2.png') },
        { id: 7, name: 'שופרסל', imageUrl: require('../../../assets/img/image1.png') },
        { id: 8, name: 'רולדין', imageUrl: require('../../../assets/img/image2.png') },
        // ... Add more business profiles here
    ];

    const renderBusinessProfile = (business: BusinessType) => {
        return (
            <TouchableOpacity key={business.id} style={styles.businessProfile} onPress={() => {/* Filter products to specific business */}}>
                <View style={styles.profileImageContainer}>
                    <Image source={business.imageUrl} style={styles.profileImage} />
                </View>
                <Text style={styles.businessName}>{business.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderItemCard = () => {
        return (
            <View style={styles.itemCard}>
                <Image source={require('../../../assets/img/productImage.png')} style={styles.itemImage} />
                <View style={styles.divider} />
                <FontAwesome name="heart-o" size={24} color="black" style={styles.heartIcon} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>סופגניות ורודת- רולדין</Text>
                    <Text style={styles.itemPrice}>מחיר ליחידה: 3.90 ש”ח</Text>
                    <View style={styles.counterContainer}>
                    <Counter initialCount={0} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('CheckOut')} style={styles.shoppingBagIcon}>
                    <Text style={styles.bagItemCount}>{bagItemCount}</Text>
                    <FontAwesome5 name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.welcomeText}>ברוך הבא שם משתמש</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.businessRow}>
                {businessData.map(renderBusinessProfile)}
            </ScrollView>
            <View style={styles.searchBarContainer}>
                <FontAwesome name="search" size={24} color="rgba(71, 71, 71, 0.6)" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    placeholder="חיפוש"
                />
            </View>
            {!isKeyboardVisible && (
            <ScrollView style={styles.productArea} showsVerticalScrollIndicator={false}>
            <Text>  {renderItemCard()} {/* Render the item card. For multiple items, loop through data */}</Text>
            <Text>  {renderItemCard()} {/* Render the item card. For multiple items, loop through data */}</Text>
            <Text>  {renderItemCard()} {/* Render the item card. For multiple items, loop through data */}</Text>
            </ScrollView>
            )}

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 50,
    },
    welcomeText: {
        fontSize: 21,
        fontWeight: '500',
        marginRight: 55,
    },
    shoppingBagIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    bagItemCount: {
        marginRight: 5,
        fontSize: 16,
    },
    businessRow: {
        flexDirection: 'row',
        height: 86,
        marginTop: 20,
        
    },
    businessProfile: {
        width: 67,
        height: 86,
        alignItems: 'center',
        marginRight: 10,
    },
    profileImageContainer: {
        width: 67,
        height: 67,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.09)',
    },
    profileImage: {
        width: 67,
        height: 67,
        borderRadius: 9,
    },
    businessName: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 23,
        padding: 10,
        marginTop: 261, 
        marginHorizontal:43,
        width: 274,
        height: 45,
        position:'absolute'
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'rgba(71, 71, 71, 0.6)',
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    productArea: {
        // position:'absolute',
        marginTop: 10, // Adjust as needed
        width: 322,
        height: 244,
        marginBottom:55,
        // bottom:60,
        // left:20,
        // right:20
        
        // Add additional styling as needed
    },
    fixedPositionView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // Style your fixed view as needed
    },
    itemCard: {
        width: 322,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.09,
        shadowRadius: 3,
        marginBottom: 20,
        overflow: 'hidden', // This ensures that the borderRadius applies to the image as well
    },
    itemImage: {
        width: '100%',
        height: 115, // Height of the image
    },
    itemDetails: {
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
    heartIcon: {
        position: 'absolute', // Position the heart icon absolutely so it can be placed in the correct corner
        top: 5, // Align with the title's top margin
        left: 10, // Distance from the left edge
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
        marginTop: 5, // Adjust the space between the title and the heart icon
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.72)',
        marginTop: 5, // Adjust as needed
    },
    counterContainer: {
        // Style for the counter container
        position: 'absolute',
        right: 10,
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:200
    },
    divider: {
        height: 2,
        backgroundColor: '#D3D3D3',
        marginVertical: 7,
    },
    counterButton: {
        width: 30, // Set the width to your desired size
        height: 30, // Make sure the height is the same as the width
        backgroundColor: 'white',
        borderRadius: 20, // Half of the width/height to make it a perfect circle
        // Add shadow as before
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
        justifyContent: 'center', // Center the '+' and '-' inside the circle
        alignItems: 'center',
      },
      
      counterButtonText: {
        fontSize: 34,
        color:"orange",
        lineHeight: 35,
        // Add your styles here
      },
      counterNumber: {
        marginHorizontal: 10,
        fontSize: 18,
        // Add your styles here
      },
    
});

export default ShopScreen;
