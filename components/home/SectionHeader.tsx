import Colors from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
  seeAllText?: string;
}

export default function SectionHeader({ 
  title, 
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
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>{seeAllText}</Text>
          <ChevronRight size={14} color={Colors.primary} strokeWidth={2.5} />
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
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
});
