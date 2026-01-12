import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import SVG icons
import AccessIcon from '@/assets/images/widgets/access_widget.svg';
import CheckinIcon from '@/assets/images/widgets/checkin.svg';
import MyAttendanceIcon from '@/assets/images/widgets/MyAttendance.svg';
import OrgHierarchyIcon from '@/assets/images/widgets/OrgHirearchy.svg';
import VisitorIcon from '@/assets/images/widgets/Visitor.svg';
import SectionHeader from './SectionHeader';

const widgetColors: Record<string, string> = {
  'Approvals': '#FF4757',
  'Attendance': '#00C48C',
  'Visitors': '#8B5CF6',
  'Org Chart': '#00B4D8',
  'Letters': '#F59E0B',
  'Access': '#0066FF',
};

const widgets = [
  { id: 1, title: 'Approvals', Icon: CheckinIcon, link: '/approvals' },
  { id: 2, title: 'Attendance', Icon: MyAttendanceIcon, link: null },
  { id: 3, title: 'Visitors', Icon: VisitorIcon, link: null },
  { id: 4, title: 'Org Chart', Icon: OrgHierarchyIcon, link: null },
  { id: 5, title: 'Letters', FallbackIcon: FileText, link: null },
  { id: 6, title: 'Access', Icon: AccessIcon, link: null },
];

export default function TeamSection() {
  const router = useRouter();

  const renderIcon = (widget: any) => {
    const color = widgetColors[widget.title] || Colors.primary;
    
    if (widget.FallbackIcon) {
      const FallbackComponent = widget.FallbackIcon;
      return <FallbackComponent size={24} color={color} strokeWidth={2} />;
    }
    if (widget.Icon) {
      const SvgIcon = widget.Icon;
      return <SvgIcon width={32} height={32} />;
    }
    return null;
  };

  const getIconBgColor = (title: string) => {
    const color = widgetColors[title] || Colors.primary;
    return color + '15';
  };

  const renderWidget = (widget: any) => {
    const content = (
      <>
        <View style={[styles.iconCircle, { backgroundColor: getIconBgColor(widget.title) }]}>
          {renderIcon(widget)}
        </View>
        <Text style={styles.widgetTitle} numberOfLines={1}>{widget.title}</Text>
      </>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        <TouchableOpacity activeOpacity={0.7} style={styles.widgetItem}>
          {content}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity key={widget.id} activeOpacity={0.7} style={styles.widgetItem}>
        {content}
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
          {widgets.map((widget) => renderWidget(widget))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 8,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  widgetItem: {
    width: '25%', // 4 items per row
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  widgetTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
