import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const EditProfileModal = ({ username, setUsername, businessName, setBusinessName }) => {
    return (
        <View>
            <Text>שם משתמש</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="שם משתמש חדש"
            />
            <Text>שם עסק</Text>
            <TextInput
                style={styles.input}
                onChangeText={setBusinessName}
                value={businessName}
                placeholder="שם עסק חדש"
            />
        </View>
    );
};

const ProgramHelpModal = () => {
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
};

const ChangePasswordModal = ({ currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword }) => {
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
};

const ChangeImageModal = ({ handleChooseImagePress, handleChangeImagePress }) => {
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
};

const styles = StyleSheet.create({
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    largeInput: {
        width: '80%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top',
    },
    modalContentContainer: {
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

export { EditProfileModal, ProgramHelpModal, ChangePasswordModal, ChangeImageModal };
