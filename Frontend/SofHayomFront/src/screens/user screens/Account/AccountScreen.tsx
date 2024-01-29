import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import CardButton from '../../../components/CardButton';
import AuthButton from '../../../components/AuthButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const AccountScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleButtonPress = (content: string) => {
        setModalContent(content);
        setModalVisible(true);
    };

    const handleSubmit = () => {
        switch (modalContent) {
            case 'Edit Profile':
                console.log('Editing profile:', username);
                break;
            case 'Program Help':
                console.log('Requesting program help');
                break;
            case 'Change Password':
                console.log('Changing password to:', newPassword);
                break;
            default:
                console.log('No action for this content');
        }
        setModalVisible(false);
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case 'Edit Profile':
                return (
                    <View>
                        <Text>שנה שם משתמש</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            placeholder="שם משתמש חדש"
                        />
                    </View>
                );
            case 'Program Help':
                return (
                    <View>
                        <Text>Contact Us</Text>
                        <TextInput
                            style={styles.largeInput}
                            // onChangeText={handleTextInputChange} // You can add a state handler if needed
                            // value={textInputValue} // You can add a state variable if needed
                            placeholder="הזן פנייה או שאלה"
                            multiline
                        />
                    </View>
                );
            case 'Change Password':
                return (
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCurrentPassword}
                            value={currentPassword}
                            placeholder="סיסמה נוכחית"
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            placeholder="סיסמה חדשה"
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder="אימות סיסמה חדשה"
                            secureTextEntry
                        />
                    </View>
                );
            default:
                return <Text>Content not found</Text>;
        }
    };

    const handleLogoutPress = () => {
        console.log('Logout pressed');
        // Add your logout logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.bannerArea}>
                <Image
                    source={require('../../../assets/img/TypographyImage.png')}
                    style={styles.bannerImage}
                />
            </View>
            <Text style={styles.title}>ברוך הבא שם משתמש !</Text>
            <CardButton
                buttontitle="עריכה"
                iconName="edit"
                onPress={() => handleButtonPress('Edit Profile')}
            />
            <CardButton
                buttontitle="עזרה תכנית"
                iconName="help-circle"
                onPress={() => handleButtonPress('Program Help')}
                iconLibrary='Feather'
            />
            <CardButton
                buttontitle="שינויי סיסמה"
                iconName="locked"
                iconLibrary='Fontisto'
                onPress={() => handleButtonPress('Change Password')}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
                    <Text style={styles.logoutText}>התנתקות</Text>
                    <MaterialIcons name="logout" size={20} color="red" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(!isModalVisible)}
            >
                <View style={styles.modalView}>
                    {renderModalContent()}
                    <AuthButton style={styles.input}
                        onPress={handleSubmit}
                        title={modalContent === 'Program Help' ? 'שלח פנייה' : 'אישור'}
                    />
                    <AuthButton style={styles.input}
                        onPress={() => setModalVisible(false)}
                        title='סגור'
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bannerArea: {
        width: '100%',
        height: 210,
        backgroundColor: '#1a3644',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 50,
        marginBottom: 50,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
    },
    largeInput: {
        width: 200,
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top', // Align text to the top for multiline input
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align to the right
        marginTop: 25,
        marginRight: -215, // Right margin
    },
    logoutText: {
        color: 'red',
        marginRight: 5, // Space between text and icon
        // Additional styling for the text
    },
    // Additional styling as needed
});

export default AccountScreen;
