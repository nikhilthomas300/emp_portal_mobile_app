import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Box, Clock, DollarSign, FileText, Grid3X3, Truck, User } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - (HORIZONTAL_PADDING * 2) - (GAP * 2)) / 3;

const widgets = [
  { id: 1, title: 'Attendance', icon: Clock },
  { id: 2, title: 'Transport', icon: Truck },
  { id: 3, title: 'Salary', icon: DollarSign },
  { id: 4, title: 'Assets', icon: Box },
  { id: 5, title: 'Letters', icon: FileText },
  { id: 6, title: 'Profile', icon: User },
];

export default function MeSection() {
  const router = useRouter();

  const handleSeeAll = () => {
    router.push('/widgets');
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Widgets" 
        icon={Grid3X3}
        iconColor="#7C3AED"
        showSeeAll
        onSeeAll={handleSeeAll}
      />
      
      <View style={styles.gridContainer}>
        {widgets.map((widget) => (
          <TouchableOpacity 
            key={widget.id} 
            style={styles.card} 
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <widget.icon size={22} color={Colors.primary} strokeWidth={1.8} />
            </View>
            <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: GAP,
  },
  card: {
    width: CARD_WIDTH,
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 17,
    letterSpacing: -0.2,
  },
});
