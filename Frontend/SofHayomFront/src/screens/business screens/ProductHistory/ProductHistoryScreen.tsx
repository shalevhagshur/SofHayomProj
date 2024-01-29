import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { mockProducts } from '../ProductManagment/ProductManagementScreen'; // Import mockProducts

type Product = {
    image: any;
    id: number;
    name: string;
    price: string;
    description: string;
};

interface ProductCardProps {
    product: Product;
    onRestore: (id: number) => any;
    onDelete: (id: number) => any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRestore, onDelete }) => {
    return (
        <View style={styles.productCard}>
            <TouchableOpacity style={styles.restoreButton} onPress={() => onRestore(product.id)}>
                <Feather name="repeat" size={24} color="white" />
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

const ProductHistoryScreen = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);

    const handleRestore = (id: number) => {
        console.log('Restore product:', id);
        // Logic to restore product
    };

    const handleDelete = (id: number) => {
        console.log('Delete product:', id);
        // Logic to delete product
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/img/default_profile.png')} style={styles.profileImage} />
                <Text style={styles.headerTitle}>היסטוריית מוצרים</Text>
            </View>

            <Text style={styles.infoText}>
                לחצו על הפח בשביל למחוק מוצר מהיסטורית מוצרים או{"\n"}לחצו על הכפתור הירוק בשביל להחזיר מוצר
            </Text>

            <ScrollView
                style={styles.productsList}
                showsVerticalScrollIndicator={false}
            >
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onRestore={handleRestore} 
                        onDelete={handleDelete}
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
        marginTop: 60
    },
    profileImage: {
        width: 62,
        height: 62,
        borderRadius: 31,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginLeft:-25
    },
    infoText: {
        width: 271,
        height: 70,
        fontSize: 14,
        lineHeight: 14,
        textAlign: 'center',
        color: 'rgba(71, 71, 71, 0.6)',
        alignSelf: 'center',
        marginBottom: -10,
        marginTop:5,
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
        fontWeight: '800'
    },
    productPrice: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        fontWeight: '500'
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
    restoreButton: {
        backgroundColor: '#32CD32', // Green color for restore button
        width: 66,
        height: 95,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Add more styles as needed
});

export default ProductHistoryScreen;
