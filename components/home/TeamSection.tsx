import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { CalendarOff, CheckCircle, FileText, Share2, UserCheck, Users } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - (HORIZONTAL_PADDING * 2) - (GAP * 2)) / 3;

const widgets = [
  { id: 1, title: 'Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Attendance', icon: Users, link: null },
  { id: 3, title: 'Leaves', icon: CalendarOff, link: null },
  { id: 4, title: 'Assets', icon: Share2, link: null },
  { id: 5, title: 'Letters', icon: FileText, link: null },
  { id: 6, title: 'Directory', icon: UserCheck, link: null },
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
        <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
      </TouchableOpacity>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        {cardElement}
      </Link>
    ) : (
      <View key={widget.id}>{cardElement}</View>
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
