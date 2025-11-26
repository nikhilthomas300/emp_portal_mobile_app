import { Calendar, ChevronRight, Video } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

const MOCK_MEETINGS = [
  {
    id: '1',
    title: 'Design Review',
    time: '10:00 AM - 11:00 AM',
    type: 'video',
  },
  {
    id: '2',
    title: 'Team Sync',
    time: '02:00 PM - 02:30 PM',
    type: 'video',
  },
];

export const MeetingWidget = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Meetings</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <ChevronRight size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {MOCK_MEETINGS.map((meeting) => (
          <View key={meeting.id} style={styles.meetingItem}>
            <View style={[styles.iconContainer, meeting.type === 'video' ? styles.videoIcon : styles.calendarIcon]}>
              {meeting.type === 'video' ? (
                <Video size={20} color={COLORS.primary} />
              ) : (
                <Calendar size={20} color={COLORS.warning} />
              )}
            </View>
            <View style={styles.meetingInfo}>
              <Text style={styles.meetingTitle}>{meeting.title}</Text>
              <Text style={styles.meetingTime}>{meeting.time}</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  list: {
    gap: SPACING.m,
  },
  meetingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.m,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  videoIcon: {
    backgroundColor: COLORS.primaryLight,
  },
  calendarIcon: {
    backgroundColor: '#FEF3C7',
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  meetingTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  joinButton: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  joinButtonText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
  },
});
