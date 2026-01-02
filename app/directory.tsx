import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DirectoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Directory</Text>
      <Text style={styles.subtext}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  subtext: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
});
