import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Activity, Box, Clock, CreditCard, FileText, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// Show 6 widgets: 3 per row
const widgets = [
  { id: 1, title: 'My Attendance', icon: Clock },
  { id: 2, title: 'My Assets', icon: Box },
  { id: 3, title: 'My Letters', icon: FileText },
  { id: 4, title: 'Flex', icon: Activity },
  { id: 5, title: 'My Profile', icon: User },
  { id: 6, title: 'Facility Access', icon: CreditCard },
];

export default function MeSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Widgets" 
        showSeeAll
        onSeeAll={() => router.push('/widgets')}
      />
      
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          {widgets.map((widget) => {
            const IconComponent = widget.icon;
            return (
              <TouchableOpacity key={widget.id} style={styles.card} activeOpacity={0.7}>
                <View style={styles.iconContainer}>
                  <IconComponent size={22} color={Colors.primary} strokeWidth={1.6} />
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  card: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 4,
  },
});
