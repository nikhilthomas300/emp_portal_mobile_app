import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

const LeaveItem = ({ label, value, total, color }: any) => {
  const percentage = (value / total) * 100;
  
  return (
    <View style={styles.leaveItem}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value}<Text style={styles.total}>/{total}</Text>
        </Text>
      </View>
      <View style={styles.progressBg}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
};

export const LeaveBalanceCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leave Balance</Text>
      </View>
      
      <View style={styles.content}>
        <LeaveItem 
          label="Casual Leave" 
          value={12} 
          total={20} 
          color={COLORS.primary} 
        />
        <LeaveItem 
          label="Earned Leave" 
          value={24} 
          total={30} 
          color={COLORS.success} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.l,
  },
  header: {
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    gap: SPACING.l,
  },
  leaveItem: {
    gap: SPACING.s,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  total: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  progressBg: {
    height: 6,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
});
