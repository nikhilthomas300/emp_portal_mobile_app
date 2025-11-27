import Colors from '@/constants/Colors';
import { Video } from 'lucide-react-native';
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
      <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
      
      <View style={styles.cardContainer}>
        {meetings.map((meeting, index) => (
          <TouchableOpacity 
            key={meeting.id} 
            style={[
              styles.card,
              index !== meetings.length - 1 && styles.cardBorder
            ]}
          >
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
            <View style={styles.joinButton}>
              <Video size={16} color="#FFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
    marginBottom: 100, // Extra space for floating tab bar
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 4,
    ...Colors.shadows.medium,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dateBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 20,
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
    marginBottom: 6,
    lineHeight: 22,
  },
  time: {
    fontSize: 13,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  joinButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadows.small,
  },
});
