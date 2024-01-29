import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Product = {
    id: number;
    name: string;
    price: string;
    description: string;
    image: any;
};

const defaultProductImage = require('../../../assets/img/cucumber.png'); // Default product image

const AddProductScreen = () => {
    const navigation = useNavigation();
    const [newProduct, setNewProduct] = useState<Product>({ id: Date.now(), name: '', price: '', description: '', image: defaultProductImage });

    // Mock function to simulate image change
    const handleChangeImage = () => {
        // Replace with actual image picking logic
        const newImage = require('../../../assets/img/tomato.png'); // Example image
        setNewProduct({ ...newProduct, image: newImage });
    };

    const handleSave = () => {
        console.log('Add new product:', newProduct);
        // Add logic to add the new product
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/img/default_profile.png')} style={styles.profileImage} />
            <Text style={styles.title}>הוסף מוצר חדש</Text>
            <TextInput 
                style={styles.input} 
                value={newProduct.name} 
                onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
                placeholder="שם מוצר"
            />
            <TextInput 
                style={styles.input} 
                value={newProduct.price} 
                onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
                placeholder="מחיר"
            />
            <TextInput 
                style={styles.input} 
                value={newProduct.description} 
                onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
                placeholder="תיאור המוצר"
            />
            <Image source={newProduct.image} style={styles.productImage} />
            <TouchableOpacity style={styles.button} onPress={handleChangeImage}>
                <Text style={styles.buttonText}>Change Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save New Product</Text>
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
        marginTop: -35
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center'
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

export default AddProductScreen;
