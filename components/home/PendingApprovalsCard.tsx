import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Bell, ChevronRight } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

interface PendingApprovalsCardProps {
  count?: number;
}

export default function PendingApprovalsCard({ count = 3 }: PendingApprovalsCardProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Bell shake animation
    rotation.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 80, easing: Easing.ease }),
        withTiming(12, { duration: 80, easing: Easing.ease }),
        withTiming(-8, { duration: 80, easing: Easing.ease }),
        withTiming(8, { duration: 80, easing: Easing.ease }),
        withTiming(0, { duration: 80, easing: Easing.ease }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    );

    // Subtle pulse for badge
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 600, easing: Easing.ease }),
        withTiming(1, { duration: 600, easing: Easing.ease })
      ),
      -1,
      true
    );
  }, []);

  const bellAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (count === 0) return null;

  return (
    <View style={styles.container}>
      <Link href="/approvals" asChild>
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <LinearGradient
            colors={['#FFFFFF', '#F8FAFC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            {/* Icon with Badge */}
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[Colors.gradientEnd, Colors.gradientMiddle]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              >
                <Animated.View style={bellAnimatedStyle}>
                  <Bell size={22} color="#FFFFFF" strokeWidth={2.2} fill="rgba(255,255,255,0.2)" />
                </Animated.View>
              </LinearGradient>
              <Animated.View style={[styles.badge, badgeAnimatedStyle]}>
                <Text style={styles.badgeText}>{count}</Text>
              </Animated.View>
            </View>
            
            {/* Text Content */}
            <View style={styles.textContent}>
              <Text style={styles.title}>Pending Approvals</Text>
              <Text style={styles.subtitle}>Tap to review {count} request{count > 1 ? 's' : ''}</Text>
            </View>
            
            {/* Arrow */}
            <View style={styles.arrowContainer}>
              <ChevronRight size={20} color={Colors.primary} strokeWidth={2.5} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardGradient: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: 20,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  iconGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
});
