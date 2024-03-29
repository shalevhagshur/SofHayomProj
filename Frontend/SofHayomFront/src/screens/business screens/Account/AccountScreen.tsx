// AccountScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput, Button, Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'; 
import { logout } from '../../../store/slices/authSlice';
import { fetchUserData ,updateUser ,changeUserPassword ,createBusiness } from '../../../store/slices/userSlice';
import { fetchBusinessByUserId, saveBusiness, clearBusinessData } from '../../../store/slices/businessSlice';
import CardButton from '../../../components/CardButton';
import AuthButton from '../../../components/AuthButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Base64 } from 'js-base64';
import { API_BASE_URL } from '../../../utils/api';

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

      const formatImageUrl = (imageUrl: any) => {
        if (!imageUrl) return null; // Return null or a default image if imageUrl is falsy
        
        // Assuming API_BASE_URL might end with '/api' and we want to remove it
        let baseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
        
        return imageUrl.replace('http://localhost', baseUrl);
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
        }
    }, [isAuthenticated, token, dispatch]);

    useEffect(() => {
        if (userData && token) {
            setUsername(userData.username || defaultUsername);
            
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
    
    useEffect(() => {
        if (businessData?.business_image) {
            const formattedImageUrl = formatImageUrl(businessData.business_image);
            setProfileImage({ uri: formattedImageUrl });
            
        } else {
            setProfileImage(defaultProfileImage);
        }
    }, [businessData]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                // Request permission for media library (photo gallery)
                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (galleryStatus.status !== 'granted') {
                    Alert.alert('Sorry, we need gallery permissions to make this work!');
                }

                // Request permission for camera
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraStatus.status !== 'granted') {
                    Alert.alert('Sorry, we need camera permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.canceled && result.assets) {
            const firstAsset = result.assets[0];
            setProfileImage(firstAsset.uri);
    
            // Upload the image
            uploadImage(firstAsset.uri).then(() => {
                // You might want to update your state or Redux store here
            }).catch(error => {
                console.error("Image upload failed:", error);
                // Handle upload failure, such as updating state or showing an alert
            });
    
            // Close the modal if needed or perform additional actions
        }
    };
    
    const takeImageWithCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.canceled && result.assets) {
            const firstAsset = result.assets[0];
            setProfileImage(firstAsset.uri);
    
            // Upload the image
            uploadImage(firstAsset.uri).then(() => {
                // You might want to update your state or Redux store here
            }).catch(error => {
                console.error("Image upload failed:", error);
                // Handle upload failure, such as updating state or showing an alert
            });
    
            // Close the modal if needed or perform additional actions
        }
    };

    const createFormData = (photoUri) => {
        const formData = new FormData();
      
        // Add the file to the formData object
        formData.append('image', {
          uri: photoUri,
          type: 'image/jpeg', // or the correct mime type of your image
          name: `upload_${Date.now()}.jpg`, // Dynamically generate a name
        });
      
        return formData;
      };
      
      const uploadImage = async (photoUri: any) => {
        const formData = createFormData(photoUri);
    
        if (businessData?.business_image) {
            const oldImageURL = businessData.business_image;
    
            const prefixToRemove = `${API_BASE_URL}/storage`; 
            const oldImagePath = oldImageURL.replace(prefixToRemove, '');
    
            formData.append('oldImagePath', oldImagePath);
        } else {
            console.log("No existing business image to delete.");
        }
    
        try {
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: "POST",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const text = await response.text();
            const result = JSON.parse(text);
    
            if (result.url) {
                const updatedBusinessData = {
                    ...businessData,
                    business_image: result.url,
                };
    
                dispatch(saveBusiness(updatedBusinessData));
            }
        } catch (error) {
            console.error("Upload failed", error);
        }
    };
    
    

    
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [username, setUsername] = useState(defaultUsername);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(defaultProfileImage);  
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
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
                    if (newPassword !== confirmPassword) {
                        alert('הסיסמאות לא תואמות');
                        // Add any additional handling, like showing an error message to the user
                        break;
                    }
                    // Assuming you have the user's ID in userData.id
                    dispatch(changeUserPassword({
                        userId: userData.id,
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword
                    })).then(() => {
                        // Reset password fields after successful change
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        // Handle successful password change, e.g., showing a confirmation message
                    }).catch((error) => {
                        console.error('Error changing password:', error);
                        // Handle error, e.g., showing an error message
                    });
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
                        <View style={styles.passwordContainer}>
                            <TextInput
                            style={styles.input}
                            onChangeText={setCurrentPassword}
                            value={currentPassword}
                            placeholder="סיסמה נוכחית"
                            secureTextEntry={!showCurrentPassword}
                            />
                            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                            <MaterialIcons name={showCurrentPassword ? 'visibility' : 'visibility-off'} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                            style={styles.input}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            placeholder="סיסמה חדשה"
                            secureTextEntry={!showNewPassword}
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                            <MaterialIcons name={showNewPassword ? 'visibility' : 'visibility-off'} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                            style={styles.input}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder="אימות סיסמה חדשה"
                            secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 'Change Image':
                return (
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.modalTitle}>שנה תמונה</Text>
                        <Button title="בחר תמונה" onPress={pickImageFromGallery} color="#1a3644" />
                        <Button title="צלם תמונה" onPress={takeImageWithCamera} color="#1a3644" />
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      
    // Additional styling as needed
});

export default AccountScreen;