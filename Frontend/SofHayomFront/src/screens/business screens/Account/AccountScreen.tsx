import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput, Button } from 'react-native';
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
    const [businessName, setBusinessName] = useState('');
    const [profileImage, setProfileImage] = useState(require('../../../assets/img/default_profile.png'));

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

    const handleChooseImagePress = () => {
        console.log('Choose Image button pressed');
        // Future logic for choosing a new image
    };
    
    const handleChangeImagePress = () => {
        console.log('Change Image button pressed');
        // Future logic for updating the current image
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
                        <Text>שנה שם עסק</Text>
                        <TextInput
                        style={styles.input}
                        // onChangeText={setBusinessName} // You will need to create and use a state variable for business name
                        // value={businessName} // State variable for business name
                       placeholder="שם עסק חדש"
                       />

                       </View>
                );
            case 'Program Help':
                return (
                    <View>
                        <Text>צור קשר</Text>
                        <TextInput
                            style={styles.largeInput}
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
            case 'Change Image':
                return (
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.modalTitle}>שנה תמונה</Text>
                        <Button
                            title="בחר תמונה"
                            onPress={handleChooseImagePress}
                            color="#1a3644"
                        />
                        <Button
                            title="שנה תמונה"
                            onPress={handleChangeImagePress}
                            color="#1a3644"
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
                <Image source={require('../../../assets/img/TypographyImage.png')} style={styles.bannerImage} />
                <TouchableOpacity style={styles.profileImageContainer} onPress={() => handleButtonPress('Change Image')}>
                    <Image source={profileImage} style={styles.profileImage} />
                </TouchableOpacity>
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
                    <AuthButton
                        onPress={handleSubmit}
                        title={modalContent === 'Program Help' ? 'שלח פנייה' : 'אישור'}
                    />
                    <AuthButton
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
        position:'absolute'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 70,
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
        marginBottom:10,
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
    profileImageContainer: {
        marginTop: 220, // Adjust as needed for positioning
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 3,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignSelf:'center'
    },
    button: {
        backgroundColor: '#1a3644',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        // Add other styling as needed
    },
    modalContentContainer: {
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        // Additional styling for the title
    },
    // Additional styling as needed
});

export default AccountScreen;
