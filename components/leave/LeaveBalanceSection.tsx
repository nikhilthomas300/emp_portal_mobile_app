import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, ChevronRight, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SectionHeader } from '../home';

export default function LeaveBalanceSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader title="Leave Balance" />

      <View style={styles.cardWrapper}>
        <View style={styles.mainCard}>
          {/* Leave Cards - 2 types */}
          <View style={styles.leaveGrid}>
            {/* Casual / Sick Leave */}
            <View style={styles.leaveCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
                <Clock size={22} color="#6366F1" strokeWidth={1.8} />
              </View>
              <Text style={[styles.leaveValue, { color: '#6366F1' }]}>08</Text>
              <Text style={styles.leaveLabel}>Casual / Sick</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Earned Leave */}
            <View style={styles.leaveCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
                <Briefcase size={22} color="#16A34A" strokeWidth={1.8} />
              </View>
              <Text style={[styles.leaveValue, { color: '#16A34A' }]}>14</Text>
              <Text style={styles.leaveLabel}>Earned Leave</Text>
            </View>
          </View>

          {/* Holiday Calendar Link */}
          <TouchableOpacity 
            style={styles.holidayBtn}
            onPress={() => router.push('/holidays')}
            activeOpacity={0.7}
          >
            <View style={styles.holidayLeft}>
              <Calendar size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.holidayText}>View Holiday Calendar</Text>
            </View>
            <ChevronRight size={18} color={Colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cardWrapper: {
    paddingHorizontal: 16,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 20,
  },
  leaveGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  leaveCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#E2E8F0',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  leaveLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  holidayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  holidayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  holidayText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
});
