import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { mockProducts } from './ProductManagementScreen';

type Product = {
    id: number;
    name: string;
    price: string;
    description: string;
    image: any; // Adjust based on your image handling
};

// Mock function to simulate fetching product data
const fetchProduct = (productId: number): Product | undefined => {
    // Replace this with real fetching logic
    return mockProducts.find(product => product.id === productId);
};

const EditProductScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params as { productId: number };
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const fetchedProduct = fetchProduct(productId);
        setProduct(fetchedProduct);
    }, [productId]);

    // Mock function to simulate image change
    const handleChangeImage = () => {
        if (product) {
            // Replace with actual image picking logic
            const newImage = require('../../../assets/img/logo.png');
            setProduct({ ...product, image: newImage });
        }
    };

    const handleSave = () => {
        if (product) {
            console.log('Save edited product:', product);
            // Add logic to save the edited product
        }
    };

    if (!product) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/img/default_profile.png')} style={styles.profileImage} />
            <Text style={styles.title}>Edit Product</Text>
            <TextInput 
                style={styles.input} 
                value={product.name} 
                onChangeText={(text) => product && setProduct({ ...product, name: text })}
                placeholder="Product Name"
            />
            <TextInput 
                style={styles.input} 
                value={product.price} 
                onChangeText={(text) => product && setProduct({ ...product, price: text })}
                placeholder="Price"
            />
            <TextInput 
                style={styles.input} 
                value={product.description} 
                onChangeText={(text) => product && setProduct({ ...product, description: text })}
                placeholder="Description"
            />
            <Image source={product.image} style={styles.productImage} />
            <TouchableOpacity style={styles.button} onPress={handleChangeImage}>
                <Text style={styles.buttonText}>Change Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop:-35
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        alignSelf:'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: 'orange', // Example color
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditProductScreen;
