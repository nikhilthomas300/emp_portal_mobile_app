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
            <TouchableOpacity style={styles.balanceItem} activeOpacity={0.7}>
              <View style={[styles.iconCtx, { backgroundColor: '#E6F0FF' }]}>
                <Clock size={20} color="#0066FF" strokeWidth={2} />
              </View>
              <Text style={[styles.balanceValue, { color: '#0066FF' }]}>08</Text>
              <Text style={styles.balanceLabel}>Casual/Sick</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Earned Leave */}
            <TouchableOpacity style={styles.balanceItem} activeOpacity={0.7}>
              <View style={[styles.iconCtx, { backgroundColor: '#DCFCE7' }]}>
                <Briefcase size={20} color="#00C48C" strokeWidth={2} />
              </View>
              <Text style={[styles.balanceValue, { color: '#00C48C' }]}>14</Text>
              <Text style={styles.balanceLabel}>Earned</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Holidays */}
            <TouchableOpacity 
              style={styles.balanceItem} 
              activeOpacity={0.7}
              onPress={() => router.push('/holidays')}
            >
              <View style={[styles.iconCtx, { backgroundColor: '#FEF3C7' }]}>
                <Calendar size={20} color="#F59E0B" strokeWidth={2} />
              </View>
              <Text style={[styles.balanceValue, { color: '#F59E0B' }]}>10</Text>
              <Text style={styles.balanceLabel}>Holidays</Text>
            </TouchableOpacity>
          </View>

          {/* Apply Button */}
          <TouchableOpacity 
            style={styles.applyBtn} 
            onPress={() => router.push('/apply-leave')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#0052CC', '#0066FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.applyBtnGradient}
            >
              <Text style={styles.applyBtnText}>Apply Leave</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0A1628',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: '#E2E8F0',
  },
  iconCtx: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  applyBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  applyBtnGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
