import Colors from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HolidayCalendarModal from './HolidayCalendarModal';

export default function LeaveBalanceSection() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Leave Balance</Text>
          <TouchableOpacity 
            style={styles.calendarLink}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.linkText}>Holidays</Text>
            <ChevronRight size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContent}>
          <View style={styles.balanceItem}>
            <Text style={[styles.balanceValue, { color: Colors.primary }]}>8</Text>
            <Text style={styles.balanceLabel}>Casual & Sick</Text>
            <Text style={styles.subLabel}>Available</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.balanceItem}>
            <Text style={[styles.balanceValue, { color: Colors.success }]}>14</Text>
            <Text style={styles.balanceLabel}>Earned Leave</Text>
            <Text style={styles.subLabel}>Available</Text>
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
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    ...Colors.shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  calendarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  subLabel: {
    fontSize: 11,
    color: Colors.secondaryText,
  },
});
