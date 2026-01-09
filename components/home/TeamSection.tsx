import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { CalendarOff, CheckCircle, FileText, Share2, UserCheck, Users } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// Show team widgets: 3 per row - Enterprise consistent blue theme
const widgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Team Attendance', icon: Users, link: null },
  { id: 3, title: 'Team Leaves', icon: CalendarOff, link: null },
  { id: 4, title: 'Shared Assets', icon: Share2, link: null },
  { id: 5, title: 'Team Letters', icon: FileText, link: null },
  { id: 6, title: 'Directory', icon: UserCheck, link: null },
];

export default function TeamSection() {
  const router = useRouter();

  const renderCard = (widget: typeof widgets[0]) => {
    const IconComponent = widget.icon;
    
    const cardElement = (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <IconComponent size={24} color={Colors.primary} strokeWidth={1.8} />
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
      </View>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        <TouchableOpacity activeOpacity={0.7} style={styles.cardWrapper}>
          {cardElement}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity key={widget.id} activeOpacity={0.7} style={styles.cardWrapper}>
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
