// AccountScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store'; 
import { logout } from '../../../store/slices/authSlice';
import { fetchUserData ,updateUser ,changeUserPassword ,createBusiness } from '../../../store/slices/userSlice';
import { fetchBusinessByUserId, saveBusiness, clearBusinessData } from '../../../store/slices/businessSlice';
import CardButton from '../../../components/CardButton';
import AuthButton from '../../../components/AuthButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Base64 } from 'js-base64';

    const decodeToken = (token: string) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(Base64.atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          return JSON.parse(jsonPayload);
        } catch (e) {
          console.error('Error decoding token:', e);
          return null;
        }
      };

const AccountScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const userData = useSelector((state: RootState) => state.user.userData);
    const businessData = useSelector((state: RootState) => state.business.businessData);

    

        // Default data setup
    const defaultUsername = 'DefaultUsername';
    const defaultProfileImage = require('../../../assets/img/default_profile.png');

    
    useEffect(() => {
        if (isAuthenticated && token) {
            const userId = decodeToken(token).sub;
            // dispatch(fetchUserData(userId));
            // setBusinessAddress(businessData?.address)
            // setBusinessName(businessData?.name)
            
            //add other business settings later
            
        }
    }, [isAuthenticated, token, dispatch]);

    useEffect(() => {
        if (userData && token) {
            setUsername(userData.username || defaultUsername);
            setProfileImage(userData.profileImage || defaultProfileImage);
        }
        
    }, [userData]);

    useEffect(() => {
        if (isAuthenticated && token) {
            const userId = decodeToken(token).sub;
            dispatch(fetchBusinessByUserId(userId));
            dispatch(fetchUserData(userId));
  
        }
    }, [isAuthenticated, token, dispatch]);

    useEffect(() => {
        if (businessData) {
            setBusinessName(businessData.name);
            setBusinessAddress(businessData.address);
        }
    }, [businessData]);
    
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [username, setUsername] = useState(defaultUsername);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(defaultProfileImage);  
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessImage, setBusinessImage] = useState(null);

    const handleButtonPress = (content: string) => {
        setModalContent(content);
        setModalVisible(true);
    };

    const handleSubmit = () => {
        switch (modalContent) {
            case 'Edit Profile':
                // Check if username has been edited
                if (username !== userData.username) {
                  // Call action to update username
                  console.log('Updating username:', username);
                  dispatch(updateUser({ userId: userData.id, updates: { username } }));
                }
          
                // Check if business details have been edited
                if (businessName || businessAddress) {
                    const businessUpdate = {
                        name: businessName || businessData?.name,
                        address: businessAddress || businessData?.address,
                        user_id: userData.id,
                    };
                    
                    if (businessData) {
                        dispatch(saveBusiness({ ...businessUpdate, id: businessData.id }));
                    } else {
                        dispatch(createBusiness(businessUpdate));
                    }
                }
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

                        <Text>ערוך\צור שם עסק</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setBusinessName}
                            value={businessName}
                            placeholder="שם העסק החדש"
                        />
                        <Text>שנה שם משתמש</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            placeholder="שם משתמש חדש"
                        />
                        <Text>ערוך\צור כתובת עסק</Text>
                        <TextInput
                        style={styles.input}
                        onChangeText={setBusinessAddress} // You will need to create and use a state variable for business name
                        value={businessAddress} // State variable for business name
                        placeholder="כתובת עסק חדשה"
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
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <View style={styles.bannerArea}>
                <Image source={require('../../../assets/img/TypographyImage.png')} style={styles.bannerImage} />
                <TouchableOpacity style={styles.profileImageContainer} onPress={() => handleButtonPress('Change Image')}>
                    <Image source={profileImage} style={styles.profileImage} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>ברוך הבא {username}!</Text>
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
