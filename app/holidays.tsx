import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const holidays = [
  { id: 1, date: '26 Jan', day: 'Friday', name: 'Republic Day', type: 'Public' },
  { id: 2, date: '25 Mar', day: 'Monday', name: 'Holi', type: 'Optional' },
  { id: 3, date: '15 Aug', day: 'Thursday', name: 'Independence Day', type: 'Public' },
  { id: 4, date: '02 Oct', day: 'Wednesday', name: 'Gandhi Jayanti', type: 'Public' },
  { id: 5, date: '01 Nov', day: 'Friday', name: 'Diwali', type: 'Public' },
  { id: 6, date: '25 Dec', day: 'Wednesday', name: 'Christmas', type: 'Public' },
  { id: 7, date: '14 Apr', day: 'Sunday', name: 'Ambedkar Jayanti', type: 'Public' },
  { id: 8, date: '01 May', day: 'Wednesday', name: 'May Day', type: 'Optional' },
  { id: 9, date: '13 Sep', day: 'Friday', name: 'Onam', type: 'Optional' },
  { id: 10, date: '07 Sep', day: 'Saturday', name: 'Ganesh Chaturthi', type: 'Optional' },
];

export default function HolidaysScreen() {
  const insets = useSafeAreaInsets();
  
  const publicHolidays = holidays.filter(h => h.type === 'Public').length;
  const optionalHolidays = holidays.filter(h => h.type === 'Optional').length;
  const totalHolidays = holidays.length;

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: 'Holiday Calendar',
          headerShown: true,
          headerBackTitle: 'Home',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerShadowVisible: false,
          headerTintColor: Colors.text,
        }} 
      />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.compactHeader}>
            <LinearGradient
              colors={[Colors.primary + '15', Colors.primary + '05']}
              style={styles.yearBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <CalendarIcon size={16} color={Colors.primary} strokeWidth={2.5} />
              <Text style={styles.yearText}>Year 2024 - 2025</Text>
            </LinearGradient>
          </View>

          {/* Stats Summary */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalHolidays}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: Colors.primary }]}>{publicHolidays}</Text>
              <Text style={styles.statLabel}>Public</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: Colors.warning }]}>{optionalHolidays}</Text>
              <Text style={styles.statLabel}>Optional</Text>
            </View>
          </View>

          <View style={styles.listContainer}>
            {holidays.map((holiday, index) => (
              <TouchableOpacity 
                key={holiday.id} 
                style={[
                  styles.holidayItem,
                  index === holidays.length - 1 && { marginBottom: 0 }
                ]}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={holiday.type === 'Public' 
                    ? [Colors.primary + '15', Colors.primary + '05']
                    : ['#FFF7ED', '#FFF4E5']}
                  style={styles.dateBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={[
                    styles.dateText,
                    { color: holiday.type === 'Public' ? Colors.primary : '#EA580C' }
                  ]}>{holiday.date.split(' ')[0]}</Text>
                  <Text style={[
                    styles.monthText,
                    { color: holiday.type === 'Public' ? Colors.primary : '#EA580C' }
                  ]}>{holiday.date.split(' ')[1]}</Text>
                </LinearGradient>
                <View style={styles.details}>
                  <Text style={styles.holidayName}>{holiday.name}</Text>
                  <Text style={styles.dayText}>{holiday.day}</Text>
                </View>
                <View style={[
                  styles.tag, 
                  { backgroundColor: holiday.type === 'Public' ? Colors.primaryLight : '#FEF3C7' }
                ]}>
                  <Text style={[
                    styles.tagText,
                    { color: holiday.type === 'Public' ? Colors.primary : '#D97706' }
                  ]}>{holiday.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
  },
  compactHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  yearText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    ...Colors.shadows.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 10,
  },
  listContainer: {
    gap: 12,
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    ...Colors.shadows.small,
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 14,
    marginRight: 16,
  },
  dateText: {
    fontSize: 19,
    fontWeight: '700',
  },
  monthText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  details: {
    flex: 1,
  },
  holidayName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  dayText: {
    fontSize: 13,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
