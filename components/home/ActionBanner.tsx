import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { AlertCircle, Bell, CheckCircle, ChevronRight, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export type ActionType = 'approval' | 'task' | 'alert' | 'reminder';

interface ActionBannerProps {
  type?: ActionType;
  title: string;
  subtitle: string;
  count?: number;
  href?: string;
  onPress?: () => void;
}

const typeConfig = {
  approval: { 
    icon: Bell, 
    gradients: ['#3B82F6', '#2563EB'],
    lightColor: '#EFF6FF',
    color: '#2563EB' 
  },
  task: { 
    icon: CheckCircle, 
    gradients: ['#10B981', '#059669'],
    lightColor: '#ECFDF5',
    color: '#10B981' 
  },
  alert: { 
    icon: AlertCircle, 
    gradients: ['#EF4444', '#DC2626'],
    lightColor: '#FEF2F2',
    color: '#EF4444' 
  },
  reminder: { 
    icon: Clock, 
    gradients: ['#F59E0B', '#D97706'],
    lightColor: '#FFFBEB',
    color: '#F59E0B' 
  },
};

export default function ActionBanner({ 
  type = 'approval',
  title,
  subtitle,
  count,
  href = '/approvals',
  onPress
}: ActionBannerProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  const content = (
    <Animated.View 
      entering={FadeInDown.duration(400)}
      style={styles.card}
    >
      {/* Icon with gradient */}
      <View style={styles.iconWrapper}>
        <LinearGradient
          colors={config.gradients as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <IconComponent size={22} color="#FFFFFF" strokeWidth={2} />
        </LinearGradient>
        {count && count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
          </View>
        )}
      </View>
      
      {/* Text */}
      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
      
      {/* Arrow */}
      <View style={[styles.arrowContainer, { backgroundColor: config.lightColor }]}>
        <ChevronRight size={20} color={config.color} strokeWidth={2.5} />
      </View>
    </Animated.View>
  );

  if (href) {
    return (
      <View style={styles.container}>
        <Link href={href as any} asChild>
          <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
            {content}
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
        {content}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    // Premium shadow
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(241, 245, 249, 0.8)',
  },
  iconWrapper: {
    position: 'relative',
  },
  iconContainer: {
    width: 50,
    height: 50,
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
    borderWidth: 3,
    borderColor: '#FFFFFF',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter_800ExtraBold',
    color: '#FFFFFF',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#0F172A',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
