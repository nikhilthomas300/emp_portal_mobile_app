import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Activity, Box, Clock, CreditCard, FileText, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// Show widgets: 3 per row - Enterprise consistent blue theme
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
              <TouchableOpacity key={widget.id} style={styles.cardWrapper} activeOpacity={0.7}>
                <View style={styles.card}>
                  <View style={styles.iconContainer}>
                    <IconComponent size={24} color={Colors.primary} strokeWidth={1.8} />
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
                </View>
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
    paddingHorizontal: 10,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 16,
  },
});
