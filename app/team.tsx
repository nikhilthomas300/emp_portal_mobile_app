import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, FileText } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

// Import SVG icons for team widgets
import AccessIcon from '@/assets/images/widgets/access_widget.svg';
import CheckinIcon from '@/assets/images/widgets/checkin.svg';
import MyAssetsIcon from '@/assets/images/widgets/MyAssets.svg';
import MyAttendanceIcon from '@/assets/images/widgets/MyAttendance.svg';
import MyProfileIcon from '@/assets/images/widgets/MyProfile.svg';
import OrgHierarchyIcon from '@/assets/images/widgets/OrgHirearchy.svg';
import VisitorIcon from '@/assets/images/widgets/Visitor.svg';

type WidgetType = {
  id: number;
  title: string;
  Icon?: React.FC<SvgProps>;
  FallbackIcon?: any;
  link: string | null;
};

const teamWidgets: WidgetType[] = [
  { id: 1, title: 'My Approvals', Icon: CheckinIcon, link: '/approvals' },
  { id: 2, title: 'Team Attendance', Icon: MyAttendanceIcon, link: null },
  { id: 3, title: 'Visitor Mgmt', Icon: VisitorIcon, link: null },
  { id: 4, title: 'Org Hierarchy', Icon: OrgHierarchyIcon, link: null },
  { id: 5, title: 'Team Letters', FallbackIcon: FileText, link: null },
  { id: 6, title: 'Access Card', Icon: AccessIcon, link: null },
  { id: 7, title: 'Team Assets', Icon: MyAssetsIcon, link: null },
  { id: 8, title: 'Directory', Icon: MyProfileIcon, link: null },
];

export default function TeamScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderIcon = (widget: WidgetType) => {
    if (widget.FallbackIcon) {
      const FallbackComponent = widget.FallbackIcon;
      return <FallbackComponent size={28} color={Colors.primary} strokeWidth={1.8} />;
    }
    if (widget.Icon) {
      const SvgIcon = widget.Icon;
      return <SvgIcon width={34} height={34} />;
    }
    return null;
  };

  const renderWidget = (widget: WidgetType) => {
    const widgetContent = (
      <>
        <View style={styles.iconCircle}>
          {renderIcon(widget)}
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
      </>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        <TouchableOpacity activeOpacity={0.7} style={styles.cardWrapper}>
          {widgetContent}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity key={widget.id} activeOpacity={0.7} style={styles.cardWrapper}>
        {widgetContent}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Blue Gradient Header */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Team Widgets</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <View style={styles.grid}>
            {teamWidgets.map((widget) => renderWidget(widget))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: Colors.gradientStart,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 12,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.08)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 15,
    minHeight: 30,
    letterSpacing: 0.1,
  },
});
