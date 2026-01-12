import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ChevronRight, Clock, Video } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

export default function UpcomingSchedule() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Upcoming Meeting"
        showSeeAll={true}
        seeAllText="All"
        onSeeAll={() => router.push('/meetings')}
      />

      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.8}
        onPress={() => router.push('/meetings')}
      >
        {/* Video Icon */}
        <View style={styles.iconContainer}>
          <Video size={20} color="#FFFFFF" strokeWidth={2} />
        </View>
        
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>Weekly Sync - Project AI</Text>
          <View style={styles.metaRow}>
            <Clock size={13} color="#64748B" strokeWidth={2} />
            <Text style={styles.timeText}>Today, 10:00 AM</Text>
            <View style={styles.badge}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>In 30 min</Text>
            </View>
          </View>
        </View>
        
        {/* Arrow */}
        <ChevronRight size={20} color="#CBD5E1" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 5,
    marginLeft: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
});
