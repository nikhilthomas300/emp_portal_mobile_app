import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const meetings = [
  { id: 1, title: 'Q3 Project Sync', time: '10:00 AM - 10:30 AM', day: 'MON', date: '15' },
  { id: 2, title: 'Design Review: Mobile App', time: '01:00 PM - 02:00 PM', day: 'MON', date: '15' },
  { id: 3, title: '1:1 with Manager', time: '09:30 AM - 10:00 AM', day: 'TUE', date: '16' },
];

export default function EventsList() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        
        <View style={styles.list}>
          {meetings.map((meeting, index) => (
            <View key={meeting.id} style={[styles.card, index !== meetings.length - 1 && styles.borderBottom]}>
              {/* Date Badge */}
              <View style={styles.dateBadge}>
                <Text style={styles.dayText}>{meeting.day}</Text>
                <Text style={styles.dateText}>{meeting.date}</Text>
              </View>

              {/* Info */}
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{meeting.title}</Text>
                <Text style={styles.time}>{meeting.time}</Text>
              </View>

              {/* Join Button */}
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinText}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
    marginBottom: 40,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    ...Colors.shadows.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  list: {
    // Removed background and shadow from list since it's now in cardContainer
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dateBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 16,
    minWidth: 56,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  joinText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
