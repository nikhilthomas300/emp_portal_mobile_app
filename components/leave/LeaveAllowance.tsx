import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const leaves = [
  { id: 1, type: 'Earned', used: 12, total: 24, color: Colors.primary },
  { id: 2, type: 'Casual', used: 5, total: 12, color: Colors.accent },
];

export default function LeaveAllowance() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {leaves.map((leave, index) => (
          <View key={leave.id} style={[styles.item, index !== leaves.length - 1 && styles.borderRight]}>
            <Text style={[styles.count, { color: leave.color }]}>{leave.total - leave.used}</Text>
            <Text style={styles.label}>{leave.type} Bal</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    paddingVertical: 16,
    ...Colors.shadows.small,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  count: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    color: Colors.secondaryText,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
