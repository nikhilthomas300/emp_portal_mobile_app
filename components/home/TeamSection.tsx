import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import SectionHeader from './SectionHeader';

// Import SVG icons for team widgets
import AccessIcon from '@/assets/images/widgets/access_widget.svg';
import CheckinIcon from '@/assets/images/widgets/checkin.svg';
import MyAttendanceIcon from '@/assets/images/widgets/MyAttendance.svg';
import OrgHierarchyIcon from '@/assets/images/widgets/OrgHirearchy.svg';
import VisitorIcon from '@/assets/images/widgets/Visitor.svg';

// Show team widgets: 4 per row - Premium design with SVG icons
const widgets: Array<{id: number; title: string; Icon?: React.FC<SvgProps>; FallbackIcon?: any; link: string | null}> = [
  { id: 1, title: 'My Approvals', Icon: CheckinIcon, link: '/approvals' },
  { id: 2, title: 'Team Attendance', Icon: MyAttendanceIcon, link: null },
  { id: 3, title: 'Visitor Mgmt', Icon: VisitorIcon, link: null },
  { id: 4, title: 'Org Hierarchy', Icon: OrgHierarchyIcon, link: null },
  { id: 5, title: 'Team Letters', FallbackIcon: FileText, link: null },
  { id: 6, title: 'Access Card', Icon: AccessIcon, link: null },
];

export default function TeamSection() {
  const router = useRouter();

  const renderIcon = (widget: typeof widgets[0]) => {
    if (widget.FallbackIcon) {
      const FallbackComponent = widget.FallbackIcon;
      return <FallbackComponent size={26} color={Colors.primary} strokeWidth={1.8} />;
    }
    if (widget.Icon) {
      const SvgIcon = widget.Icon;
      return <SvgIcon width={32} height={32} />;
    }
    return null;
  };

  const renderWidget = (widget: typeof widgets[0]) => {
    const widgetContent = (
      <>
        <View style={styles.iconCircle}>
          {renderIcon(widget)}
        </View>
        <Text style={styles.widgetTitle} numberOfLines={2}>{widget.title}</Text>
      </>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        <TouchableOpacity activeOpacity={0.7} style={styles.widgetItem}>
          {widgetContent}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity key={widget.id} activeOpacity={0.7} style={styles.widgetItem}>
        {widgetContent}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Team Widgets" 
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
    marginBottom: 24,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 12,
    // Premium shadow
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.08)',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  widgetItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // Subtle inner glow
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  widgetTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 15,
    minHeight: 30,
    letterSpacing: 0.1,
  },
});
