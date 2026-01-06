import Colors from '@/constants/Colors';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
  seeAllText?: string;
}

export default function SectionHeader({ 
  title, 
  icon: Icon,
  iconColor,
  onSeeAll,
  showSeeAll = false,
  seeAllText = 'View all'
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {showSeeAll && (
        <TouchableOpacity 
          style={styles.seeAllBtn} 
          onPress={onSeeAll}
          activeOpacity={0.6}
        >
          <Text style={styles.seeAllText}>{seeAllText}</Text>
          <View style={styles.chevronContainer}>
            <ChevronRight size={14} color={Colors.primary} strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingLeft: 10,
    paddingRight: 6,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
  },
  seeAllText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  chevronContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
