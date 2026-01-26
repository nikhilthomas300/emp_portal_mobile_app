import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
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
  seeAllText = 'See All'
}: SectionHeaderProps) {
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSeeAll?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {showSeeAll && (
        <TouchableOpacity 
          style={styles.seeAllBtn} 
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>{seeAllText}</Text>
          <View style={styles.arrowContainer}>
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
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF4FF',
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  arrowContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
});
