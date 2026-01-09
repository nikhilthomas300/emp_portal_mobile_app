import Colors from '@/constants/Colors';
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

  useEffect(() => {
    // Bell shake animation
    rotation.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 100, easing: Easing.ease }),
        withTiming(10, { duration: 100, easing: Easing.ease }),
        withTiming(-10, { duration: 100, easing: Easing.ease }),
        withTiming(0, { duration: 100, easing: Easing.ease }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (count === 0) return null;

  return (
    <View style={styles.container}>
      <Link href="/approvals" asChild>
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <View style={styles.iconContainer}>
            <Animated.View style={animatedStyle}>
              <Bell size={20} color={Colors.primary} strokeWidth={2} />
            </Animated.View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          </View>
          
          <View style={styles.textContent}>
            <Text style={styles.title}>Pending Approvals</Text>
            <Text style={styles.subtitle}>Tap to review requests</Text>
          </View>
          
          <View style={styles.arrowContainer}>
            <ChevronRight size={18} color={Colors.primary} strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  arrowContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
