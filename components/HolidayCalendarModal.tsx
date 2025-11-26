import Colors from '@/constants/Colors';
import { Calendar as CalendarIcon, X } from 'lucide-react-native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
];

export default function HolidayCalendarModal({ visible, onClose }: HolidayCalendarModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <CalendarIcon size={24} color={Colors.primary} />
              <Text style={styles.title}>Holiday Calendar 2024</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {holidays.map((holiday) => (
              <View key={holiday.id} style={styles.holidayItem}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>{holiday.date.split(' ')[0]}</Text>
                  <Text style={styles.monthText}>{holiday.date.split(' ')[1]}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.holidayName}>{holiday.name}</Text>
                  <Text style={styles.dayText}>{holiday.day}</Text>
                </View>
                <View style={[
                  styles.tag, 
                  { backgroundColor: holiday.type === 'Public' ? Colors.primaryLight : '#FFF4E5' }
                ]}>
                  <Text style={[
                    styles.tagText,
                    { color: holiday.type === 'Public' ? Colors.primary : '#FF9F47' }
                  ]}>{holiday.type}</Text>
                </View>
              </View>
            ))}
            <View style={{ height: 20 }} />
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
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '95%',
    ...Colors.shadows.large,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginRight: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  monthText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondaryText,
    textTransform: 'uppercase',
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
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
