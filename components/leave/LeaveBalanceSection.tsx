import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SectionHeader } from '../home';

export default function LeaveBalanceSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader title="Leave Balance" />

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Balances Row */}
          <View style={styles.balanceRow}>
            {/* Casual / Sick */}
            <View style={styles.balanceItem}>
              <View style={[styles.iconCtx, { backgroundColor: '#EEF2FF' }]}>
                <Clock size={20} color="#6366F1" strokeWidth={2} />
              </View>
              <View>
                <Text style={[styles.balanceValue, { color: '#6366F1' }]}>08</Text>
                <Text style={styles.balanceLabel}>Casual / Sick</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Earned Leave */}
            <View style={styles.balanceItem}>
              <View style={[styles.iconCtx, { backgroundColor: '#DCFCE7' }]}>
                <Briefcase size={20} color="#16A34A" strokeWidth={2} />
              </View>
              <View>
                <Text style={[styles.balanceValue, { color: '#16A34A' }]}>14</Text>
                <Text style={styles.balanceLabel}>Earned Leave</Text>
              </View>
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={styles.secondaryBtn} 
              onPress={() => router.push('/holidays')}
              activeOpacity={0.7}
            >
              <Calendar size={16} color="#64748B" strokeWidth={2} />
              <Text style={styles.secondaryBtnText}>Holiday Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryBtnWrapper} 
              onPress={() => router.push('/apply-leave')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2563EB', '#3B82F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Apply Leave</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  cardWrapper: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  iconCtx: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  primaryBtnWrapper: {
    flex: 1,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 10,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  primaryBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
