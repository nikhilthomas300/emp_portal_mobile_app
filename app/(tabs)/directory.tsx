import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DirectoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Directory</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
});
