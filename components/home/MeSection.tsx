import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Box, Clock, DollarSign, FileText, Grid3X3, Truck, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

const widgets = [
  { id: 1, title: 'My Attendance', icon: Clock },
  { id: 2, title: 'My Transport', icon: Truck },
  { id: 3, title: 'Salary Payment Status', icon: DollarSign },
  { id: 4, title: 'My Assets', icon: Box },
  { id: 5, title: 'My Letters', icon: FileText },
  { id: 6, title: 'My Profile', icon: User },
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
          <View key={widget.id} style={styles.cardWrapper}>
            <TouchableOpacity 
              style={styles.card} 
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <widget.icon size={22} color={Colors.primary} strokeWidth={1.8} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginHorizontal: -4,
  },
  cardWrapper: {
    width: '33.33%',
    padding: 4,
  },
  card: {
    height: 105,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: 34,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: -0.2,
  },
});
