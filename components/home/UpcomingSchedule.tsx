import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ChevronRight, Clock, Users, Video } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import SectionHeader from './SectionHeader';

export default function UpcomingSchedule() {
  const router = useRouter();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/meetings');
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Upcoming Meeting"
        showSeeAll={true}
        seeAllText="All"
        onSeeAll={handlePress}
      />

      <Animated.View entering={FadeInUp.duration(400).delay(200)}>
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={handlePress}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Video size={22} color={Colors.primary} strokeWidth={2} />
          </View>
          
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>Weekly Team Sync</Text>
            <View style={styles.metaRow}>
              <Clock size={13} color="#64748B" strokeWidth={2} />
              <Text style={styles.timeText}>10:00 AM</Text>
              <View style={styles.dot} />
              <Users size={13} color="#64748B" strokeWidth={2} />
              <Text style={styles.timeText}>5 members</Text>
            </View>
          </View>
          
          {/* Right section */}
          <View style={styles.rightSection}>
            <View style={styles.badge}>
              <View style={styles.liveDot} />
              <Text style={styles.badgeText}>In 30m</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" strokeWidth={2} />
          </View>
        </TouchableOpacity>
      </Animated.View>
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
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    // Premium shadow
    shadowColor: '#1E3A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E8F0FE',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#16A34A',
  },
});
