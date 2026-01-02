import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, ChevronRight, Clock, Umbrella } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SectionHeader } from '../home';

export default function LeaveBalanceSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Leave Balance" 
        icon={Umbrella}
        iconColor="#10B981"
      />

      <View style={styles.cardWrapper}>
        <View style={styles.mainCard}>
          {/* Leave Balance Row */}
          <View style={styles.balanceRow}>
            {/* Casual Leave */}
            <View style={styles.balanceItem}>
              <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
                <Clock size={16} color="#6366F1" />
              </View>
              <View style={styles.balanceInfo}>
                <Text style={[styles.balanceValue, { color: '#6366F1' }]}>08</Text>
                <Text style={styles.balanceLabel}>Casual</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.verticalDivider} />

            {/* Earned Leave */}
            <View style={styles.balanceItem}>
              <View style={[styles.iconContainer, { backgroundColor: '#ECFDF5' }]}>
                <Briefcase size={16} color="#10B981" />
              </View>
              <View style={styles.balanceInfo}>
                <Text style={[styles.balanceValue, { color: '#10B981' }]}>14</Text>
                <Text style={styles.balanceLabel}>Earned</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.verticalDivider} />

            {/* Holiday Calendar */}
            <TouchableOpacity 
              style={styles.holidayItem}
              onPress={() => router.push('/holidays')}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FFF7ED' }]}>
                <Calendar size={16} color="#EA580C" />
              </View>
              <View style={styles.balanceInfo}>
                <Text style={styles.holidayText}>Holiday</Text>
                <Text style={styles.balanceLabel}>Calendar</Text>
              </View>
              <ChevronRight size={14} color="#CBD5E1" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  cardWrapper: {
    paddingHorizontal: Colors.spacing,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceInfo: {
    gap: 1,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },
  holidayItem: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 8,
  },
  holidayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EA580C',
  },
});
