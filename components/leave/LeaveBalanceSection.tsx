import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, ChevronRight, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SectionHeader } from '../home';

const leaveData = [
  { id: 1, type: 'Sick', balance: 8, icon: Clock },
  { id: 2, type: 'Earned', balance: 14, icon: Briefcase },
  { id: 3, type: 'Holiday', balance: 10, icon: Calendar, link: '/holidays' },
];

export default function LeaveBalanceSection() {
  const router = useRouter();

  const handleItemPress = (item: typeof leaveData[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (item.link) {
      router.push(item.link as any);
    }
  };

  const handleApplyLeave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/apply-leave');
  };

  return (
    <View style={styles.container}>
      <SectionHeader title="Leave Balance" />

      <Animated.View 
        entering={FadeInUp.duration(400).delay(100)}
        style={styles.cardWrapper}
      >
        <View style={styles.card}>
          {/* Balances Row */}
          <View style={styles.balanceRow}>
            {leaveData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <React.Fragment key={item.id}>
                  <TouchableOpacity 
                    style={styles.balanceItem} 
                    activeOpacity={0.7}
                    onPress={() => handleItemPress(item)}
                  >
                    <View style={styles.iconContainer}>
                      <IconComponent size={18} color={Colors.primary} strokeWidth={2} />
                    </View>
                    <Text style={styles.balanceValue}>{item.balance}</Text>
                    <Text style={styles.balanceLabel}>{item.type}</Text>
                  </TouchableOpacity>
                  {index < leaveData.length - 1 && <View style={styles.divider} />}
                </React.Fragment>
              );
            })}
          </View>

          {/* Compact Apply Button */}
          <TouchableOpacity 
            style={styles.applyBtn} 
            onPress={handleApplyLeave}
            activeOpacity={0.8}
          >
            <Text style={styles.applyBtnText}>Apply Leave</Text>
            <ChevronRight size={16} color={Colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    borderRadius: 20,
    padding: 20,
    // Premium shadow
    shadowColor: '#1E3A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E8F0FE',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#E2E8F0',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  balanceValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  balanceLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    backgroundColor: '#EEF4FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  applyBtnText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
});
