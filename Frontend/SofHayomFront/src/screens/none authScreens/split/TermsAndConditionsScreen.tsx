import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const termsAndConditionsText = `
תנאי שימוש באפליקציה SofHayom

1. הקדמה
בברכה על שימושך באפליקציה SofHayom. אנא קרא את תנאי השימוש הבאים בקפידה.

2. מדיניות פרטיות
האפליקציה עוקבת אחרי מדיניות פרטיות שמגנה על המידע שלך.

3. שימוש חוקי
המשתמש מתחייב לא להשתמש באפליקציה למטרות בלתי חוקיות או אסורות.

4. זכויות יוצרים
כל התוכן באפליקציה, כולל טקסטים, גרפיקה, לוגואים, הם בבעלות של SofHayom או מפיקיה.

5. הגבלת אחריות
SofHayom לא תהיה אחראית לנזקים מיוחדים, עקיפים, תוצאתיים, או לכל נזק אחר.

6. שינויים בתנאים
SofHayom שומרת לעצמה את הזכות לשנות את תנאי השימוש בכל עת.

7. הפרת תנאים
במקרה של הפרת תנאים אלו, SofHayom יכולה לנקוט בצעדים, כולל ביטול גישה לאפליקציה.

8. תוקף וסיום
תנאים אלו נותרים בתוקף כל עוד אתה משתמש באפליקציה.

9. פניות
לכל שאלה או פנייה ניתן ליצור קשר דרך info@sofhayom.com.

תנאים אלו נכנסים לתוקף מרגע השימוש הראשון באפליקציה.
`;


const TermsAndConditionsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>תנאים והגבלות</Text>
            <Text style={styles.content}>{termsAndConditionsText}</Text>
            <TouchableOpacity onPress={handleGoBack} style={styles.button}>
                <Text style={styles.buttonText}>חזור</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        textAlign: 'right',
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom:40
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default TermsAndConditionsScreen;
