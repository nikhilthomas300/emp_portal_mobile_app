import Colors from '@/constants/Colors';
import { Calendar, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HolidayCalendarModal from './HolidayCalendarModal';

export default function LeaveBalanceSection() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Leave Balance</Text>
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.linkText}>Holidays</Text>
          <ChevronRight size={16} color={Colors.primary} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.balanceGrid}>
          <View style={styles.balanceItem}>
            <View style={[styles.iconBadge, { backgroundColor: Colors.primary + '15' }]}>
              <Calendar size={18} color={Colors.primary} strokeWidth={2.5} />
            </View>
            <Text style={styles.balanceLabel}>Casual & Sick</Text>
            <Text style={[styles.balanceValue, { color: Colors.primary }]}>8</Text>
            <Text style={styles.subLabel}>days available</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.balanceItem}>
            <View style={[styles.iconBadge, { backgroundColor: Colors.success + '15' }]}>
              <Calendar size={18} color={Colors.success} strokeWidth={2.5} />
            </View>
            <Text style={styles.balanceLabel}>Earned Leave</Text>
            <Text style={[styles.balanceValue, { color: Colors.success }]}>14</Text>
            <Text style={styles.subLabel}>days available</Text>
          </View>
        </View>
      </View>

      <HolidayCalendarModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
  },
  linkText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    ...Colors.shadows.medium,
  },
  balanceGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 80,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
});
