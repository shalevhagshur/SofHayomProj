import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentScreen = () => {
    const [clientToken, setClientToken] = useState('');

    useEffect(() => {
        // Fetch the client token from your server
        // fetchClientToken(); uncommet later
    }, []);

    const fetchClientToken = async () => {
        try {
            const response = await fetch("http://192.168.1.199:8000/api/payment/token", {
                method: "POST",
            });
            const data = await response.json();
            setClientToken(data.token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    //add cart later as &cart=${JSON.stringify({})} as  source={{ uri: `http://10.100.102.30:8000/dropin?token=${clientToken}&cart=${JSON.stringify({})}` }}

    return (
        <View style={styles.container}>
            {clientToken ? (
                <WebView
                    source={{ uri: `http://10.100.102.30:8000/dropin?token=${clientToken}&cart=${JSON.stringify({})}` }}
                    style={styles.webview}
                />
            ) : (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PaymentScreen;
