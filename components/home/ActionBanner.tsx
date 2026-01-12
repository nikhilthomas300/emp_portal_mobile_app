import { Link } from 'expo-router';
import { AlertCircle, Bell, CheckCircle, ChevronRight, Clock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  approval: { icon: Bell, color: '#0066FF', bgColor: '#0066FF' },
  task: { icon: CheckCircle, color: '#00C48C', bgColor: '#00C48C' },
  alert: { icon: AlertCircle, color: '#FF4757', bgColor: '#FF4757' },
  reminder: { icon: Clock, color: '#F59E0B', bgColor: '#F59E0B' },
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

  const content = (
    <View style={styles.card}>
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
        <IconComponent size={20} color="#FFFFFF" strokeWidth={2} />
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
      <View style={[styles.arrowContainer, { backgroundColor: config.color + '15' }]}>
        <ChevronRight size={20} color={config.color} strokeWidth={2.5} />
      </View>
    </View>
  );

  if (href) {
    return (
      <View style={styles.container}>
        <Link href={href as any} asChild>
          <TouchableOpacity activeOpacity={0.8}>
            {content}
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {content}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 102, 255, 0.08)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF4757',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0A1628',
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
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
