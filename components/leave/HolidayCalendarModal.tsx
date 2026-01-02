import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar as CalendarIcon, X } from 'lucide-react-native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HolidayCalendarModalProps {
  visible: boolean;
  onClose: () => void;
}

const holidays = [
  { id: 1, date: '26 Jan', day: 'Friday', name: 'Republic Day', type: 'Public' },
  { id: 2, date: '25 Mar', day: 'Monday', name: 'Holi', type: 'Optional' },
  { id: 3, date: '15 Aug', day: 'Thursday', name: 'Independence Day', type: 'Public' },
  { id: 4, date: '02 Oct', day: 'Wednesday', name: 'Gandhi Jayanti', type: 'Public' },
  { id: 5, date: '01 Nov', day: 'Friday', name: 'Diwali', type: 'Public' },
  { id: 6, date: '25 Dec', day: 'Wednesday', name: 'Christmas', type: 'Public' },
  { id: 7, date: '14 Apr', day: 'Sunday', name: 'Ambedkar Jayanti', type: 'Public' },
  { id: 8, date: '01 May', day: 'Wednesday', name: 'May Day', type: 'Optional' },
];

export default function HolidayCalendarModal({ visible, onClose }: HolidayCalendarModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { paddingBottom: insets.bottom + 20 }]}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <LinearGradient
                colors={[Colors.primary + '20', Colors.primary + '08']}
                style={styles.titleIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <CalendarIcon size={20} color={Colors.primary} strokeWidth={2} />
              </LinearGradient>
              <View>
                <Text style={styles.title}>Holiday Calendar</Text>
                <Text style={styles.subtitle}>2024 - 2025</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={Colors.text} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Stats Summary */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: Colors.primary }]}>8</Text>
              <Text style={styles.statLabel}>Public</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: Colors.warning }]}>4</Text>
              <Text style={styles.statLabel}>Optional</Text>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    maxHeight: '90%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.secondaryText,
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 14,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
  },
  monthText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 1,
  },
  details: {
    flex: 1,
  },
  holidayName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  dayText: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
