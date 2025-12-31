import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LeaveBalanceSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Leave Balance</Text>
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

        {/* New Holiday Calendar Button */}
        <TouchableOpacity 
          style={styles.holidayButton}
          onPress={() => router.push('/holidays')}
          activeOpacity={0.7}
        >
          <View style={styles.holidayBtnContent}>
            <Text style={styles.holidayBtnText}>View Holiday Calendar</Text>
            <Text style={styles.holidayBtnSubtext}>See all public & optional holidays</Text>
          </View>
          <View style={styles.arrowContainer}>
            <ChevronRight size={20} color={Colors.primary} strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </View>
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
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    ...Colors.shadows.medium,
  },
  balanceGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  holidayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryLight + '50', // Very light tint
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  holidayBtnContent: {
    flex: 1,
  },
  holidayBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  holidayBtnSubtext: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
