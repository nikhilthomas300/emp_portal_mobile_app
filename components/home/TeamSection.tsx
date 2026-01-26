import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import SectionHeader from './SectionHeader';

// Import SVG icons
import AccessIcon from '@/assets/images/widgets/access_widget.svg';
import CheckinIcon from '@/assets/images/widgets/checkin.svg';
import MyAttendanceIcon from '@/assets/images/widgets/MyAttendance.svg';
import OrgHierarchyIcon from '@/assets/images/widgets/OrgHirearchy.svg';
import VisitorIcon from '@/assets/images/widgets/Visitor.svg';

const widgets = [
  { id: 1, title: 'Team Approvals', Icon: CheckinIcon, link: '/approvals' },
  { id: 2, title: 'Team Attendance', Icon: MyAttendanceIcon, link: null },
  { id: 3, title: 'Team Visitors', Icon: VisitorIcon, link: null },
  { id: 4, title: 'Org Chart', Icon: OrgHierarchyIcon, link: null },
  { id: 5, title: 'Team Letters', FallbackIcon: FileText, link: '/team-letters' },
  { id: 6, title: 'Team Access', Icon: AccessIcon, link: null },
];

export default function TeamSection() {
  const router = useRouter();

  const renderIcon = (widget: any) => {
    if (widget.FallbackIcon) {
      const FallbackComponent = widget.FallbackIcon;
      return <FallbackComponent size={26} color={Colors.primary} strokeWidth={1.8} />;
    }
    if (widget.Icon) {
      const SvgIcon = widget.Icon;
      return <SvgIcon width={30} height={30} />;
    }
    return null;
  };

  const handleWidgetPress = (widget: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (widget.link) {
      router.push(widget.link as any);
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Team" 
        showSeeAll
        onSeeAll={() => router.push('/team')}
      />
      
      <Animated.View 
        entering={FadeInUp.duration(400).delay(150)}
        style={styles.card}
      >
        <View style={styles.gridContainer}>
          {widgets.map((widget) => (
            <TouchableOpacity 
              key={widget.id} 
              style={styles.widgetItem}
              activeOpacity={0.7}
              onPress={() => handleWidgetPress(widget)}
            >
              <View style={styles.iconContainer}>
                {renderIcon(widget)}
              </View>
              <Text style={styles.widgetTitle} numberOfLines={2}>
                {widget.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    // Premium shadow
    shadowColor: '#1E3A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E8F0FE',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  widgetItem: {
    width: '33.33%', // 3 items per row for larger size
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // Subtle border for polish
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  widgetTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 18,
  },
});
