import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight, Video } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

export default function UpcomingSchedule() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Upcoming"
        showSeeAll={true}
        onSeeAll={() => router.push('/meetings')}
      />

      <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.95}>
        <LinearGradient
          colors={['#1E40AF', '#3B82F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.iconBadge}>
              <Video size={18} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>In 30 min</Text>
            </View>
          </View>
          
          {/* Content */}
          <Text style={styles.title} numberOfLines={2}>
            Project AI with Cybersecurity - Weekly Sync
          </Text>
          <Text style={styles.subtitle}>Host: Nikhil Thomas</Text>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.timeInfo}>
              <Calendar size={14} color="#FFFFFF" />
              <Text style={styles.timeText}>Today, 10:00 AM</Text>
            </View>
            <View style={styles.joinBtn}>
              <Text style={styles.joinText}>Join</Text>
              <ChevronRight size={16} color="#3B82F6" strokeWidth={2.5} />
            </View>
          </View>

          {/* Decorative Elements */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cardWrapper: {
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginBottom: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  joinText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B82F6',
  },
  circle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  circle2: {
    position: 'absolute',
    bottom: -50,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
});
