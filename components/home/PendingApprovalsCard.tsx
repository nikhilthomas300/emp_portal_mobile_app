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
        withTiming(0, { duration: 2000 }) // Pause between shakes
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
        <TouchableOpacity style={styles.card} activeOpacity={0.85}>
          <View style={styles.iconContainer}>
            <Animated.View style={animatedStyle}>
              <Bell size={20} color={Colors.primary} strokeWidth={2} />
            </Animated.View>
          </View>
          
          <View style={styles.textContent}>
            <Text style={styles.title}>{count} pending approvals</Text>
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
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
