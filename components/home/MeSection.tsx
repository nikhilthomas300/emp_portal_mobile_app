import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import SectionHeader from './SectionHeader';

// Import SVG icons directly
import FlexIcon from '@/assets/images/widgets/Flex.svg';
import MyAssetsIcon from '@/assets/images/widgets/MyAssets.svg';
import MyAttendanceIcon from '@/assets/images/widgets/MyAttendance.svg';
import MyProfileIcon from '@/assets/images/widgets/MyProfile.svg';
import SalaryIcon from '@/assets/images/widgets/Salary.svg';

// Fallback icons when SVG doesn't work
const fallbackIcons: Record<string, any> = {
  'My Letters': FileText,
};

// Show widgets: 4 per row - Premium design with SVG icons
const widgets: Array<{id: number; title: string; Icon?: React.FC<SvgProps>; FallbackIcon?: any}> = [
  { id: 1, title: 'My Attendance', Icon: MyAttendanceIcon },
  { id: 2, title: 'My Assets', Icon: MyAssetsIcon },
  { id: 3, title: 'My Letters', FallbackIcon: FileText },
  { id: 4, title: 'Flex', Icon: FlexIcon },
  { id: 5, title: 'My Profile', Icon: MyProfileIcon },
  { id: 6, title: 'Salary', Icon: SalaryIcon },
];

export default function MeSection() {
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

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Widgets" 
        showSeeAll
        onSeeAll={() => router.push('/widgets')}
      />
      
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          {widgets.map((widget) => (
            <TouchableOpacity key={widget.id} style={styles.widgetItem} activeOpacity={0.7}>
              <View style={styles.iconCircle}>
                {renderIcon(widget)}
              </View>
              <Text style={styles.widgetTitle} numberOfLines={2}>{widget.title}</Text>
            </TouchableOpacity>
          ))}
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
