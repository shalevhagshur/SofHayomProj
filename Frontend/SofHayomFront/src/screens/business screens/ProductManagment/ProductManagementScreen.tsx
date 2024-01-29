import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, ImageSourcePropType } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigationTypes'; // Adjust the import path as needed
import { StackNavigationProp } from '@react-navigation/stack';

interface ProductCardProps {
    product: Product;
    onDelete: (id: number) => any;
    onEdit: (id: number) => any;
}

type ProductManagementNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductManagement'
>;

type Product = {
    image: ImageSourcePropType;
    id: number;
    name: string;
    price: string;
    description: string;
};

const mockProducts = [
    {
      id: 1,
      name: 'עגבניות',
      price: '10.50 ש”ח',
      description: 'Description for tomatoes',
      image: require('../../../assets/img/tomato.png'), // Adjust the path as needed
    },
    {
      id: 2,
      name: 'מלפפונים',
      price: '15.75 ש”ח',
      description: 'Description for cucumbers',
      image: require('../../../assets/img/cucumber.png'), // Adjust the path as needed
    },
    {
      id: 3,
      name: 'תפוחים',
      price: '25.00 ש”ח',
      description: 'Description for apples',
      image: require('../../../assets/img/apple.png'), // Adjust the path as needed
    },
    {
      id: 4,
      name: 'לחם',
      price: '12.00 ש”ח',
      description: 'Description for bread',
      image: require('../../../assets/img/bread.png'), // Adjust the path as needed
    },
    {
        id: 5,
        name: 'לחם',
        price: '12.00 ש”ח',
        description: 'Description for bread',
        image: require('../../../assets/img/bread.png'), // Adjust the path as needed
      },
      {
        id: 6,
        name: 'לחם',
        price: '12.00 ש”ח',
        description: 'Description for bread',
        image: require('../../../assets/img/bread.png'), // Adjust the path as needed
      },
    // Add more products as needed
  ];

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
    return (
        <View style={styles.productCard}>
                        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(product.id)}>
                <FontAwesome name="edit" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(product.id)}>
                <FontAwesome name="trash" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <Image source={product.image} style={styles.productImage} />
        </View>
    );
};

const ProductManagementScreen = () => {
    const navigation = useNavigation<ProductManagementNavigationProp>();
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const handleDelete = (id: Number) => {/* handle delete */};
    const handleEdit = (id: number) => {
        navigateToEditProduct(id);
    };
    
    const navigateToAddProduct = () => {
        navigation.navigate('AddProduct');
    };

    const navigateToEditProduct = (productId: number) => {
        navigation.navigate('EditProduct', { productId });
    };
    

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => navigateToEditProduct(item.id)}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <FontAwesome name="edit" size={24} color="blue" />
            {/* Add more product details if needed */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/img/default_profile.png')} style={styles.profileImage} />
                <Text style={styles.headerTitle}>ניהול מוצרים</Text>
                <TouchableOpacity onPress={navigateToAddProduct}>
                    <Feather name="plus-square" size={34} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.infoText}>
            לחצו על הפח בשביל למחוק מוצר או{"\n" } לחצו על הפלוס בשביל להוסיף מוצר חדש
            </Text>

            <ScrollView
                style={styles.productsList}
                showsVerticalScrollIndicator={false}
            >
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onDelete={handleDelete} 
                    onEdit={handleEdit}
                />
            ))}

            </ScrollView>

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
        marginTop:60
    },
    profileImage: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor:'black'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    infoText: {
        width: 231,
        height: 33,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
        color: 'rgba(71, 71, 71, 0.6)',
        alignSelf:'center'

    },
    productsList: {
        position: 'absolute',
        top: 220,
        left: 20,
        right:20,
        width: 313,
        height: 426,
        alignSelf: 'center',
        paddingBottom: 60,

    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.09,
        shadowRadius: 3,
        marginVertical: 8,
        paddingHorizontal: 10,
        height: 95,
    },
    productDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
    productName: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        fontWeight:'800'
    },
    productPrice: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        fontWeight:'500'
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    deleteButton: {
        backgroundColor: '#FC4740',
        width: 66,
        height: 95,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#7CB9E8', // Replace with your desired color
        width: 66,
        height: 95,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Add more styles as needed
});

export {mockProducts}
export default ProductManagementScreen;
