import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, ChevronRight, Clock, Umbrella } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

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
        <View style={styles.unifiedCard}>
          
          {/* Casual */}
          <View style={styles.balanceSection}>
             <View style={[styles.miniIcon, { backgroundColor: '#EEF2FF' }]}>
                <Clock size={12} color="#4F46E5" />
             </View>
             <Text style={styles.value}>08</Text>
             <Text style={styles.label}>Casual</Text>
          </View>

          <View style={styles.divider} />

          {/* Earned */}
          <View style={styles.balanceSection}>
             <View style={[styles.miniIcon, { backgroundColor: '#ECFDF5' }]}>
                <Briefcase size={12} color="#059669" />
             </View>
             <Text style={styles.value}>14</Text>
             <Text style={styles.label}>Earned</Text>
          </View>

          <View style={styles.divider} />

          {/* Holiday Link */}
          <TouchableOpacity 
            style={styles.holidaySection}
            onPress={() => router.push('/holidays')}
            activeOpacity={0.7}
          >
             <View style={[styles.miniIcon, { backgroundColor: '#FFF7ED' }]}>
                <Calendar size={12} color="#EA580C" />
             </View>
             <View style={styles.holidayTextContainer}>
               <Text style={styles.holidayTitle}>Holiday</Text>
               <Text style={styles.holidaySubtitle}>Calendar</Text>
             </View>
             <ChevronRight size={14} color="#94A3B8" />
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
    paddingHorizontal: Colors.spacing,
  },
  unifiedCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  balanceSection: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#F1F5F9',
  },
  miniIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  holidaySection: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    gap: 8,
  },
  holidayTextContainer: {
    gap: 0,
  },
  holidayTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  holidaySubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94A3B8',
  },
});
