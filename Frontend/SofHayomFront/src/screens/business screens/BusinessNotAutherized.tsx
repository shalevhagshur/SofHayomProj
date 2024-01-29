// BusinessNotAuthorized.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessNotAuthorized: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>גישה לאפליקציה תתאפשר רק אחריי אישור של הצוות{"\n" } עד אז אנה המתן מומלץ לבדוק שוב בעוד שעה </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default BusinessNotAuthorized;
