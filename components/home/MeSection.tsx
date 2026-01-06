import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Activity, Box, Clock, FileText } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// Only show top 4: My Attendance, My Assets, My Letters, Flex
const widgets = [
  { id: 1, title: 'My Attendance', icon: Clock },
  { id: 2, title: 'My Assets', icon: Box },
  { id: 3, title: 'My Letters', icon: FileText },
  { id: 4, title: 'Flex', icon: Activity },
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
                  <IconComponent size={24} color={Colors.primary} strokeWidth={1.5} />
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
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    alignItems: 'center',
    width: 72,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
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
  },
});
