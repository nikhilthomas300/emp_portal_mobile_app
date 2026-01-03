import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { CalendarOff, CheckCircle, FileText, Share2, Users } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

const widgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Team Attendance Status', icon: Users, link: null },
  { id: 3, title: 'Team Leaves', icon: CalendarOff, link: null },
  { id: 4, title: 'Team Shared Assets', icon: Share2, link: null },
  { id: 5, title: 'Team Letters', icon: FileText, link: null },
];

export default function TeamSection() {
  const router = useRouter();

  const handleSeeAll = () => {
    router.push('/team');
  };

  const renderCard = (widget: typeof widgets[0]) => {
    const cardElement = (
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
    );

    return (
      <View key={widget.id} style={styles.cardWrapper}>
        {widget.link ? (
          <Link href={widget.link as any} asChild>
            {cardElement}
          </Link>
        ) : (
          cardElement
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Team" 
        icon={Users}
        iconColor="#4338CA"
        showSeeAll
        onSeeAll={handleSeeAll}
      />
      
      <View style={styles.gridContainer}>
        {widgets.map((widget) => renderCard(widget))}
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
