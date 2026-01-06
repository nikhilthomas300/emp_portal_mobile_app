import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { CalendarOff, CheckCircle, Share2, Users } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// Show top 4 team widgets on home
const widgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Team Attendance', icon: Users, link: null },
  { id: 3, title: 'Team Leaves', icon: CalendarOff, link: null },
  { id: 4, title: 'Shared Assets', icon: Share2, link: null },
];

export default function TeamSection() {
  const router = useRouter();

  const renderCard = (widget: typeof widgets[0]) => {
    const IconComponent = widget.icon;
    
    const cardElement = (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <IconComponent size={24} color={Colors.primary} strokeWidth={1.5} />
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
      </View>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          {cardElement}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity key={widget.id} activeOpacity={0.7}>
        {cardElement}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Team" 
        showSeeAll
        onSeeAll={() => router.push('/team')}
      />
      
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          {widgets.map((widget) => renderCard(widget))}
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
