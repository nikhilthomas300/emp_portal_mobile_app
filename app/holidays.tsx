import { PageHeader } from '@/components/navigation';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const holidays = [
  { id: '1', date: '26', month: 'JAN', day: 'Friday', name: 'Republic Day', type: 'Public' },
  { id: '2', date: '25', month: 'MAR', day: 'Monday', name: 'Holi', type: 'Optional' },
  { id: '3', date: '15', month: 'AUG', day: 'Thursday', name: 'Independence Day', type: 'Public' },
  { id: '4', date: '02', month: 'OCT', day: 'Wednesday', name: 'Gandhi Jayanti', type: 'Public' },
  { id: '5', date: '01', month: 'NOV', day: 'Friday', name: 'Diwali', type: 'Public' },
  { id: '6', date: '25', month: 'DEC', day: 'Wednesday', name: 'Christmas', type: 'Public' },
  { id: '7', date: '14', month: 'APR', day: 'Sunday', name: 'Ambedkar Jayanti', type: 'Public' },
  { id: '8', date: '01', month: 'MAY', day: 'Wednesday', name: 'May Day', type: 'Optional' },
  { id: '9', date: '13', month: 'SEP', day: 'Friday', name: 'Onam', type: 'Optional' },
  { id: '10', date: '07', month: 'SEP', day: 'Saturday', name: 'Ganesh Chaturthi', type: 'Optional' },
];

export default function HolidaysScreen() {
  const insets = useSafeAreaInsets();
  
  const publicHolidays = holidays.filter(h => h.type === 'Public').length;
  const optionalHolidays = holidays.filter(h => h.type === 'Optional').length;
  const totalHolidays = holidays.length;

  const renderHeader = () => (
    <View style={styles.headerSection}>
      {/* Combined Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.yearSection}>
          <CalendarIcon size={18} color={Colors.primary} strokeWidth={2} />
          <View>
            <Text style={styles.yearLabel}>Fiscal Year</Text>
            <Text style={styles.yearText}>2024 - 2025</Text>
          </View>
        </View>
        <View style={styles.statsDivider} />
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalHolidays}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>{publicHolidays}</Text>
            <Text style={styles.statLabel}>Public</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{optionalHolidays}</Text>
            <Text style={styles.statLabel}>Optional</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: typeof holidays[0] }) => {
    const isPublic = item.type === 'Public';
    return (
      <View style={styles.holidayCard}>
        <View style={[styles.dateBox, { backgroundColor: isPublic ? '#EFF6FF' : '#FEF3C7' }]}>
          <Text style={[styles.dateText, { color: isPublic ? Colors.primary : '#F59E0B' }]}>{item.date}</Text>
          <Text style={[styles.monthText, { color: isPublic ? Colors.primary : '#F59E0B' }]}>{item.month}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.holidayName}>{item.name}</Text>
          <Text style={styles.dayText}>{item.day}</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: isPublic ? '#EFF6FF' : '#FEF3C7' }]}>
          <Text style={[styles.tagText, { color: isPublic ? Colors.primary : '#F59E0B' }]}>{item.type}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Holiday Calendar" />
      
      <FlatList
        data={holidays}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    paddingBottom: 16,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  yearSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 16,
  },
  yearLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  yearText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 1,
  },
  statsDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },
  statsSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: 1,
  },
  listContent: {
    padding: 16,
  },
  holidayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  dateText: {
    fontSize: 17,
    fontWeight: '800',
  },
  monthText: {
    fontSize: 9,
    fontWeight: '700',
  },
  details: {
    flex: 1,
  },
  holidayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  dayText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
