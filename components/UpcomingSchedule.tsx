import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UpcomingSchedule() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Meetings</Text>

      <LinearGradient
        colors={[Colors.primary, Colors.primary]} // Primary Color Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Meeting Info */}
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>Project Sync - Weekly Team Updates & Planning</Text>
              <Text style={styles.subtitle}>Nikhil Thomas</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <View style={styles.timeInfo}>
              <Calendar size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.timeText}>Today, 10:00 AM</Text>
            </View>
            <View style={styles.timeInfo}>
              <Clock size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.timeText}>30 min</Text>
            </View>
          </View>
        </View>

        {/* Decoration Circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  iconContainer: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  circle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
});
